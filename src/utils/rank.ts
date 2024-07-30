import { darken } from "polished";
import { Rank } from "../types/types";

export const rankChipBackground = (rank: Rank) => {
  if (rank === "SSS+")
    return `linear-gradient(135deg, #1dffff, #0bb0ff, #f847ff, #ea0d00, #fffb00, #20d800)`;
  if (rank === "SSS") return `linear-gradient(-45deg, #b058ff, #f847ff, #ea0d00)`;
  if (rank === "SS+")
    return `linear-gradient(135deg, #f8dc62, #fcfdf0, #f8dc62, #fcf282)`;
  if (rank === "SS")
    return `linear-gradient(135deg, #fbb60b, #f8dc62, #fbb60b, #fdcf03)`;
  if (rank === "S+")
    return `linear-gradient(135deg, #9bd1f4, #cbecf8, #9bd1f4)`;
  if (rank === "S") return `linear-gradient(135deg, #46a6e4, #9bd1f4, #46a6e4)`;
  if (rank === "AAA") return "#f98b8b";
  if (rank === "AA") return darken(0.15, "#f98b8b");
  if (rank === "A") return darken(0.3, "#f98b8b");
  if (rank === "BBB") return "#5c6ef4";
  if (rank === "BB") return darken(0.1, "#5c6ef4");
  if (rank === "B") return darken(0.2, "#5c6ef4");
  if (rank === "C") return "#bababa";
  if (rank === "D") return darken(0.2, "#bababa");
  return darken(0.2, "#bababa");
};
