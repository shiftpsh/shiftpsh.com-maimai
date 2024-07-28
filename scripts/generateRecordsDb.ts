import * as fs from "fs";
import { GameScore, RecordSummary, TrackRecordInfo } from "../src/types/types";
import { songScores } from "./api/songScore";
import { login } from "./axios";
import { batchedPromiseAll } from "./utils/promise";
import { dedupeRecords } from "./utils/songTitle";

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
  console.log("Fetching records...");

  const records = await batchedPromiseAll(
    DIFFICULTIES.map((difficulty) => async () => songScores({ difficulty }))
  );
  const dedupedRecords = await dedupeRecords(records);
  console.log("Fetched all records.");

  const data = {
    records: dedupedRecords.flatMap((values) =>
      values
        .filter(({ score }) => score)
        .map(
          ({ score, track }) =>
            ({
              track: {
                title: track.title,
                type: track.type,
                difficulty: track.difficulty,
                artist: track.artist,
              },
              score: score!,
            } satisfies RecordSummary<TrackRecordInfo, GameScore>)
        )
    ),
  };

  await fs.promises.mkdir("./src/db", { recursive: true });

  await fs.promises.writeFile(
    "./src/db/records.json",
    JSON.stringify(data, null, 2),
    "utf-8"
  );

  console.log("Database generated successfully.");
};

generate();
