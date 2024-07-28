import "./utils/env";
import * as fs from "fs";
import { MetaJson, SongsJson } from "../src/types/types";
import { musicDetail } from "./api/musicDetail";
import { songScores } from "./api/songScore";
import { login } from "./axios";
import { tryLoadFileAsJson } from "./utils/file";
import { batchedPromiseAll } from "./utils/promise";

const OUT_DIR = "./src/db";
const OUT_FILE = "./src/db/meta.json";
const MUSIC_DB_FILE = "./src/db/songs.json";

const SEGA_ID = process.env.SEGA_ID;
const SEGA_PASSWORD = process.env.SEGA_PASSWORD;

if (typeof SEGA_ID !== "string") {
  throw new Error("SEGA_ID is unspecified.");
}
if (typeof SEGA_PASSWORD !== "string") {
  throw new Error("SEGA_PASSWORD is unspecified.");
}

const generate = async () => {
  await login(SEGA_ID, SEGA_PASSWORD);

  const [musicDb, oldDb] = await Promise.all([
    tryLoadFileAsJson<SongsJson>(MUSIC_DB_FILE),
    tryLoadFileAsJson<MetaJson>(OUT_FILE),
  ]);
  if (!musicDb) {
    console.error("No existing music database found.");
    console.error("Please run `yarn generate:music-db` first.");
  }

  const charts = await songScores({ difficulty: "BASIC" });

  const chartTitlesInOldDbCounts = new Map<string, number>();
  if (oldDb) {
    oldDb.meta.forEach((chart) => {
      chartTitlesInOldDbCounts.set(
        chart.title,
        (chartTitlesInOldDbCounts.get(chart.title) || 0) + chart.chartTypeCount
      );
    });
  }

  const chartTitlesInFetchedCounts = new Map<string, number>();
  charts.forEach(({ track }) => {
    chartTitlesInFetchedCounts.set(
      track.title,
      (chartTitlesInFetchedCounts.get(track.title) || 0) + 1
    );
  });

  const newCharts = charts.filter(
    ({ track }) =>
      chartTitlesInOldDbCounts.get(track.title) !==
      chartTitlesInFetchedCounts.get(track.title)
  );

  if (!newCharts.length) {
    console.log("No new charts found, skipping database generation.");
    return;
  }
  console.log(`Found ${newCharts.length} new charts.`);

  // ALL titles which needs invalidation -
  // these titles should not use cached data
  const newChartTitles = new Set(newCharts.map(({ track }) => track.title));

  const dataMap = new Map<string, MetaJson["meta"][0]>();
  oldDb?.meta.forEach((chart) => {
    if (newChartTitles.has(chart.title)) {
      return;
    }
    dataMap.set(`${chart.title}:${chart.artist}`, chart);
  });

  const newChartMeta = await batchedPromiseAll(
    newCharts.map(
      ({ track }) =>
        async () =>
          musicDetail({ idx: track.idx })
    )
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  newChartMeta.forEach(({ type, ...meta }) => {
    const key = `${meta.title}:${meta.artist}`;
    const originalMeta = dataMap.get(key);
    if (!originalMeta) {
      dataMap.set(key, { ...meta, chartTypeCount: 1 });
      return;
    }
    dataMap.set(key, {
      ...originalMeta,
      chartTypeCount: originalMeta.chartTypeCount + 1,
    });
  });

  const data: MetaJson = {
    meta: Array.from(dataMap.values()).sort((a, b) =>
      a.title.localeCompare(b.title)
    ),
  };

  await fs.promises.mkdir(OUT_DIR, { recursive: true });

  await fs.promises.writeFile(OUT_FILE, JSON.stringify(data, null, 2), "utf-8");

  console.log("Database generated successfully.");
};

generate();
