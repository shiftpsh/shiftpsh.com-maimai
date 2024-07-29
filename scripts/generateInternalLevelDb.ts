import * as fs from "fs";
import { SongsJson } from "../src/types/types";
import { INTERNALS, InternalFetchData } from "./const/internal";
import "./utils/env";
import { tryLoadFileAsJson } from "./utils/file";
import { getSheetTuples } from "./utils/googleSheets";
import { batchedPromiseAll } from "./utils/promise";
import { suppressTitleWarning } from "./utils/parseGoogleSheetsValues";

const OUT_DIR = "./src/db";
const OUT_FILE = (version: number) => `./src/db/internal-v${version}.json`;
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
      return hasFile(OUT_FILE(version));
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
          data: fetched.flatMap((x) => x),
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

  await fs.promises.mkdir(OUT_DIR, { recursive: true });

  await Promise.all(
    internalLevels.map(async ({ version, data }) => {
      const out = OUT_FILE(version);
      await fs.promises.writeFile(out, JSON.stringify(data, null, 2), "utf-8");
    })
  );

  console.log("Database generated successfully.");
};

generate();
