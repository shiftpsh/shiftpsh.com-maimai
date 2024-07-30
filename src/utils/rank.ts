import { Rank } from "../types/types";

export const rankChipBackground = (rank: Rank) => {
  if (rank === "SSS+")
    return `linear-gradient(to right, #ff4c46, #fef506, #08c8ff)`;
  if (rank === "SSS") return "#e0414a";
  if (rank === "SS+") return "#ffcb68";
  if (rank === "SS") return "#ffa800";
  if (rank === "S+") return "#beddec";
  if (rank === "S") return "#9bbbca";
  return "#bababa";
};
