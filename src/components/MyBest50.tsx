import styled from "@emotion/styled";
import {
  SONG_DATABASE,
  SongDatabaseItemWithRecord,
} from "../const/songDatabase";
import { Typo } from "@solved-ac/ui-react";
import RecordSummary from "./recordSummary/RecordSummary";

const { tracks, latestVersion } = SONG_DATABASE;

const ratingsLatest = tracks
  .filter((x) => x.version === latestVersion && x.record)
  .sort((a, b) =>
    b.record!.rating !== a.record!.rating
      ? b.record!.rating - a.record!.rating
      : a.record!.achievement - b.record!.achievement
  )
  .slice(0, 15) as SongDatabaseItemWithRecord[];

const ratingsOld = tracks
  .filter((x) => x.version !== latestVersion && x.record)
  .sort((a, b) =>
    b.record!.rating !== a.record!.rating
      ? b.record!.rating - a.record!.rating
      : a.record!.achievement - b.record!.achievement
  )
  .slice(0, 35) as SongDatabaseItemWithRecord[];

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
  return (
    <>
      <Typo h2>Recents</Typo>
      <MyBestGrid>
        {ratingsLatest.map((song, i) => (
          <RecordSummary key={i} song={song} />
        ))}
      </MyBestGrid>
      <Typo h2>Old</Typo>
      <MyBestGrid>
        {ratingsOld.map((song, i) => (
          <RecordSummary key={i} song={song} />
        ))}
      </MyBestGrid>
    </>
  );
};

export default MyBest50;
