import { SongDatabaseItem } from "../../const/songDatabase";

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
