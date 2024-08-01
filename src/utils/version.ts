import { SONG_DATABASE } from "../const/songDatabase";

const { latestVersion } = SONG_DATABASE;

export const versionKanjiName = (version: number) => {
  if (version === -1) return "ALL";
  if (version === -2) return "NEW";
  if (version === -3) return "OLD";
  if (version === 0) return "舞";
  if (version === 1) return "真";
  if (version === 2) return "超";
  if (version === 3) return "檄";
  if (version === 4) return "橙";
  if (version === 5) return "暁";
  if (version === 6) return "桃";
  if (version === 7) return "櫻";
  if (version === 8) return "紫";
  if (version === 9) return "菫";
  if (version === 10) return "白";
  if (version === 11) return "雪";
  if (version === 12) return "輝";

  if (version === 13) return "熊";
  if (version === 14) return "華";
  if (version === 15) return "爽";
  if (version === 16) return "煌";
  if (version === 17) return "宙";
  if (version === 18) return "星";
  if (version === 19) return "祭";
  if (version === 20) return "祝";
  if (version === 21) return "双";
  if (version === latestVersion) return "NEW";
  return null;
};

export const versionBackgroundColor = (version: number): string => {
  if (version === -1) return versionBackgroundColor(latestVersion);
  if (version === -2) return versionBackgroundColor(latestVersion);
  if (version === -3) return "#a9aeaf";
  if (version <= 1) return "#2b8791";
  if (version <= 3) return "#b5db01";
  if (version <= 5) return "#ff6809";
  if (version <= 7) return "#ff006f";
  if (version <= 9) return "#9b6bff";
  if (version <= 11) return "#6decfd";
  if (version === 12) return "#202e80";

  if (version <= 14) return "#30a3ee";
  if (version <= 16) return "#68c0ab";
  if (version <= 18) return "#079edf";
  if (version <= 20) return "#be89ff";
  if (version <= 22) return "#ffbd1f";

  return "#2b8791";
};
