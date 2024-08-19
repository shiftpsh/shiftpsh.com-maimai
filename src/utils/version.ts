import { SONG_DATABASE } from "../const/songDatabase";

const { latestVersion } = SONG_DATABASE;

export enum Version {
  maimai = 0,
  maimai_plus = 1,
  GreeN = 2,
  GreeN_plus = 3,
  ORANGE = 4,
  ORANGE_plus = 5,
  PiNK = 6,
  PiNK_plus = 7,
  MURASAKi = 8,
  MURASAKi_plus = 9,
  MiLK = 10,
  MiLK_plus = 11,
  FiNALE = 12,

  DX = 13,
  DX_plus = 14,
  Splash = 15,
  Splash_plus = 16,
  UNiVERSE = 17,
  UNiVERSE_plus = 18,
  FESTiVAL = 19,
  FESTiVAL_plus = 20,
  BUDDiES = 21,
  BUDDiES_plus = 22,
}

export const versionKanjiName = (version: number) => {
  if (version === -1) return "ALL";
  if (version === -2) return "NEW";
  if (version === -3) return "OLD";

  if (version === Version.maimai) return "舞";
  if (version === Version.maimai_plus) return "真";
  if (version === Version.GreeN) return "超";
  if (version === Version.GreeN_plus) return "檄";
  if (version === Version.ORANGE) return "橙";
  if (version === Version.ORANGE_plus) return "暁";
  if (version === Version.PiNK) return "桃";
  if (version === Version.PiNK_plus) return "櫻";
  if (version === Version.MURASAKi) return "紫";
  if (version === Version.MURASAKi_plus) return "菫";
  if (version === Version.MiLK) return "白";
  if (version === Version.MiLK_plus) return "雪";
  if (version === Version.FiNALE) return "輝";

  if (version === Version.DX) return "熊";
  if (version === Version.DX_plus) return "華";
  if (version === Version.Splash) return "爽";
  if (version === Version.Splash_plus) return "煌";
  if (version === Version.UNiVERSE) return "宙";
  if (version === Version.UNiVERSE_plus) return "星";
  if (version === Version.FESTiVAL) return "祭";
  if (version === Version.FESTiVAL_plus) return "祝";
  if (version === Version.BUDDiES) return "双";

  if (version === latestVersion) return "NEW";
  return null;
};

export const versionBackgroundColor = (version: number): string => {
  if (version === -1) return versionBackgroundColor(latestVersion);
  if (version === -2) return versionBackgroundColor(latestVersion);
  if (version === -3) return "#a9aeaf";

  if (version === Version.maimai || version === Version.maimai_plus)
    return "#2b8791";
  if (version === Version.GreeN || version === Version.GreeN_plus)
    return "#b5db01";
  if (version === Version.ORANGE || version === Version.ORANGE_plus)
    return "#ff6809";
  if (version === Version.PiNK || version === Version.PiNK_plus)
    return "#ff006f";
  if (version === Version.MURASAKi || version === Version.MURASAKi_plus)
    return "#9b6bff";
  if (version === Version.MiLK || version === Version.MiLK_plus)
    return "#6decfd";
  if (version === Version.FiNALE) return "#202e80";

  if (version === Version.DX || version === Version.DX_plus) return "#30a3ee";
  if (version === Version.Splash || version === Version.Splash_plus)
    return "#68c0ab";
  if (version === Version.UNiVERSE || version === Version.UNiVERSE_plus)
    return "#079edf";
  if (version === Version.FESTiVAL || version === Version.FESTiVAL_plus)
    return "#be89ff";
  if (version === Version.BUDDiES || version === Version.BUDDiES_plus)
    return "#ffbd1f";

  return "#2b8791";
};
