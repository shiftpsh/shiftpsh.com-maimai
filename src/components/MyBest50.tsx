import styled from "@emotion/styled";
import { Typo } from "@solved-ac/ui-react";
import { IconLayoutGrid, IconLayoutList } from "@tabler/icons-react";
import { useState } from "react";
import { ratingsLatest, ratingsOld } from "../const/bestRatings";
import { IconButton } from "./IconButton";
import RecordRow from "./recordRow/RecordRow";
import RecordSummary from "./recordSummary/RecordSummary";

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
  const [showAsRow, setShowAsRow] = useState(false);

  return (
    <>
      <TitleRow>
        <Typo h1 no-margin>
          레이팅 대상곡
        </Typo>
        <div style={{ flex: 1 }} />
        <IconButton circle transparent onClick={() => setShowAsRow(false)}>
          <IconLayoutGrid />
        </IconButton>
        <IconButton circle transparent onClick={() => setShowAsRow(true)}>
          <IconLayoutList />
        </IconButton>
      </TitleRow>
      <Typo h2>최신곡</Typo>
      {showAsRow ? (
        ratingsLatest.map((song, i) => <RecordRow key={i} song={song} />)
      ) : (
        <MyBestGrid>
          {ratingsLatest.map((song, i) => (
            <RecordSummary key={i} song={song} />
          ))}
        </MyBestGrid>
      )}
      <Typo h2>구곡</Typo>
      {showAsRow ? (
        ratingsOld.map((song, i) => <RecordRow key={i} song={song} />)
      ) : (
        <MyBestGrid>
          {ratingsOld.map((song, i) => (
            <RecordSummary key={i} song={song} />
          ))}
        </MyBestGrid>
      )}
    </>
  );
};

export default MyBest50;
