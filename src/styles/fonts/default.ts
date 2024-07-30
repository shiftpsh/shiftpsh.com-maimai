export const defaultFontArr = [
  "Pretendard JP Variable",
  "Pretendard JP",
  "Pretendard Variable",
  "Pretendard",
  "Inter",
  "Noto Sans JP",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Helvetica",
  "Arial",
  "sans-serif",
  "Apple string Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
];

export const defaultFont = defaultFontArr
  .map((font) => (/ /.test(font) ? `"${font}"` : font))
  .join(", ");
