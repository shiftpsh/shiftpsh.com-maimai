import { Combo } from "../types/types";

export const comboChipBackground = (combo: Combo) => {
  if (combo === "ALL PERFECT+") {
    return `linear-gradient(-45deg, #f68426, #fab61e, #ffffff, #fcbf26, #f8ae52)`;
  }
  if (combo === "ALL PERFECT") {
    return `linear-gradient(-45deg, #f56168, #e75c5f, #f7dda5, #eb6a69, #ff7f7f)`;
  }
  if (combo === "FULL COMBO+") {
    return `linear-gradient(-45deg, #7ad854, #94ee4a, #f6f777, #95ec49, #7bd953)`;
  }
  if (combo === "FULL COMBO") {
    return `linear-gradient(-45deg, #b8f629, #2ec20f, #79d634, #30c210, #30c210)`;
  }
  return "transparent";
};

export const comboSortWeight = (combo: Combo) => {
  if (combo === "ALL PERFECT+") return 4;
  if (combo === "ALL PERFECT") return 3;
  if (combo === "FULL COMBO+") return 2;
  if (combo === "FULL COMBO") return 1;
  return 0;
};
