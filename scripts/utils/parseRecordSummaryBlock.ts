import { HTMLElement } from "node-html-parser";
import {
  ChartType,
  DisplayLevel,
  GameScore,
  RecordSummary,
  TrackInternalRecord,
} from "../../src/types/types";
import { dxScoreRank } from "../../src/utils/dxScore";
import {
  parseChartTypeTextImgUrl,
  parseComboIcnImgUrl,
  parseDifficultyTextImgUrl,
  parseSyncIcnImgUrl,
} from "./parseImageUrl";
import {
  isTrackClear,
  parseAchievement,
  parseDxScore,
  scoreRank,
} from "./score";

export const isValidRecordSummaryBlock = (elem: HTMLElement) => {
  return (
    elem.querySelector("form") !== null &&
    elem.querySelector("input[name=idx]") !== null
  );
};

export const extractAllRecordSummaryBlocks = (elem: HTMLElement) => {
  return elem
    .querySelectorAll("div.main_wrapper > div")
    .filter(isValidRecordSummaryBlock);
};

const parseChartType = (elem: HTMLElement): ChartType => {
  const icon = elem.querySelector("img.music_kind_icon");
  if (icon) {
    return parseChartTypeTextImgUrl(icon.attributes.src);
  }

  const std = elem.querySelector("img.music_kind_icon_standard")!;
  const dx = elem.querySelector("img.music_kind_icon_dx")!;
  if (std.classList.contains("pointer")) return "DX";
  if (dx.classList.contains("pointer")) return "Standard";
  throw new Error(`Unknown chart type\n${elem.toString()}`);
};

export const parseRecordSummaryBlock = (
  elem: HTMLElement
): RecordSummary<TrackInternalRecord, GameScore | null> => {
  const form = elem.querySelector("form")!;

  const difficultyImgUrl =
    form.querySelector("img:nth-child(1)")!.attributes.src;
  const title = form.querySelector("div.music_name_block")!.text.trim();
  const level = form.querySelector("div.music_lv_block")!.text.trim();
  const idx = form.querySelector("input[name=idx]")!.attributes.value;

  const track: TrackInternalRecord = {
    title,
    difficulty: parseDifficultyTextImgUrl(difficultyImgUrl),
    type: parseChartType(elem),
    displayLevel: level as DisplayLevel,
    idx,
  };

  const scoreRow = form.querySelectorAll("div.music_score_block");

  if (!scoreRow.length) {
    return {
      track,
      score: null,
    };
  }

  const [achievementRaw, dxScoreRaw] = scoreRow.map((row) => row.text.trim());
  const achievement = parseAchievement(achievementRaw);
  const dxScore = parseDxScore(dxScoreRaw);

  const [syncImgUrl, fcImgUrl] = form
    .querySelectorAll("img.h_30.f_r")
    .map((img) => img.attributes.src);

  return {
    track,
    score: {
      clear: isTrackClear(achievement),
      achievement,
      rank: scoreRank(achievement),
      dxScore,
      dxRank: dxScoreRank(dxScore),
      combo: parseComboIcnImgUrl(fcImgUrl),
      sync: parseSyncIcnImgUrl(syncImgUrl),
    },
  };
};
