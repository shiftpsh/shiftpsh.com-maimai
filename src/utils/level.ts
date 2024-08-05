import { DisplayLevel } from "../types/types";

export const displayLevelRange = (level: DisplayLevel): [number, number] => {
  const plus = level.endsWith("+");
  const base = +(plus ? level.slice(0, -1) : level);

  if (base <= 6) {
    return [base * 10, base * 10 + 9];
  }
  if (plus) {
    // .6 - .9
    return [base * 10 + 6, base * 10 + 9];
  }

  // .0 - .5
  return [base * 10, base * 10 + 5];
};
