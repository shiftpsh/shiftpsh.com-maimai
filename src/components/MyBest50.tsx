import styled from "@emotion/styled";
import { Space, Typo } from "@solved-ac/ui-react";
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
  align-items: center;
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

const Stats = styled(Typo)`
  flex: 0 0 6em;
  display: flex;
  padding-left: 1em;
  text-align: right;
`;

const MyBest50 = () => {
  const [mode, setMode] = useState<ShowMode>("gallery");

  const latestSum = ratingsLatest.reduce(
    (acc, song) => acc + Math.floor(song.record.rating),
    0
  );

  const oldSum = ratingsOld.reduce(
    (acc, song) => acc + Math.floor(song.record.rating),
    0
  );

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
      <TitleRow>
        <Typo
          variant={mode === "row-compact" ? "h4" : "h2"}
          no-margin={mode === "row-compact"}
        >
          최신곡
        </Typo>
        <div style={{ flex: 1 }} />
        <Stats description small={mode === "row-compact"} tabular>
          <b>Σ</b>
          <div style={{ flex: 1 }} />
          {latestSum}
        </Stats>
        <Stats description small={mode === "row-compact"} tabular>
          <b>μ</b>
          <div style={{ flex: 1 }} />
          {(latestSum / 15).toFixed(1)}
        </Stats>
      </TitleRow>
      {mode === "row-compact" && <Space h={8} />}
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
      {mode === "row-compact" && <Space h={8} />}
      <TitleRow>
        <Typo
          variant={mode === "row-compact" ? "h4" : "h2"}
          no-margin={mode === "row-compact"}
        >
          구곡
        </Typo>
        <div style={{ flex: 1 }} />
        <Stats description small={mode === "row-compact"} tabular>
          <b>Σ</b>
          <div style={{ flex: 1 }} />
          {oldSum}
        </Stats>
        <Stats description small={mode === "row-compact"} tabular>
          <b>μ</b>
          <div style={{ flex: 1 }} />
          {(oldSum / 35).toFixed(1)}
        </Stats>
      </TitleRow>
      {mode === "row-compact" && <Space h={8} />}
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
