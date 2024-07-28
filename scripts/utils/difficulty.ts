import { Difficulty } from "../../src/types/types";

export const toDifficultyInt = (difficulty: Difficulty): number => {
  switch (difficulty) {
    case "Re:MASTER":
      return 4;
    case "MASTER":
      return 3;
    case "EXPERT":
      return 2;
    case "ADVANCED":
      return 1;
    case "BASIC":
      return 0;
  }
};
