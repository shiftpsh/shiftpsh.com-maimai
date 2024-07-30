export const classRankName = (rank: number) => {
  if (rank <= 4) return `B${5 - rank}`;
  if (rank <= 9) return `A${10 - rank}`;
  if (rank <= 14) return `S${15 - rank}`;
  if (rank <= 19) return `SS${20 - rank}`;
  if (rank <= 24) return `SSS${25 - rank}`;
  return "LEGEND";
};

export const classRankTextColor = (rank: number) => {
  if (rank <= 4) return "#117a15"
  if (rank <= 9) return "#b32f2e"
  if (rank <= 14) return "#73400b"
  if (rank <= 19) return "#2d2f83"
  if (rank <= 24) return "#cab441"
  return "#6c2984";
};
