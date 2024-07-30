import * as fs from "fs";
import {
  BestEffortInternalLevelJson,
  SingleVersionInternalJson,
  SingleVersionInternalRecord,
  SongsJson,
} from "../src/types/types";
import { INTERNALS, InternalFetchData } from "./const/internal";
import "./utils/env";
import { tryLoadFileAsJson } from "./utils/file";
import { getSheetTuples } from "./utils/googleSheets";
import { batchedPromiseAll } from "./utils/promise";
import { suppressTitleWarning } from "./utils/parseGoogleSheetsValues";
import { trackMapKey } from "./utils/songTitle";

const OUT_DIR = ["./src/db", "./public/db"];
const OUT_FILE_SINGLE = (version: number) =>
  `./public/db/internal-v${version}.json`;
const OUT_FLIE_BEST_EFFORT = "./src/db/internal.json";
const MUSIC_DB_FILE = "./src/db/songs.json";

const hasFile = async (path: string) => {
  try {
    await fs.promises.access(path);
    return true;
  } catch {
    return false;
  }
};

const generate = async () => {
  const musicDb = await tryLoadFileAsJson<SongsJson>(MUSIC_DB_FILE);
  const titles = new Set(musicDb?.tracks.map((x) => x.title));

  const versions = Object.keys(INTERNALS).map((x) => +x);
  const lastVersion = versions[versions.length - 1];

  const versionsAlreadyGenerated = await Promise.all(
    versions.map(async (version) => {
      return hasFile(OUT_FILE_SINGLE(version));
    })
  );

  const internalLevels = await batchedPromiseAll(
    versions
      .filter(
        (version, i) => !versionsAlreadyGenerated[i] || version === lastVersion
      )
      .map((version) => async () => {
        console.log(`Fetching internal level data for v${version}...`);
        const fetchData: InternalFetchData = INTERNALS[version];
        const { id, sheets } = fetchData;
        const args = Object.entries(sheets).map(
          ([sheetName, dataColumnOffset]) => {
            return { id, sheetName, dataColumnOffset };
          }
        );
        const fetched = await batchedPromiseAll(
          args.map((arg) => async () => getSheetTuples(arg)),
          {
            batchSize: 1,
          }
        );
        console.log(`Finished fetching internal level data for v${version}.`);
        return {
          version,
          data: fetched.flatMap((x) => x) satisfies SingleVersionInternalJson,
        };
      }),
    {
      batchSize: 1,
      interval: 10000,
    }
  );

  internalLevels.forEach(({ version, data }) => {
    data.forEach(({ title }) => {
      if (!titles.has(title) && !suppressTitleWarning(title)) {
        console.warn(
          `[v${version}] Title "${title}" not found in music database.`
        );
      }
    });
  });

  await Promise.all(
    OUT_DIR.map(async (dir) => {
      await fs.promises.mkdir(dir, { recursive: true });
    })
  );

  await Promise.all(
    internalLevels.map(async ({ version, data }) => {
      const out = OUT_FILE_SINGLE(version);
      await fs.promises.writeFile(out, JSON.stringify(data, null, 2), "utf-8");
    })
  );

  console.log("Database generated successfully.");

  const generated = await Promise.all(
    Object.keys(INTERNALS).map(async (version) => {
      const data = await tryLoadFileAsJson<SingleVersionInternalJson>(
        OUT_FILE_SINGLE(+version)
      );
      return {
        version: +version,
        data,
      };
    })
  );

  // chartKey, version, level
  const bestEffortMap = new Map<string, Map<number, number>>();
  const titleTypeDifficultyMap = new Map<
    string,
    Omit<SingleVersionInternalRecord, "internalLevel">
  >();

  generated.forEach(({ version, data }) => {
    data?.forEach(({ title, type, difficulty, internalLevel }) => {
      const key = `${trackMapKey({ title, type })}:${difficulty}`;
      const map = bestEffortMap.get(key) || new Map<number, number>();
      map.set(version, internalLevel);
      titleTypeDifficultyMap.set(key, { title, type, difficulty });
      bestEffortMap.set(key, map);
    });
  });

  const keys = Array.from(bestEffortMap.keys());

  const bestEffortData = keys.map((key) => {
    const map = bestEffortMap.get(key)!;
    const { title, type, difficulty } = titleTypeDifficultyMap.get(key)!;
    return {
      title,
      type,
      difficulty,
      internalLevel: Array.from(map.entries()).reduce(
        (acc, [version, level]) => {
          acc[version] = level;
          return acc;
        },
        {} as Record<string, number>
      ),
    };
  }) satisfies BestEffortInternalLevelJson;

  await fs.promises.writeFile(
    OUT_FLIE_BEST_EFFORT,
    JSON.stringify(bestEffortData, null, 2),
    "utf-8"
  );
};

generate();
