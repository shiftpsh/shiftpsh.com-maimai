import { SongDatabaseItem } from "../../const/songDatabase";
import { Difficulty } from "../../types/types";
import { Version, versionBackgroundColor, versionKanjiName } from "../version";

// Version implies (BASIC ~ MASTER) and without Re:MASTER
export type VersionPlateFilter =
  | Version
  | ((item: SongDatabaseItem) => boolean);

export type PlateName = "極" | "将" | "神" | "舞舞" | "覇者";

export const filterVersionPlate = (
  item: SongDatabaseItem,
  filter: VersionPlateFilter
) => {
  if (typeof filter === "number") {
    return item.version === filter && item.difficulty !== "Re:MASTER";
  }
  return filter(item);
};

export interface VersionPlateItem {
  prefix: string;
  displayCriteria: string;
  difficultyRangeCriteria?: [Difficulty, Difficulty];
  filter: VersionPlateFilter;
  color: string;
  plateNames?: PlateName[];
}

export const VERSION_PLATES: VersionPlateItem[] = [
  {
    prefix: versionKanjiName(1)!,
    displayCriteria: "maimai/maimai PLUS",
    color: versionBackgroundColor(Version.maimai),
    filter: (x) => {
      if (x.title === "ジングルベル") return false;
      if (x.version !== Version.maimai && x.version !== Version.maimai_plus)
        return false;
      if (x.difficulty === "Re:MASTER") return false;
      return true;
    },
    plateNames: ["極", "神", "舞舞"],
  },
  {
    prefix: versionKanjiName(2)!,
    displayCriteria: "GreeN",
    color: versionBackgroundColor(Version.GreeN),
    filter: Version.GreeN,
  },
  {
    prefix: versionKanjiName(3)!,
    displayCriteria: "GreeN PLUS",
    color: versionBackgroundColor(Version.GreeN_plus),
    filter: Version.GreeN_plus,
  },
  {
    prefix: versionKanjiName(4)!,
    displayCriteria: "ORANGE",
    color: versionBackgroundColor(Version.ORANGE),
    filter: Version.ORANGE,
  },
  {
    prefix: versionKanjiName(5)!,
    displayCriteria: "ORANGE PLUS",
    color: versionBackgroundColor(Version.ORANGE_plus),
    filter: Version.ORANGE_plus,
  },
  {
    prefix: versionKanjiName(6)!,
    displayCriteria: "PiNK",
    color: versionBackgroundColor(Version.PiNK),
    filter: Version.PiNK,
  },
  {
    prefix: versionKanjiName(7)!,
    displayCriteria: "PiNK PLUS",
    color: versionBackgroundColor(Version.PiNK_plus),
    filter: Version.PiNK_plus,
  },
  {
    prefix: versionKanjiName(8)!,
    displayCriteria: "MURASAKi",
    color: versionBackgroundColor(Version.MURASAKi),
    filter: Version.MURASAKi,
  },
  {
    prefix: versionKanjiName(9)!,
    displayCriteria: "MURASAKi PLUS",
    color: versionBackgroundColor(Version.MURASAKi_plus),
    filter: Version.MURASAKi_plus,
  },
  {
    prefix: versionKanjiName(10)!,
    displayCriteria: "MiLK",
    color: versionBackgroundColor(Version.MiLK),
    filter: Version.MiLK,
  },
  {
    prefix: versionKanjiName(11)!,
    displayCriteria: "MiLK PLUS",
    color: versionBackgroundColor(Version.MiLK_plus),
    filter: Version.MiLK_plus,
  },
  {
    prefix: versionKanjiName(12)!,
    displayCriteria: "FiNALE",
    color: versionBackgroundColor(Version.FiNALE),
    filter: Version.FiNALE,
  },
  {
    prefix: versionKanjiName(0)!,
    displayCriteria: "~FiNALE (STD)",
    difficultyRangeCriteria: ["BASIC", "Re:MASTER"],
    color: versionBackgroundColor(Version.FiNALE),
    filter: (x) => {
      if (x.version >= Version.DX) return false;
      if (x.type !== "Standard") return false;
      return true;
    },
    plateNames: ["覇者", "極", "将", "神", "舞舞"],
  },
  {
    prefix: versionKanjiName(13)!,
    displayCriteria: "DX",
    color: versionBackgroundColor(Version.DX),
    filter: Version.DX,
  },
  {
    prefix: versionKanjiName(14)!,
    displayCriteria: "DX PLUS",
    color: versionBackgroundColor(Version.DX_plus),
    filter: Version.DX_plus,
  },
  {
    prefix: versionKanjiName(15)!,
    displayCriteria: "Splash",
    color: versionBackgroundColor(Version.Splash),
    filter: Version.Splash,
  },
  {
    prefix: versionKanjiName(16)!,
    displayCriteria: "Splash PLUS",
    color: versionBackgroundColor(Version.Splash_plus),
    filter: Version.Splash_plus,
  },
  {
    prefix: versionKanjiName(17)!,
    displayCriteria: "UNiVERSE",
    color: versionBackgroundColor(Version.UNiVERSE),
    filter: Version.UNiVERSE,
  },
  {
    prefix: versionKanjiName(18)!,
    displayCriteria: "UNiVERSE PLUS",
    color: versionBackgroundColor(Version.UNiVERSE_plus),
    filter: Version.UNiVERSE_plus,
  },
  {
    prefix: versionKanjiName(19)!,
    displayCriteria: "FESTiVAL",
    color: versionBackgroundColor(Version.FESTiVAL),
    filter: Version.FESTiVAL,
  },
  {
    prefix: versionKanjiName(20)!,
    displayCriteria: "FESTiVAL PLUS",
    color: versionBackgroundColor(Version.FESTiVAL_plus),
    filter: Version.FESTiVAL_plus,
  },
  {
    prefix: versionKanjiName(21)!,
    displayCriteria: "BUDDiES",
    color: versionBackgroundColor(Version.BUDDiES),
    filter: Version.BUDDiES,
  },
];
