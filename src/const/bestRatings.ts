import { SONG_DATABASE, SongDatabaseItemWithRecord } from "./songDatabase";

const { tracks, latestVersion } = SONG_DATABASE;

export const ratingsLatest = tracks
  .filter((x) => x.version === latestVersion && x.record)
  .sort((a, b) =>
    b.record!.rating !== a.record!.rating
      ? b.record!.rating - a.record!.rating
      : b.record!.achievement - a.record!.achievement
  )
  .slice(0, 15) as SongDatabaseItemWithRecord[];

export const ratingsOld = tracks
  .filter((x) => x.version !== latestVersion && x.record)
  .sort((a, b) =>
    b.record!.rating !== a.record!.rating
      ? b.record!.rating - a.record!.rating
      : b.record!.achievement - a.record!.achievement
  )
  .slice(0, 35) as SongDatabaseItemWithRecord[];
