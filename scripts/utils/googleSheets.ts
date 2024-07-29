import { GoogleSpreadsheet } from "google-spreadsheet";
import { ChartType, Difficulty } from "../../src/types/types";
import {
  tryNormalizeTitle,
  tryParseChartType,
  tryParseDifficulty,
} from "./parseGoogleSheetsValues";

const googleSheetCache = new Map<string, GoogleSpreadsheet>();

export const getGoogleSheets = async (id: string) => {
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  if (typeof GOOGLE_API_KEY !== "string") {
    throw new Error("GOOGLE_API_KEY is unspecified.");
  }
  if (googleSheetCache.has(id)) {
    return googleSheetCache.get(id)!;
  }

  const spreadsheet = new GoogleSpreadsheet(id, {
    apiKey: GOOGLE_API_KEY,
  });
  await spreadsheet.loadInfo();
  googleSheetCache.set(id, spreadsheet);
  return spreadsheet;
};

// title, type, difficulty, internalLevel
type DataTuple = readonly [number, number, number, number];

interface RawData {
  title: unknown;
  type: unknown;
  difficulty: unknown;
  internalLevel: unknown;
}

interface InternalTypedData {
  title: string | number | boolean;
  type: string;
  difficulty: string;
  internalLevel: number;
}

const isValidData = (data: RawData): data is InternalTypedData => {
  return (
    (typeof data.title === "string" ||
      typeof data.title === "number" ||
      typeof data.title === "boolean") &&
    typeof data.type === "string" &&
    typeof data.difficulty === "string" &&
    typeof data.internalLevel === "number"
  );
};

interface ProcessedData {
  title: string;
  type: ChartType;
  difficulty: Difficulty;
  internalLevel: number;
}

export interface GetSheetTuplesArgs {
  id: string;
  sheetName: string;
  dataColumnOffset: DataTuple;
}

export const getSheetTuples = async (
  args: GetSheetTuplesArgs
): Promise<ProcessedData[]> => {
  const { id, sheetName, dataColumnOffset } = args;
  const sheet = await getGoogleSheets(id);
  const targetSheet = sheet.sheetsByTitle[sheetName];
  await targetSheet.loadCells();

  const { rowCount, columnCount } = targetSheet;

  const columns = new Array(columnCount)
    .fill(undefined)
    .map((_, i) => i)
    .map((start) => dataColumnOffset.map((offset) => start + offset))
    .filter((x) => x.every((y) => y < columnCount));

  const rawValues = new Array(rowCount)
    .fill(undefined)
    .flatMap((_, i) =>
      columns
        .filter((column) => {
          // If there is something on the left of the cell, it's not a title cell
          const [title] = column;
          if (title === 0) return true;
          return !targetSheet.getCell(i, title - 1).value;
        })
        .map((column) => {
          const [title, type, difficulty, internalLevel] = column.map(
            (offset) => targetSheet.getCell(i, offset).value
          );
          return {
            title,
            type,
            difficulty,
            internalLevel,
          };
        })
    )
    .filter(isValidData)
    .filter(
      ({ title, type }) => (type === "DX" || type === "STD") && title !== "test"
    );

  const values = rawValues.map((data) => ({
    title: tryNormalizeTitle(data.title.toString()),
    type: tryParseChartType(data.type),
    difficulty: tryParseDifficulty(data.difficulty),
    internalLevel: Math.round(data.internalLevel * 10),
  }));

  return values;
};
