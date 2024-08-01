import parse, { HTMLElement } from "node-html-parser";
import { RecordSummary, TrackRecent } from "../../src/types/types";
import { dxScoreRank } from "../../src/utils/dxScore";
import { segaAxios } from "../axios";
import {
  parseChartTypeTextImgUrl,
  parseComboTextImgUrl,
  parseDifficultyTextImgUrl,
  parseSyncTextImgUrl,
} from "../utils/parseImageUrl";
import {
  isTrackClear,
  parseAchievement,
  parseDxScore,
  scoreRank,
} from "../utils/score";

const ENDPOINT = "/record";

export const fetchGameRecordRaw = async () => {
  const { data } = await segaAxios.get(ENDPOINT);
  return data;
};

const TRACK_REGEX = /TRACK ([0-9]+)/;
const GAME_TIME_REGEX = /(\d{4})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2})/;

export interface RecentGameRecordItem extends RecordSummary<TrackRecent> {
  trackNumber: number;
  time: Date;
}

const isValidGameRecordElem = (elem: HTMLElement) => {
  return elem.querySelector("div.playlog_top_container") !== null;
};

const parseGameRecordItem = (elem: HTMLElement): RecentGameRecordItem => {
  const [top, bottom] = elem.querySelectorAll("> div");

  const difficultyImgUrl =
    top.querySelector("img.playlog_diff")!.attributes.src;
  const meta = top.querySelectorAll("div.sub_title > span");
  const [, track] = TRACK_REGEX.exec(meta[0].text)!;
  const [, year, month, day, hour, minute] = GAME_TIME_REGEX.exec(
    meta[1].text
  )!;

  const title = bottom.querySelector("div.basic_block")!.text;
  const chartTypeImgUrl = bottom.querySelector("img.playlog_music_kind_icon")!
    .attributes.src;
  const achievementRaw = bottom.querySelector(
    "div.playlog_achievement_txt"
  )!.text;
  const dxScoreRaw = bottom.querySelector("div.playlog_score_block")!.text;
  const [fcImgUrl, syncImgUrl] = bottom
    .querySelectorAll("div.playlog_result_innerblock > img")
    .map((img) => img.attributes.src);

  const achievement = parseAchievement(achievementRaw);
  const dxScore = parseDxScore(dxScoreRaw);

  return {
    trackNumber: +track,
    time: new Date(`${year}-${month}-${day}T${hour}:${minute}+09:00`),
    track: {
      title,
      difficulty: parseDifficultyTextImgUrl(difficultyImgUrl),
      type: parseChartTypeTextImgUrl(chartTypeImgUrl),
    },
    score: {
      clear: isTrackClear(achievement),
      achievement,
      rank: scoreRank(achievement),
      dxScore,
      dxRank: dxScoreRank(dxScore),
      combo: parseComboTextImgUrl(fcImgUrl),
      sync: parseSyncTextImgUrl(syncImgUrl),
    },
  };
};

export const recents = async () => {
  const data = await fetchGameRecordRaw();
  const dom = parse(data, {
    parseNoneClosedTags: true,
  });

  const elems = dom
    .querySelectorAll("div.main_wrapper > div")
    .filter(isValidGameRecordElem);

  return elems.map(parseGameRecordItem);
};
