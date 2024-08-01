import { DxScore, Rank } from "../../src/types/types";

export const parseAchievement = (achievement: string): number => {
  return Math.round(+achievement.replace(/[% ]/g, "") * 1e4);
};

const DX_SCORE_REGEX = /([\d,]+) \/ ([\d,]+)/;

export const parseDxScore = (dxScore: string): DxScore => {
  const [, scoreRaw, maxRaw] = DX_SCORE_REGEX.exec(dxScore)!;
  const score = +scoreRaw.replace(/,/g, "");
  const max = +maxRaw.replace(/,/g, "");
  const percentage = max ? (score / max) * 100 : 0;
  return {
    score,
    max,
    percentage,
  };
};

export const scoreRank = (achievement: number): Rank => {
  if (achievement >= 100.5e4) return "SSS+";
  if (achievement >= 100.0e4) return "SSS";
  if (achievement >= 99.5e4) return "SS+";
  if (achievement >= 99.0e4) return "SS";
  if (achievement >= 98.0e4) return "S+";
  if (achievement >= 97.0e4) return "S";
  if (achievement >= 94.0e4) return "AAA";
  if (achievement >= 90.0e4) return "AA";
  if (achievement >= 80.0e4) return "A";
  if (achievement >= 75.0e4) return "BBB";
  if (achievement >= 70.0e4) return "BB";
  if (achievement >= 60.0e4) return "B";
  if (achievement >= 50.0e4) return "C";
  return "D";
};

export const isTrackClear = (achievement: number) => {
  return achievement >= 80.0e4;
};
