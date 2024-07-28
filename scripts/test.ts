import { login } from "./axios";
import { version, versionDetails } from "./api/version";

const SEGA_ID = process.env.SEGA_ID;
const SEGA_PASSWORD = process.env.SEGA_PASSWORD;

if (typeof SEGA_ID !== "string") {
  throw new Error("SEGA_ID is unspecified.");
}
if (typeof SEGA_PASSWORD !== "string") {
  throw new Error("SEGA_PASSWORD is unspecified.");
}

const work = async () => {
  await login(SEGA_ID, SEGA_PASSWORD);

  const versions = await version();
  console.log(versions);

  const details = await versionDetails({
    version: 21,
    difficulty: "MASTER",
  });

  console.log(details);
};

work();
