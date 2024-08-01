import { DxRank, DxScore } from "../types/types";

export const dxScoreRank = ({ score, max }: DxScore): DxRank => {
  if (score === max) return 7;
  if (score * 100 >= max * 99) return 6;
  if (score * 100 >= max * 98) return 5.5;
  if (score * 100 >= max * 97) return 5;
  if (score * 100 >= max * 95) return 4;
  if (score * 100 >= max * 93) return 3;
  if (score * 100 >= max * 90) return 2;
  if (score * 100 >= max * 85) return 1;
  return 0;
};

export const dxScoreBorders = (
  max: number
): {
  [key in DxRank]: number;
} => {
  return {
    7: max,
    6: Math.ceil(max * 0.99),
    5.5: Math.ceil(max * 0.98),
    5: Math.ceil(max * 0.97),
    4: Math.ceil(max * 0.95),
    3: Math.ceil(max * 0.93),
    2: Math.ceil(max * 0.9),
    1: Math.ceil(max * 0.85),
    0: 0,
  };
};

const nextDxRank = (rank: DxRank): DxRank => {
  if (rank === 7) return 7;
  if (rank === 5.5) return 6;
  if (rank === 5) return 5.5;
  return (rank + 1) as DxRank;
};

export const dxScoreClosestNextBorder = ({
  score,
  max,
  percentage,
}: DxScore): {
  nextBorder: DxRank;
  scoreUntilNextBorder: number;
} => {
  const rank = dxScoreRank({ score, max, percentage });
  const borders = dxScoreBorders(max);
  const nextBorder = nextDxRank(rank);
  const scoreUntilNextBorder = borders[nextBorder] - score;
  return {
    nextBorder,
    scoreUntilNextBorder,
  };
};

export const dxRankChipBackground = (rank: DxRank) => {
  if (rank === 7)
    return `linear-gradient(135deg, #1dffff, #0bb0ff, #f847ff, #ea0d00, #fffb00, #20d800)`;
  if (rank === 6) return `linear-gradient(-45deg, #b058ff, #f847ff, #ea0d00)`;
  if (rank === 5.5)
    return `linear-gradient(135deg, #f8dc62, #fcfdf0, #f8dc62, #fcf282)`;
  if (rank === 5)
    return `linear-gradient(135deg, #fbb60b, #f8dc62, #fbb60b, #fdcf03)`;
  if (rank === 4)
    return `linear-gradient(-45deg, #f68426, #fab61e, #fcbf26, #f8ae52)`;
  if (rank === 3)
    return `linear-gradient(-45deg, #f56168, #e75c5f, #eb6a69, #ff7f7f)`;
  if (rank === 2)
    return `linear-gradient(-45deg, #7ad854, #94ee4a, #f6f777, #95ec49, #7bd953)`;
  if (rank === 1)
    return `linear-gradient(-45deg, #b8f629, #2ec20f, #79d634, #30c210, #30c210)`;
  return "transparent";
};
