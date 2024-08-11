/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const fs = require("fs");

const IN_DIR = "./scripts/bookmarklets";
const OUT_DIR = "./dist/scripts";

const scriptEntryPoints = {};
fs.readdirSync(IN_DIR)
  .filter((f) => f.endsWith(".ts"))
  .forEach(
    (f) =>
      (scriptEntryPoints[path.basename(f, ".ts")] = "./" + path.join(IN_DIR, f))
  );

module.exports = (env) => ({
  mode: env.development ? "development" : "production",
  entry: scriptEntryPoints,
  output: {
    path: `${__dirname}/build`,
    filename: (pathData) => {
      const chunkName = pathData.chunk.name;
      if (scriptEntryPoints[chunkName]) {
        return path.join(OUT_DIR, chunkName + ".js");
      }
      return chunkName + "/main.bundle.js";
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [],
});
