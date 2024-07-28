import parse from "node-html-parser";
import { Difficulty } from "../../src/types/types";
import { segaAxios } from "../axios";
import { toDifficultyInt } from "../utils/difficulty";
import {
  extractAllRecordSummaryBlocks,
  parseRecordSummaryBlock,
} from "../utils/parseRecordSummaryBlock";

export interface SongScoreArgs {
  difficulty: Difficulty;
}

const ENDPOINT = "/record/musicGenre";

export const songScores = async ({ difficulty }: SongScoreArgs) => {
  const { data } = await segaAxios.get(`${ENDPOINT}/search`, {
    params: {
      genre: 99,
      diff: toDifficultyInt(difficulty),
    },
  });
  const dom = parse(data, {
    parseNoneClosedTags: true,
  });

  const scoreBlocks = extractAllRecordSummaryBlocks(dom);

  return scoreBlocks.map(parseRecordSummaryBlock);
};
