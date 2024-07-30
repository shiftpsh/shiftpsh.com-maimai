import { css } from "@emotion/react";
import { defaultFontArr } from "./default";

export const wanpakuFontArr = ["Wanpaku", ...defaultFontArr];

export const wanpakuFont = wanpakuFontArr
  .map((font) => (/ /.test(font) ? `"${font}"` : font))
  .join(", ");

export const wanpaku = css`
  font-family: ${wanpakuFont};
  font-feature-settings: "ss01";
  font-weight: 800;
`;
