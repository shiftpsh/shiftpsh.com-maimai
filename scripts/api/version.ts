import parse, { HTMLElement } from "node-html-parser";
import { segaAxios } from "../axios";
import { toDifficultyInt } from "../utils/difficulty";
import {
  extractAllRecordSummaryBlocks,
  parseRecordSummaryBlock,
} from "../utils/parseRecordSummaryBlock";
import { Difficulty } from "../../src/types/types";

export interface VersionArgs {
  version: number;
  difficulty: Difficulty;
}

const ENDPOINT = "/record/musicVersion";

export const fetchVersionRaw = async () => {
  const { data } = await segaAxios.get(ENDPOINT);
  return data;
};

const parseAvailableVersions = (elem: HTMLElement) => {
  const versionSelect = elem.querySelector("select[name=version]")!;
  const options = versionSelect.querySelectorAll("option");

  return options.map((option) => ({
    value: +option.attributes.value,
    name: option.text.trim(),
  }));
};

export const version = async () => {
  const data = await fetchVersionRaw();
  const dom = parse(data, {
    parseNoneClosedTags: true,
  });

  return { availableVersions: parseAvailableVersions(dom) };
};

export const versionDetails = async ({ version, difficulty }: VersionArgs) => {
  const { data } = await segaAxios.get(`${ENDPOINT}/search`, {
    params: {
      version,
      diff: toDifficultyInt(difficulty),
    },
  });
  const dom = parse(data, {
    parseNoneClosedTags: true,
  });

  const scoreBlocks = extractAllRecordSummaryBlocks(dom);

  return scoreBlocks.map(parseRecordSummaryBlock);
};
