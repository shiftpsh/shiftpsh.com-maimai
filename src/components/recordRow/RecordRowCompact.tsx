import styled from "@emotion/styled";
import { Typo } from "@solved-ac/ui-react";
import { ellipsis } from "polished";
import { ratingsLatest, ratingsOld } from "../../const/bestRatings";
import { SongDatabaseItem } from "../../const/songDatabase";
import { wanpaku } from "../../styles/fonts/wanpaku";
import { difficultyBackgroundColor } from "../../utils/difficulty";
import { splitTitle } from "../../utils/title";
import ComboChip from "../chip/ComboChip";
import RankChip from "../chip/RankChip";
import SyncChip from "../chip/SyncChip";

const RecordContainer = styled.div`
  font-size: 80%;
  padding: 0;
  display: grid;
  align-items: center;
  grid-template-columns: 2em 3em 2em 1fr 3em 3em 3em 3em 7em;
  line-height: 1.2;
  &:nth-of-type(even) {
    background: #f4f4f4;
  }
  @media (max-width: 640px) {
    font-size: 60%;
    grid-template-columns: 2em 3em 2em 1fr 3em 3em 7em;
  }
`;

const MyBest = styled.div`
  text-align: center;
`;

const LevelIndicator = styled.div`
  text-align: center;
  font-weight: 800;
  font-feature-settings: "tnum";
  color: white;
`;

const TypeContainer = styled.div`
  text-align: center;
`;

const Title = styled.span`
  ${ellipsis()}
  padding: 0 4px;
  font-weight: 600;
`;

const AchievementContainer = styled.div`
  min-width: 0;
  text-align: right;
`;

const Rank = styled(RankChip)`
  font-size: 80%;
`;

const Combo = styled(ComboChip)`
  font-size: 80%;
  @media (max-width: 640px) {
    display: none;
  }
`;

const Sync = styled(SyncChip)`
  font-size: 80%;
  @media (max-width: 640px) {
    display: none;
  }
`;

const Rating = styled(Typo)`
  text-align: right;
`;

const AchievementNumber = styled.span`
  ${wanpaku}
  text-align: right;
`;

interface Props {
  song: SongDatabaseItem;
}

const RecordRowCompact = ({ song }: Props) => {
  const { type, difficulty, title, record } = song;
  const {
    achievement = 0,
    rank,
    combo = null,
    sync = null,
    rating = 0,
  } = record || {};
  const { title: displayTitle, subtitle: displaySubtitle } = splitTitle(title);

  const achievementDisplay = ((achievement || 0) / 10000).toLocaleString(
    undefined,
    {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }
  );

  const latestIndex = ratingsLatest.findIndex(
    (x) =>
      x.title === song.title &&
      x.difficulty === song.difficulty &&
      x.artist === song.artist &&
      x.type === song.type
  );

  const oldIndex = ratingsOld.findIndex(
    (x) =>
      x.title === song.title &&
      x.difficulty === song.difficulty &&
      x.artist === song.artist &&
      x.type === song.type
  );

  const level = song.internalLevel;
  const internalLevelWhole = Math.floor(level / 10);
  const internalLevelFraction = level % 10;

  return (
    <RecordContainer>
      <MyBest>
        {latestIndex !== -1 && (
          <Typo warn>
            <b>{latestIndex + 1}</b>
          </Typo>
        )}
        {oldIndex !== -1 && (
          <Typo error>
            <b>{oldIndex + 1}</b>
          </Typo>
        )}
      </MyBest>
      <LevelIndicator
        style={{
          background: difficultyBackgroundColor(difficulty),
          color:
            difficulty === "Re:MASTER"
              ? difficultyBackgroundColor("MASTER")
              : undefined,
        }}
      >
        {internalLevelWhole}
        <span
          style={{
            opacity: song.internalLevelIsAccurate ? 1 : 0.4,
          }}
        >
          .{internalLevelFraction}
        </span>
      </LevelIndicator>
      <TypeContainer
        style={{
          background: type === "DX" ? "#f0f0f0" : "#45aeff",
          color: type === "DX" ? "#000" : "#fff",
        }}
      >
        {type === "DX" ? "DX" : "ST"}
      </TypeContainer>
      <Title>
        {displayTitle}
        {displaySubtitle && <Typo small>{displaySubtitle}</Typo>}
      </Title>
      {rank ? (
        <>
          <Rank rank={rank} />
          <Combo combo={combo} />
          <Sync sync={sync} />
          <Rating tabular>{Math.floor(rating)}</Rating>
          <AchievementContainer>
            <AchievementNumber>{achievementDisplay}%</AchievementNumber>
          </AchievementContainer>
        </>
      ) : null}
    </RecordContainer>
  );
};

export default RecordRowCompact;
