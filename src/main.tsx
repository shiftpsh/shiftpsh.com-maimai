import { Global, ThemeProvider } from "@emotion/react";
import { SolvedGlobalStyles, solvedThemes } from "@solved-ac/ui-react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllRecords from "./components/AllRecords.tsx";
import ErrorNotFound from "./components/ErrorNotFound.tsx";
import Grinding from "./components/Grinding.tsx";
import MyBest50 from "./components/MyBest50.tsx";
import Stamp from "./components/Stamp.tsx";
import RootLayout from "./RootLayout.tsx";
import { defaultFont } from "./styles/fonts/default.ts";

const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        {
          children: [
            { element: <MyBest50 />, path: "/" },
            { element: <AllRecords />, path: "/records" },
            { element: <Grinding />, path: "/grinding" },
            { element: <Stamp />, path: "/stamp" },
            { element: <ErrorNotFound />, path: "*" },
          ],
        },
      ],
    },
  ],
  {
    basename: "/maimai",
  }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={solvedThemes.light}>
      <SolvedGlobalStyles />
      <Global
        styles={{
          html: {
            fontFamily: defaultFont,
          },
          ".tabler-icon": {
            fontSize: "1.2em",
            verticalAlign: "middle",
          },
        }}
      />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
