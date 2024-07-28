import { ChartType, Combo, Difficulty, Sync } from "../../src/types/types";

export const parseDifficultyTextImgUrl = (url: string): Difficulty => {
  const pngName = /\/([^/]+)\.png/.exec(url)![1];
  if (pngName === "diff_remaster") return "Re:MASTER";
  if (pngName === "diff_master") return "MASTER";
  if (pngName === "diff_expert") return "EXPERT";
  if (pngName === "diff_advanced") return "ADVANCED";
  if (pngName === "diff_basic") return "BASIC";
  throw new Error(`Unknown difficulty image URL: ${url}`);
};

export const parseChartTypeTextImgUrl = (url: string): ChartType => {
  const pngName = /\/([^/]+)\.png/.exec(url)![1];
  if (pngName === "music_dx") return "DX";
  if (pngName === "music_standard") return "Standard";
  throw new Error(`Unknown chart type image URL: ${url}`);
};

export const parseComboTextImgUrl = (url: string): Combo => {
  const pngName = /\/([^/]+)\.png/.exec(url)![1];
  if (pngName === "fc_dummy") return null;
  if (pngName === "fc") return "FULL COMBO";
  if (pngName === "fcplus") return "FULL COMBO+";
  if (pngName === "ap") return "ALL PERFECT";
  if (pngName === "applus") return "ALL PERFECT+";
  throw new Error(`Unknown combo image URL: ${url}`);
};

export const parseComboIcnImgUrl = (url: string): Combo => {
  const pngName = /\/([^/]+)\.png/.exec(url)![1];
  if (pngName === "music_icon_back") return null;
  if (pngName === "music_icon_fc") return "FULL COMBO";
  if (pngName === "music_icon_fcp") return "FULL COMBO+";
  if (pngName === "music_icon_ap") return "ALL PERFECT";
  if (pngName === "music_icon_app") return "ALL PERFECT+";
  throw new Error(`Unknown combo image URL: ${url}`);
};

export const parseSyncTextImgUrl = (url: string): Sync => {
  const pngName = /\/([^/]+)\.png/.exec(url)![1];
  if (pngName === "sync_dummy") return null;
  if (pngName === "sync") return "SYNC PLAY";
  if (pngName === "fs") return "FULL SYNC";
  if (pngName === "fsplus") return "FULL SYNC+";
  if (pngName === "fsd") return "FULL SYNC DX";
  if (pngName === "fsdplus") return "FULL SYNC DX+";
  throw new Error(`Unknown sync image URL: ${url}`);
};

export const parseSyncIcnImgUrl = (url: string): Sync => {
  const pngName = /\/([^/]+)\.png/.exec(url)![1];
  if (pngName === "music_icon_back") return null;
  if (pngName === "music_icon_sync") return "SYNC PLAY";
  if (pngName === "music_icon_fs") return "FULL SYNC";
  if (pngName === "music_icon_fsp") return "FULL SYNC+";
  if (pngName === "music_icon_fdx") return "FULL SYNC DX";
  if (pngName === "music_icon_fdxp") return "FULL SYNC DX+";
  throw new Error(`Unknown sync image URL: ${url}`);
};

export const parseCourseRank = (url: string): number => {
  const pngName = /\/([^/]+)\.png/.exec(url)![1];
  const rank = /^course_rank_(\d+)/.exec(pngName)![1];
  return +rank;
};

export const parseClassRank = (url: string): number => {
  const pngName = /\/([^/]+)\.png/.exec(url)![1];
  const rank = /^class_rank_s_(\d+)/.exec(pngName)![1];
  return +rank;
};
