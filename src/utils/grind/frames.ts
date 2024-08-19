import { SongDatabaseItem } from "../../const/songDatabase";
import { Version } from "../version";

export type VersionFrameFilter = Version[];

export const filterVersionFrame = (
  item: SongDatabaseItem,
  filter: VersionFrameFilter
) => {
  return filter.includes(item.version) && item.difficulty !== "Re:MASTER";
};

export interface VersionFrameItem {
  versionName: string;
  jewel: string;
  filter: VersionFrameFilter;
}

export const VERSION_FRAMES: VersionFrameItem[] = [
  {
    versionName: "DX",
    jewel: "Diamond",
    filter: [Version.DX, Version.DX_plus],
  },
  {
    versionName: "Splash",
    jewel: "Emerald",
    filter: [Version.Splash, Version.Splash_plus],
  },
  {
    versionName: "UNiVERSE",
    jewel: "Sapphire",
    filter: [Version.UNiVERSE, Version.UNiVERSE_plus],
  },
  {
    versionName: "FESTiVAL",
    jewel: "Amethyst",
    filter: [Version.FESTiVAL, Version.FESTiVAL_plus],
  },
];
