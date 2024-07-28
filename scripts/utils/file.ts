import * as fs from "fs";

export const tryLoadFileAsJson = async <T>(path: string): Promise<T | null> => {
  try {
    const data = await fs.promises.readFile(path, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
};
