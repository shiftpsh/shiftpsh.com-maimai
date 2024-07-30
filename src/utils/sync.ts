import { Sync } from "../types/types";

export const syncChipBackground = (combo: Sync) => {
  if (combo === "FULL SYNC DX+") {
    return `linear-gradient(-45deg, #f68426, #fab61e, #ffffff, #fcbf26, #f8ae52)`;
  }
  if (combo === "FULL SYNC DX") {
    return `linear-gradient(-45deg, #f56168, #e75c5f, #f7dda5, #eb6a69, #ff7f7f)`;
  }
  if (combo === "FULL SYNC+") {
    return `linear-gradient(-45deg, #6bd2f9, #43cbfe, #d7faff, #51d1fe, #72d5f9)`;
  }
  if (combo === "FULL SYNC") {
    return `linear-gradient(-45deg, #adbff4, #32a8e6, #3aa1e4, #589be4, #d8d2fb)`;
  }
  return "transparent";
};
