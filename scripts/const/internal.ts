// Powered by https://x.com/maiLv_Chihooooo

import { GetSheetTuplesArgs } from "../utils/googleSheets";

const A = 0;
const B = 1;
const C = 2;
const D = 3;
const E = 4;
const F = 5;

const ABCD = [A, B, C, D] as const;
const ABCE = [A, B, C, E] as const;
const ACDF = [A, C, D, F] as const;

export interface InternalFetchData {
  id: string;
  sheets: { [sheetName: string]: GetSheetTuplesArgs["dataColumnOffset"] };
}

// Splash
export const INTERNAL_V15: InternalFetchData = {
  id: "1BW9NNBjidREtV-TKMNzrgVzNFunUgPkC3qC2SJ5EQYk",
  sheets: {
    "Splash新曲枠[新曲枠対象はここのみ]": ABCE,
    旧曲Lv14以上: ABCE,
    "旧曲Lv13+": ABCE,
    旧曲Lv13: ABCE,
    "旧曲Lv12+": ABCE,
    旧曲Lv12: ABCE,
    "旧曲Lv11+": ABCE,
  },
};

// Splash PLUS
export const INTERNAL_V16: InternalFetchData = {
  id: "1SxyjAtEMtFKyJLfgujrdrhJBn2Wssh43YK_DsSD0neE",
  sheets: {
    SplashPLUS新曲枠: ABCE,
    S14以上: ABCD,
    "S13+": ABCD,
    S13: ABCD,
    "S12+": ABCD,
  },
};

// UNiVERSE
export const INTERNAL_V17: InternalFetchData = {
  id: "1nfHYkW0Td6Ar5ARRWp2MMHKuWyGeK9ezP38TBosqjpo",
  sheets: {
    UNiVERSE新曲枠: ABCE,
    "14以上": ACDF,
    "13+": ACDF,
    "13": ACDF,
    "12+": ABCE,
    "12": ABCE,
  },
};

// UNiVERSE PLUS
export const INTERNAL_V18: InternalFetchData = {
  id: "1byBSBQE547KL2KzPkUjY45svcIrJeHh57h-DLJycQbs",
  sheets: {
    UNiVERSEPLUS新曲枠: ABCE,
    "14以上": ACDF,
    "13+": ACDF,
    "13": ACDF,
    "12+": ABCE,
    "12": ABCE,
  },
};

// FESTiVAL
export const INTERNAL_V19: InternalFetchData = {
  id: "1xbDMo-36bGL_d435Oy8TTVq4ADFmxl9sYFqhTXiJYRg",
  sheets: {
    FESTiVAL新曲: ABCE,
    "14以上": ACDF,
    "13+": ACDF,
    "13": ACDF,
    "12+": ABCE,
    "12": ABCE,
  },
};

// FESTiVAL PLUS
export const INTERNAL_V20: InternalFetchData = {
  id: "1xqXfzfDfxiEE9mREwgX_ITIY8AowRM7w-TH2t1I_RJE",
  sheets: {
    "FESTiVAL+新曲": ABCE,
    "14以上": ACDF,
    "13+": ACDF,
    "13": ACDF,
    "12+": ABCE,
    "12": ABCE,
  },
};

// BUDDiES
export const INTERNAL_V21: InternalFetchData = {
  id: "1vSqx2ghJKjWwCLrDEyZTUMSy5wkq_gY4i0GrJgSreQc",
  sheets: {
    BUDDiES新曲: ABCE,
    "14以上": ACDF,
    "13+": ACDF,
    "13": ACDF,
    "12+": ABCE,
    "12": ABCE,
  },
};

// BUDDiES PLUS
export const INTERNAL_V22: InternalFetchData = {
  id: "1d1AjO92Hj-iay10MsqdR_5TswEaikzC988aEOtFyybo",
  sheets: {
    "BUDDiES+新曲": ABCE,
    "14以上": ACDF,
    "13+": ACDF,
    "13": ACDF,
    "12+": ABCE,
    "12": ABCE,
  },
};

export const INTERNALS = {
  15: INTERNAL_V15,
  16: INTERNAL_V16,
  17: INTERNAL_V17,
  18: INTERNAL_V18,
  19: INTERNAL_V19,
  20: INTERNAL_V20,
  21: INTERNAL_V21,
  22: INTERNAL_V22,
};
