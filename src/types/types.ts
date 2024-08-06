export type Combo =
  | null
  | "FULL COMBO"
  | "FULL COMBO+"
  | "ALL PERFECT"
  | "ALL PERFECT+";

export type Sync =
  | null
  | "SYNC PLAY"
  | "FULL SYNC"
  | "FULL SYNC+"
  | "FULL SYNC DX"
  | "FULL SYNC DX+";

export type Difficulty =
  | "BASIC"
  | "ADVANCED"
  | "EXPERT"
  | "MASTER"
  | "Re:MASTER";

export type DisplayLevel =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "7+"
  | "8"
  | "8+"
  | "9"
  | "9+"
  | "10"
  | "10+"
  | "11"
  | "11+"
  | "12"
  | "12+"
  | "13"
  | "13+"
  | "14"
  | "14+"
  | "15"
  | "15+";

export type ChartType = "Standard" | "DX";

export type Rank =
  | "SSS+"
  | "SSS"
  | "SS+"
  | "SS"
  | "S+"
  | "S"
  | "AAA"
  | "AA"
  | "A"
  | "BBB"
  | "BB"
  | "B"
  | "C"
  | "D"
  | "E";

export type DxRank = 7 | 6 | 5.5 | 5 | 4 | 3 | 2 | 1 | 0;

export type TrophyTier = "Normal" | "Bronze" | "Silver" | "Gold" | "Rainbow";

export interface TrackBase {
  title: string;
  type: ChartType;
}

export interface TrackRecent extends TrackBase {
  difficulty: Difficulty;
}

export interface TrackInternalRecord extends TrackBase {
  idx: string;
  artist?: string;
  difficulty: Difficulty;
  displayLevel: DisplayLevel;
}

export interface TrackDbInfo extends TrackBase {
  version: number;
  displayLevel: (DisplayLevel | null)[];
  artist?: string;
}

export interface TrackRecordInfo extends TrackBase {
  difficulty: Difficulty;
  artist?: string;
}

export interface DxScore {
  score: number;
  max: number;
  percentage: number;
}

export interface GameScore {
  clear: boolean;
  achievement: number;
  rank: Rank;
  dxScore: DxScore;
  dxRank: DxRank;
  combo: Combo;
  sync: Sync;
}

export interface GameScoreWithRating extends GameScore {
  rating: number;
  isRatingAccurate: boolean;
}

export interface RecordSummary<T extends TrackBase = TrackBase, S = GameScore> {
  track: T;
  score: S;
}

export interface SongsJson {
  chartCount: number;
  availableVersions: { value: number; name: string }[];
  tracks: TrackDbInfo[];
}

export interface MetaItem {
  title: string;
  artist: string;
  jacketKey: string;
  chartTypeCount: number;
}

export interface MetaJson {
  meta: MetaItem[];
}

export interface SingleVersionInternalRecord {
  title: string;
  type: ChartType;
  difficulty: Difficulty;
  internalLevel: number;
}

export type SingleVersionInternalJson = SingleVersionInternalRecord[];

export interface BestEffortInternalLevelRecord {
  title: string;
  type: ChartType;
  difficulty: Difficulty;
  internalLevel: {
    [version: string]: number;
  };
}

export type BestEffortInternalLevelJson = BestEffortInternalLevelRecord[];

export interface Profile {
  name: string;
  rating: number;
  profileImageSrc: string;
  trophy: {
    tier: TrophyTier;
    title: string;
  };
  courseRank: number;
  classRank: number;
  stars: number;
  playCount?: {
    total: number;
    current: number;
  };
}

export interface RecordsJson {
  profile: Profile;
  records: RecordSummary<TrackRecordInfo, GameScore>[];
}
