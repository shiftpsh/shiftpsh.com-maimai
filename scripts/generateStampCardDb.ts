import * as fs from "fs";
import { stampCard } from "./api/stampCard";
import { login } from "./axios";
import "./utils/env";

const OUT_DIR = "./src/db";
const OUT_FILE = "./src/db/stamp.json";

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
  console.log("Fetching records...");

  const data = await stampCard();

  await fs.promises.mkdir(OUT_DIR, { recursive: true });

  await fs.promises.writeFile(OUT_FILE, JSON.stringify(data, null, 2), "utf-8");

  console.log("Database generated successfully.");
};

generate();
