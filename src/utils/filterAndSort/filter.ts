import { ratingsLatest, ratingsOld } from "../../const/bestRatings";
import { SONG_DATABASE, SongDatabaseItem } from "../../const/songDatabase";
import { ChartType, Difficulty } from "../../types/types";
import { rating } from "../rating";
import { Filter } from "./types";

const { latestVersion } = SONG_DATABASE;

const internalKey = (record: {
  title: string;
  artist: string | null;
  type: ChartType;
  difficulty: Difficulty;
}) => `${record.title}:${record.artist}:${record.type}:${record.difficulty}`;

const minRatingLatestVersion =
  ratingsLatest.length === 15 ? ratingsLatest[14].record!.rating + 1 : 0;

const minRatingOldVersion =
  ratingsOld.length === 35 ? ratingsOld[34].record!.rating + 1 : 0;

const latestSet = new Set(ratingsLatest.map((x) => internalKey(x)));

const oldSet = new Set(ratingsOld.map((x) => internalKey(x)));

export const filterRecord = (song: SongDatabaseItem, filter: Filter) => {
  const {
    level,
    achievement,
    version,
    played,
    hasRatingIncreasingPotential,
    inBestRatings,
  } = filter;

  if (level) {
    const [levelMin, levelMax] = level;
    if (song.internalLevel < levelMin || song.internalLevel > levelMax) {
      return false;
    }
  }
  if (achievement) {
    const [achMin, achMax] = achievement;
    if (
      song.record &&
      (song.record.achievement < achMin || song.record.achievement > achMax)
    ) {
      return false;
    }
    if (!song.record && achMin > 0) {
      return false;
    }
  }
  if (version) {
    if (!version.includes(song.version)) {
      return false;
    }
  }
  if (played) {
    if (!song.record) {
      return false;
    }
  }
  if (hasRatingIncreasingPotential) {
    const { internalLevel } = song;
    const ratingNeeded =
      song.version === latestVersion
        ? minRatingLatestVersion
        : minRatingOldVersion;
    if (song.record && song.record.rank === "SSS+") return false;
    if (rating(100.5e4, internalLevel) < ratingNeeded) return false;
  }
  if (inBestRatings) {
    if (!latestSet.has(internalKey(song)) && !oldSet.has(internalKey(song)))
      return false;
  }
  return true;
};
