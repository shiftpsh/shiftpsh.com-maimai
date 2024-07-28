import { TrophyTier } from "../../src/types/types";

interface DomTokenListLike {
  contains: (className: string) => boolean;
}

export const parseTrophyTier = (classList: DomTokenListLike): TrophyTier => {
  if (classList.contains("trophy_Normal")) return "Normal";
  if (classList.contains("trophy_Bronze")) return "Bronze";
  if (classList.contains("trophy_Silver")) return "Silver";
  if (classList.contains("trophy_Gold")) return "Gold";
  if (classList.contains("trophy_Rainbow")) return "Rainbow";
  throw new Error("Invalid trophy tier");
};
