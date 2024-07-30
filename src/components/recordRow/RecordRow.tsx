import styled from "@emotion/styled";
import { Typo } from "@solved-ac/ui-react";
import { ellipsis } from "polished";
import { SongDatabaseItemWithRecord } from "../../const/songDatabase";
import { wanpaku } from "../../styles/fonts/wanpaku";
import { difficultyBackgroundColor } from "../../utils/difficulty";
import LevelGradientText from "../LevelGradientText";
import RankChip from "../chip/RankChip";
import SyncChip from "../chip/SyncChip";
import ComboChip from "../chip/ComboChip";

const MUSIC_DX_URL = "https://maimaidx-eng.com/maimai-mobile/img/music_dx.png";
const MUSIC_STD_URL =
  "https://maimaidx-eng.com/maimai-mobile/img/music_standard.png";

const RecordContainer = styled.div`
  border-bottom: ${({ theme }) => theme.styles.border()};
  padding: 8px 0;
  display: grid;
  align-items: center;
  grid-template-columns: 64px 48px 1fr 4em 4em 4em 12em;
  gap: 8px 0;

  @media (max-width: 800px) {
    grid-template-columns: 72px 8px 3em 3em 3em 1fr;
  }
`;

const LevelIndicator = styled.div`
  ${wanpaku}
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  font-size: 120%;

  @media (max-width: 800px) {
    grid-row: 1;
    grid-column: 3;
    height: 100%;
  }
`;

const Jacket = styled.img`
  display: block;
  height: 64px;
  width: 64px;

  @media (max-width: 800px) {
    grid-row: 1 / span 2;
    height: 72px;
    width: 72px;
  }
`;

const Type = styled.img`
  display: block;
  height: 1em;
`;

const TitleContainer = styled.div`
  flex: 1;
  min-width: 0;
  padding: 0 8px;
  display: flex;
  flex-direction: column;

  @media (max-width: 800px) {
    grid-row: 1;
    grid-column: 4 / span 4;
    padding: 0 8px;
  }
`;

const Title = styled.span`
  ${ellipsis()}
  font-weight: 600;
`;

const Artist = styled(Typo)`
  @media (max-width: 800px) {
    display: none;
  }
`;

const AchievementContainer = styled.div`
  font-size: 120%;
  flex: 0 0 12em;
  min-width: 0;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 8px;
  text-align: right;

  @media (max-width: 800px) {
    grid-row: 2;
    grid-column: 6;
    font-size: 100%;
  }
`;

const Rank = styled(RankChip)`
  @media (max-width: 800px) {
    grid-row: 2;
    grid-column: 3;
    font-size: 80%;
  }
`;

const Combo = styled(ComboChip)`
  @media (max-width: 800px) {
    grid-row: 2;
    grid-column: 4;
    font-size: 80%;
  }
`;

const Sync = styled(SyncChip)`
  @media (max-width: 800px) {
    grid-row: 2;
    grid-column: 5;
    font-size: 80%;
  }
`;

const Rating = styled(Typo)`
  font-size: 80%;
  color: ${({ theme }) => theme.color.text.secondary.main};
`;

const AchievementNumber = styled.span`
  ${wanpaku}
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const AchievementFraction = styled.span`
  font-size: 90%;
`;

interface Props {
  song: SongDatabaseItemWithRecord;
}

const RecordSummary = ({ song }: Props) => {
  const { jacketKey, type, difficulty, title, artist, record } = song;
  const { achievement, rank, combo, sync, rating } = record;

  const [achievementWhole, achievementFraction] = (achievement / 10000)
    .toLocaleString(undefined, {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    })
    .split(".");

  return (
    <RecordContainer>
      <Jacket
        src={`https://maimaidx-eng.com/maimai-mobile/img/Music/${jacketKey}.png`}
      />
      <LevelIndicator
        style={{
          background: difficultyBackgroundColor(difficulty),
        }}
      >
        <LevelGradientText
          level={song.internalLevel}
          accurate={song.internalLevelIsAccurate}
          difficulty={difficulty}
        />
      </LevelIndicator>
      <TitleContainer>
        <div>
          <Type src={type === "DX" ? MUSIC_DX_URL : MUSIC_STD_URL} alt={type} />
        </div>
        <Title>{title}</Title>
        <Artist description small ellipsis>
          {artist}
        </Artist>
      </TitleContainer>
      <Rank rank={rank} />
      <Combo combo={combo} />
      <Sync sync={sync} />
      <AchievementContainer>
        <AchievementNumber>
          {achievementWhole}.
          <AchievementFraction>{achievementFraction}%</AchievementFraction>
        </AchievementNumber>
        <Rating tabular>
          {rating.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Rating>
      </AchievementContainer>
    </RecordContainer>
  );
};

export default RecordSummary;
