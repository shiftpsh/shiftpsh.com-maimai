import { SORT_CRITERIAS } from "./sort";
import { Filter, RecordSortObject } from "./types";

export const filterToUrlQuery = (filter: Filter, sort: RecordSortObject) => {
  const query = new URLSearchParams();
  if (filter.level) {
    query.set("level", filter.level.join(","));
  }
  if (filter.achievement) {
    query.set("achievement", filter.achievement.join(","));
  }
  if (filter.version) {
    query.set("version", filter.version.join(","));
  }
  if (filter.played) {
    query.set("played", "true");
  }
  if (filter.hasRatingIncreasingPotential) {
    query.set("hasRatingIncreasingPotential", "true");
  }
  if (filter.inBestRatings) {
    query.set("inBestRatings", "true");
  }
  query.set("sort", sort.sort.name);
  query.set("order", sort.order);
  return query.toString();
};

export const filterFromUrlQuery = (query: URLSearchParams) => {
  const filter: Filter = {};
  const level = query.get("level");
  if (level) {
    filter.level = level.split(",").map((x) => +x) as [number, number];
  }
  const achievement = query.get("achievement");
  if (achievement) {
    filter.achievement = achievement.split(",").map((x) => +x) as [
      number,
      number
    ];
  }
  const version = query.get("version");
  if (version) {
    filter.version = version.split(",").map((x) => +x);
  }
  if (query.get("played")) {
    filter.played = true;
  }
  if (query.get("hasRatingIncreasingPotential")) {
    filter.hasRatingIncreasingPotential = true;
  }
  if (query.get("inBestRatings")) {
    filter.inBestRatings = true;
  }
  const sortName = query.get("sort");
  const order = query.get("order");
  return {
    filter,
    sort: {
      sort:
        SORT_CRITERIAS.find((x) => x.name === sortName) || SORT_CRITERIAS[0],
      order: order === "asc" ? ("asc" as const) : ("desc" as const),
    },
  };
};
