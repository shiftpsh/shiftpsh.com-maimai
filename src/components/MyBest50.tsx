import styled from "@emotion/styled";
import { Typo } from "@solved-ac/ui-react";
import { IconLayoutGrid, IconLayoutList, IconList } from "@tabler/icons-react";
import { useState } from "react";
import { ratingsLatest, ratingsOld } from "../const/bestRatings";
import { IconButton } from "./commons/IconButton";
import RecordRow from "./recordRow/RecordRow";
import RecordRowCompact from "./recordRow/RecordRowCompact";
import RecordSummary from "./recordSummary/RecordSummary";

type ShowMode = "gallery" | "row" | "row-compact";

const TitleRow = styled.div`
  display: flex;
`;

const MyBestGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const MyBest50 = () => {
  const [mode, setMode] = useState<ShowMode>("gallery");

  return (
    <>
      <TitleRow>
        <Typo h1 no-margin>
          레이팅 대상곡
        </Typo>
        <div style={{ flex: 1 }} />
        <IconButton circle transparent onClick={() => setMode("gallery")}>
          <IconLayoutGrid />
        </IconButton>
        <IconButton circle transparent onClick={() => setMode("row")}>
          <IconLayoutList />
        </IconButton>
        <IconButton circle transparent onClick={() => setMode("row-compact")}>
          <IconList />
        </IconButton>
      </TitleRow>
      <Typo h2>최신곡</Typo>
      {mode === "gallery" && (
        <>
          <MyBestGrid>
            {ratingsLatest.map((song, i) => (
              <RecordSummary key={i} song={song} />
            ))}
          </MyBestGrid>
        </>
      )}
      {mode === "row" &&
        ratingsLatest.map((song, i) => <RecordRow key={i} song={song} />)}
      {mode === "row-compact" &&
        ratingsLatest.map((song, i) => (
          <RecordRowCompact key={i} song={song} />
        ))}
      <Typo h2>구곡</Typo>
      {mode === "gallery" && (
        <>
          <MyBestGrid>
            {ratingsOld.map((song, i) => (
              <RecordSummary key={i} song={song} />
            ))}
          </MyBestGrid>
        </>
      )}
      {mode === "row" &&
        ratingsOld.map((song, i) => <RecordRow key={i} song={song} />)}
      {mode === "row-compact" &&
        ratingsOld.map((song, i) => <RecordRowCompact key={i} song={song} />)}
    </>
  );
};

export default MyBest50;
