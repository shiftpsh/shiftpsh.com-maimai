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

export type DxRank = 6 | 5.5 | 5 | 4 | 3 | 2 | 1 | 0;

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
  rank: string;
  dxScore: DxScore;
  dxRank: number;
  combo: Combo;
  sync: Sync;
}

export interface RecordSummary<T extends TrackBase = TrackBase, S = GameScore> {
  track: T;
  score: S;
}
