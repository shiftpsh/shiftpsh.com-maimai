import { SongDatabaseItem } from "../../const/songDatabase";
import { comboSortWeight } from "../combo";
import { dxScoreClosestNextBorder } from "../dxScore";
import { syncSortWeight } from "../sync";
import { RecordSortFilter, RecordSortFn, RecordSortObject } from "./types";

const achievement: RecordSortFn = (a, b) => {
  if (a.record?.achievement === b.record?.achievement) {
    if (a.internalLevel === b.internalLevel) {
      if (a.record?.combo === b.record?.combo) {
        return (
          syncSortWeight(a.record?.sync || null) -
          syncSortWeight(b.record?.sync || null)
        );
      }
      return (
        comboSortWeight(a.record?.combo || null) -
        comboSortWeight(b.record?.combo || null)
      );
    }
    return a.internalLevel - b.internalLevel;
  }
  return (a.record?.achievement || 0) - (b.record?.achievement || 0);
};

const level: RecordSortFn = (a, b) => {
  if (a.internalLevel === b.internalLevel) {
    return achievement(a, b);
  }
  return a.internalLevel - b.internalLevel;
};

const version: RecordSortFn = (a, b) => {
  if (a.version === b.version) {
    return rating(a, b);
  }
  return a.version - b.version;
};

const title: RecordSortFn = (a, b) => {
  if (a.title === b.title) {
    return level(a, b);
  }
  return a.title.localeCompare(b.title, "ja");
};

const rating: RecordSortFn = (a, b) => {
  if (a.record?.rating === b.record?.rating) {
    return achievement(a, b);
  }
  return (a.record?.rating || 0) - (b.record?.rating || 0);
};

const sync: RecordSortFn = (a, b) => {
  if (a.record?.sync === b.record?.sync) {
    return achievement(a, b);
  }
  return (
    syncSortWeight(a.record?.sync || null) -
    syncSortWeight(b.record?.sync || null)
  );
};

const combo: RecordSortFn = (a, b) => {
  if (a.record?.combo === b.record?.combo) {
    return achievement(a, b);
  }
  return (
    comboSortWeight(a.record?.combo || null) -
    comboSortWeight(b.record?.combo || null)
  );
};

const dxPercent: RecordSortFn = (a, b) => {
  if (a.record?.dxScore.percentage === b.record?.dxScore.percentage) {
    return achievement(a, b);
  }
  return (
    (a.record?.dxScore.percentage || 0) - (b.record?.dxScore.percentage || 0)
  );
};

const dxRankThenUntilNextRank: RecordSortFn = (a, b) => {
  if (a.record?.dxRank === b.record?.dxRank) {
    if (!a.record || !b.record) return achievement(a, b);
    const aBorder = dxScoreClosestNextBorder(a.record.dxScore);
    const bBorder = dxScoreClosestNextBorder(b.record.dxScore);
    return bBorder.scoreUntilNextBorder - aBorder.scoreUntilNextBorder;
  }
  return (a.record?.dxRank || 0) - (b.record?.dxRank || 0);
};

const ascAndDesc = (fn: RecordSortFn) => ({
  sortAscending: fn,
  sortDescending: (a: SongDatabaseItem, b: SongDatabaseItem) => fn(b, a),
});

export const SORT_CRITERIAS: RecordSortFilter[] = [
  { name: "레이팅", ...ascAndDesc(rating) },
  { name: "제목", ...ascAndDesc(title) },
  { name: "레벨", ...ascAndDesc(level) },
  { name: "버전", ...ascAndDesc(version) },
  { name: "스코어", ...ascAndDesc(achievement) },
  { name: "AP/FC", ...ascAndDesc(combo) },
  { name: "SYNC", ...ascAndDesc(sync) },
  { name: "DX %", ...ascAndDesc(dxPercent) },
  { name: "DX Border", ...ascAndDesc(dxRankThenUntilNextRank) },
];

export const sortRecords = (
  records: SongDatabaseItem[],
  object: RecordSortObject
) =>
  object.order === "asc"
    ? records.sort(object.sort.sortAscending)
    : records.sort(
        object.sort.sortDescending ??
          ((a, b) => object.sort.sortAscending(b, a))
      );
