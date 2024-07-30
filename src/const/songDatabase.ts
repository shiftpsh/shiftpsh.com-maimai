import RAW_INTERNAL_DB from "../db/internal.json";
import RAW_META_DB from "../db/meta.json";
import RAW_RECORDS_DB from "../db/records.json";
import RAW_SONGS_DB from "../db/songs.json";
import {
  BestEffortInternalLevelJson,
  BestEffortInternalLevelRecord,
  ChartType,
  Difficulty,
  DisplayLevel,
  GameScore,
  MetaItem,
  MetaJson,
  RecordsJson,
  RecordSummary,
  SongsJson,
  TrackRecordInfo,
} from "../types/types";
import { displayLevelRange } from "../utils/level";

export interface SongDatabaseItem {
  difficulty: Difficulty;
  displayLevel: DisplayLevel;
  internalLevel: number;
  internalLevelIsAccurate: boolean;
  artist: string | null;
  jacketKey: string | null;
  version: number;
  title: string;
  type: ChartType;
  record: GameScore | null;
}

const SONGS_DB = RAW_SONGS_DB as SongsJson;
const INTERNAL_DB = RAW_INTERNAL_DB as BestEffortInternalLevelJson;
const META_DB = RAW_META_DB as MetaJson;
const RECORDS_DB = RAW_RECORDS_DB as RecordsJson;

const DIFFICULTIES = [
  "BASIC",
  "ADVANCED",
  "EXPERT",
  "MASTER",
  "Re:MASTER",
] as const;

const internalKey = (record: {
  title: string;
  type: ChartType;
  difficulty: Difficulty;
}) => `${record.title}:${record.type}:${record.difficulty}`;

const metaKey = (meta: { title: string; artist?: string }) =>
  `${meta.title}:${meta.artist}`;

const metaKeyWithoutArtist = (meta: { title: string }) => meta.title;

const recordKey = (record: {
  title: string;
  artist?: string | null;
  type: ChartType;
  difficulty: Difficulty;
}) =>
  `${record.title}:${record.artist || ""}:${record.type}:${record.difficulty}`;

const buildSongDb = () => {
  const { profile, records } = RECORDS_DB;
  const { availableVersions, tracks } = SONGS_DB;
  const latestVersion = availableVersions[availableVersions.length - 1].value;

  const internalMap = new Map<string, BestEffortInternalLevelRecord>();
  const metaMap = new Map<string, MetaItem>();
  const metaWithoutArtistMap = new Map<string, MetaItem>();
  const recordMap = new Map<
    string,
    RecordSummary<TrackRecordInfo, GameScore>
  >();

  for (const record of INTERNAL_DB) {
    internalMap.set(internalKey(record), record);
  }
  for (const meta of META_DB.meta) {
    metaMap.set(metaKey(meta), meta);
    metaWithoutArtistMap.set(metaKeyWithoutArtist(meta), meta);
  }
  for (const record of records) {
    if (record.track.artist) {
      recordMap.set(recordKey(record.track), record);
    } else {
      const artist = metaWithoutArtistMap.get(
        metaKeyWithoutArtist(record.track)
      )?.artist;
      const key = recordKey({ ...record.track, artist });
      recordMap.set(key, record);
    }
  }

  const mergedTracks = tracks.flatMap(({ displayLevel, ...track }) => {
    const meta = track.artist
      ? metaMap.get(metaKey(track))
      : metaWithoutArtistMap.get(metaKeyWithoutArtist(track));
    const mergedTrack = {
      ...track,
      artist: meta?.artist || null,
      jacketKey: meta?.jacketKey || null,
    };

    const levels = displayLevel
      .map((level, i): SongDatabaseItem | null => {
        if (!level) return null;
        const [levelMin, levelMax] = displayLevelRange(level);
        const difficulty = DIFFICULTIES[i];
        const internal = internalMap.get(internalKey({ ...track, difficulty }));
        const record =
          recordMap.get(recordKey({ ...mergedTrack, difficulty }))?.score ||
          null;
        const levelBase = {
          ...mergedTrack,
          record,
          displayLevel: level,
          difficulty,
        };
        if (!internal) {
          return {
            ...levelBase,
            internalLevel: levelMin,
            internalLevelIsAccurate: false,
          };
        }
        const { internalLevel } = internal;
        if (internalLevel[latestVersion]) {
          return {
            ...levelBase,
            internalLevel: internalLevel[latestVersion],
            internalLevelIsAccurate: true,
          };
        }
        const internalBestEffort = Object.entries(internalLevel)
          .filter(([v]) => +v <= latestVersion)
          .sort(([a], [b]) => +b - +a);
        if (internalBestEffort.length) {
          const bestEffortLevel = internalBestEffort[0][1];
          if (levelMin <= bestEffortLevel && bestEffortLevel <= levelMax) {
            return {
              ...levelBase,
              internalLevel: internalBestEffort[0][1],
              internalLevelIsAccurate: false,
            };
          } else {
            return {
              ...levelBase,
              internalLevel: levelMin,
              internalLevelIsAccurate: false,
            };
          }
        } else {
          return {
            ...levelBase,
            internalLevel: levelMin,
            internalLevelIsAccurate: false,
          };
        }
      })
      .filter((x) => x) as SongDatabaseItem[];

    return levels;
  });

  return { profile, tracks: mergedTracks };
};

export const SONG_DATABASE = buildSongDb();
