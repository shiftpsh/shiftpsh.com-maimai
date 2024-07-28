import * as fs from "fs";
import { Difficulty, DisplayLevel, TrackDbInfo } from "../src/types/types";
import { songScores } from "./api/songScore";
import { version, versionDetails } from "./api/version";
import { login } from "./axios";
import { batchedPromiseAll } from "./utils/promise";
import { dedupeRecords, trackMapKey } from "./utils/songTitle";

const SEGA_ID = process.env.SEGA_ID;
const SEGA_PASSWORD = process.env.SEGA_PASSWORD;

if (typeof SEGA_ID !== "string") {
  throw new Error("SEGA_ID is unspecified.");
}
if (typeof SEGA_PASSWORD !== "string") {
  throw new Error("SEGA_PASSWORD is unspecified.");
}

const DIFFICULTIES = [
  "BASIC",
  "ADVANCED",
  "EXPERT",
  "MASTER",
  "Re:MASTER",
] as const;

const generate = async () => {
  await login(SEGA_ID, SEGA_PASSWORD);
  console.log("Fetching versions...");

  const { availableVersions } = await version();
  console.log(
    `${availableVersions.length} versions found, with latest version being ${
      availableVersions[availableVersions.length - 1].name
    }`
  );

  const tracks = await batchedPromiseAll(
    availableVersions.map(
      (version) => async () =>
        versionDetails({ version: +version.value, difficulty: "MASTER" })
    )
  );
  console.log("Fetched all tracks.");

  const records = await batchedPromiseAll(
    DIFFICULTIES.map((difficulty) => async () => songScores({ difficulty }))
  );
  const dedupedRecords = await dedupeRecords(records);
  console.log("Fetched all records.");

  const displayLevels = new Map<string, Map<Difficulty, DisplayLevel>>();

  dedupedRecords.forEach((recordRow) => {
    recordRow.forEach(({ track }) => {
      const key = trackMapKey(track);
      const trackDisplayLevels = displayLevels.get(key) || new Map();
      if (trackDisplayLevels.get(track.difficulty)) {
        throw new Error(
          `Duplicate track difficulty found: ${key} ${track.difficulty}`
        );
      }
      trackDisplayLevels.set(track.difficulty, track.displayLevel);
      displayLevels.set(key, trackDisplayLevels);
    });
  });

  const data = {
    availableVersions,
    tracks: tracks.flatMap((values, i) =>
      values.map(
        ({ track }) =>
          ({
            title: track.title,
            type: track.type,
            version: +availableVersions[i].value,
            displayLevel: DIFFICULTIES.map(
              (difficulty) =>
                displayLevels.get(trackMapKey(track))?.get(difficulty) || null
            ),
          } satisfies TrackDbInfo)
      )
    ),
  };

  await fs.promises.mkdir("./src/db", { recursive: true });

  await fs.promises.writeFile(
    "./src/db/songs.json",
    JSON.stringify(data, null, 2),
    "utf-8"
  );

  console.log("Database generated successfully.");
};

generate();
