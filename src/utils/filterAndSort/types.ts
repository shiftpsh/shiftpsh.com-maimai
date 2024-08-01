import { SongDatabaseItem } from "../../const/songDatabase";
import { Rank } from "../../types/types";

export type RecordSortFn = (a: SongDatabaseItem, b: SongDatabaseItem) => number;

export interface RecordSortFilter {
  name: string;
  sortAscending: RecordSortFn;
  sortDescending?: RecordSortFn;
}

export interface RecordSortObject {
  sort: RecordSortFilter;
  order: "asc" | "desc";
}

export type Range<T> = [T, T];

export interface Filter {
  level?: Range<number>;
  rank?: Rank[];
  version?: number[];
  played?: boolean;
  hasRatingIncreasingPotential?: boolean;
  inBestRatings?: boolean;
}
