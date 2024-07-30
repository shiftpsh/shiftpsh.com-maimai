import { Global, ThemeProvider } from "@emotion/react";
import { SolvedGlobalStyles, solvedThemes } from "@solved-ac/ui-react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { defaultFont } from "./styles/fonts/default.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={solvedThemes.light}>
      <SolvedGlobalStyles />
      <Global
        styles={{
          html: {
            fontSize: "calc(12px + 0.7vmin)",
            fontFamily: defaultFont,
          },
          ".tabler-icon": {
            fontSize: "1.2em",
            verticalAlign: "middle",
          },
        }}
      />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
