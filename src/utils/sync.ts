import { Sync } from "../types/types";

export const syncChipBackground = (sync: Sync) => {
  if (sync === "FULL SYNC DX+") {
    return `linear-gradient(-45deg, #f68426, #fab61e, #ffffff, #fcbf26, #f8ae52)`;
  }
  if (sync === "FULL SYNC DX") {
    return `linear-gradient(-45deg, #f56168, #e75c5f, #f7dda5, #eb6a69, #ff7f7f)`;
  }
  if (sync === "FULL SYNC+") {
    return `linear-gradient(-45deg, #6bd2f9, #43cbfe, #d7faff, #51d1fe, #72d5f9)`;
  }
  if (sync === "FULL SYNC") {
    return `linear-gradient(-45deg, #adbff4, #32a8e6, #3aa1e4, #589be4, #d8d2fb)`;
  }
  return "transparent";
};

export const syncColor = (sync: Sync) => {
  if (sync === "FULL SYNC DX+") return "#f8ae52";
  if (sync === "FULL SYNC DX") return "#ff7f7f";
  if (sync === "FULL SYNC+") return "#72d5f9";
  if (sync === "FULL SYNC") return "#d8d2fb";
  return "transparent";
};

export const syncSortWeight = (sync: Sync) => {
  if (sync === "FULL SYNC DX+") return 5;
  if (sync === "FULL SYNC DX") return 4;
  if (sync === "FULL SYNC+") return 3;
  if (sync === "FULL SYNC") return 2;
  if (sync === "SYNC PLAY") return 1;
  return 0;
};

export const indexToSync = (index: number): Sync => {
  if (index === 0) return null;
  if (index === 1) return "SYNC PLAY";
  if (index === 2) return "FULL SYNC";
  if (index === 3) return "FULL SYNC+";
  if (index === 4) return "FULL SYNC DX";
  if (index === 5) return "FULL SYNC DX+";
  throw new Error(`Invalid sync index: ${index}`);
};
