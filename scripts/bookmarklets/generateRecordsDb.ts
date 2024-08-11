import {
  GameScore,
  RecordSummary,
  TrackRecordInfo,
} from "../../src/types/types";
import { songScores } from "../api/songScore";
import { batchedPromiseAll } from "../utils/promise";
import { dedupeRecords } from "../utils/songTitle";
import { playerData } from "../api/playerData";

const DIFFICULTIES = [
  "BASIC",
  "ADVANCED",
  "EXPERT",
  "MASTER",
  "Re:MASTER",
] as const;

const generate = async () => {
  const records = await batchedPromiseAll(
    DIFFICULTIES.map((difficulty) => async () => songScores({ difficulty }))
  );
  const { recordsWithArtists } = await dedupeRecords(records);
  console.log("Fetched all records.");

  const profile = await playerData();

  const data = {
    profile,
    records: recordsWithArtists.flatMap((values) =>
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

  console.log("Database generated successfully.");

  console.log(data)
};

generate();
