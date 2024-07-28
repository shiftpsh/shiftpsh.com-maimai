import "./utils/env";
import * as fs from "fs";
import {
  Difficulty,
  DisplayLevel,
  SongsJson,
  TrackDbInfo,
} from "../src/types/types";
import { songScores } from "./api/songScore";
import { version, versionDetails } from "./api/version";
import { login } from "./axios";
import { batchedPromiseAll } from "./utils/promise";
import { dedupeRecords, trackMapKey } from "./utils/songTitle";
import { musicDetail } from "./api/musicDetail";
import { tryLoadFileAsJson } from "./utils/file";

const OUT_DIR = "./src/db";
const OUT_FILE = "./src/db/songs.json";

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

  const oldJson = await tryLoadFileAsJson<SongsJson>(OUT_FILE);

  const charts = await batchedPromiseAll(
    DIFFICULTIES.map((difficulty) => async () => songScores({ difficulty }))
  );
  const chartCount = charts.reduce((acc, x) => acc + x.length, 0);
  console.log(`Fetched ${chartCount} charts.`);

  if (oldJson?.chartCount === chartCount) {
    console.log("No new charts found, skipping database generation.");
    return;
  }

  const { availableVersions } = await version();
  console.log(
    `${availableVersions.length} versions found, with latest version being ${
      availableVersions[availableVersions.length - 1].name
    }`
  );

  const { recordsWithArtists, duplicateTrackKeys } = await dedupeRecords(
    charts
  );

  const tracks = await batchedPromiseAll(
    availableVersions.map(
      (version) => async () =>
        versionDetails({ version: +version.value, difficulty: "MASTER" })
    )
  );
  console.log("Fetched all tracks.");

  const duplicateTrackNameIdxs = new Set(
    tracks.flatMap((recordRow) =>
      recordRow
        .filter(({ track }) => duplicateTrackKeys.has(trackMapKey(track)))
        .map(({ track }) => track.idx)
    )
  );

  const duplicateTrackNameIdxsArray = Array.from(duplicateTrackNameIdxs);
  const artists = await batchedPromiseAll(
    duplicateTrackNameIdxsArray.map((idx) => async () => musicDetail({ idx }))
  );
  const idxArtistMap = new Map<string, string>();
  artists.forEach(({ artist }, i) => {
    idxArtistMap.set(duplicateTrackNameIdxsArray[i], artist);
  });

  const displayLevels = new Map<string, Map<Difficulty, DisplayLevel>>();

  recordsWithArtists.forEach((recordRow) => {
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
    chartCount,
    availableVersions,
    tracks: tracks.flatMap((values, i) =>
      values.map(({ track }): TrackDbInfo => {
        const base = {
          title: track.title,
          type: track.type,
          version: +availableVersions[i].value,
        };

        if (duplicateTrackNameIdxs.has(track.idx)) {
          const artist = idxArtistMap.get(track.idx);
          return {
            ...base,
            artist,
            displayLevel: DIFFICULTIES.map(
              (difficulty) =>
                displayLevels
                  .get(
                    trackMapKey({
                      ...base,
                      artist,
                    })
                  )
                  ?.get(difficulty) || null
            ),
          };
        }

        return {
          ...base,
          displayLevel: DIFFICULTIES.map(
            (difficulty) =>
              displayLevels.get(trackMapKey(base))?.get(difficulty) || null
          ),
        };
      })
    ),
  };

  await fs.promises.mkdir(OUT_DIR, { recursive: true });

  await fs.promises.writeFile(OUT_FILE, JSON.stringify(data, null, 2), "utf-8");

  console.log("Database generated successfully.");
};

generate();
