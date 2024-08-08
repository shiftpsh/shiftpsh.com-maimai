import { Difficulty } from "../types/types";

export const difficultyBackgroundColor = (difficulty: Difficulty) => {
  if (difficulty === "Re:MASTER") return "#e8e8e8";
  if (difficulty === "MASTER") return "#a65cdf";
  if (difficulty === "EXPERT") return "#fa6c75";
  if (difficulty === "ADVANCED") return "#ffc205";
  if (difficulty === "BASIC") return "#4cc927";
  throw new Error(`Unknown difficulty: ${difficulty}`);
};

export const difficultyBorderColor = (difficulty: Difficulty) => {
  if (difficulty === "Re:MASTER") return "#d39cf3";
  return difficultyBackgroundColor(difficulty);
};

export const difficultyTextGradientLight = (difficulty: Difficulty) => {
  if (difficulty === "Re:MASTER")
    return "linear-gradient(to bottom, #dbbbed, #9a5ec2)";
  if (difficulty === "MASTER")
    return "linear-gradient(to bottom, #ffffff, #fdd2ff)";
  if (difficulty === "EXPERT")
    return "linear-gradient(to bottom, #ffffff, #fee6d8)";
  if (difficulty === "ADVANCED")
    return "linear-gradient(to bottom, #ffffff, #fbfdd5)";
  if (difficulty === "BASIC")
    return "linear-gradient(to bottom, #ffffff, #ecffd6)";
  throw new Error(`Unknown difficulty: ${difficulty}`);
};

export const difficultyTextGradientDark = (difficulty: Difficulty) => {
  if (difficulty === "Re:MASTER")
    return "linear-gradient(to bottom, #a42ef3, #5908a1)";
  return difficultyTextGradientLight(difficulty);
};

export const difficultyLevelBackground = (difficulty: Difficulty) => {
  if (difficulty === "Re:MASTER")
    return "linear-gradient(to bottom, #f3e4ff, #dfc5ed)";
  if (difficulty === "MASTER")
    return "linear-gradient(to bottom, #e4befe, #c183e6)";
  if (difficulty === "EXPERT")
    return "linear-gradient(to bottom, #fcc2c6, #f38b92)";
  if (difficulty === "ADVANCED")
    return "linear-gradient(to bottom, #feea87, #f6cf3a)";
  if (difficulty === "BASIC")
    return "linear-gradient(to bottom, #beeaa8, #76cf53)";
  throw new Error(`Unknown difficulty: ${difficulty}`);
};

export const difficultySortWeight = (difficulty: Difficulty) => {
  if (difficulty === "Re:MASTER") return 4;
  if (difficulty === "MASTER") return 3;
  if (difficulty === "EXPERT") return 2;
  if (difficulty === "ADVANCED") return 1;
  if (difficulty === "BASIC") return 0;
  throw new Error(`Unknown difficulty: ${difficulty}`);
};
