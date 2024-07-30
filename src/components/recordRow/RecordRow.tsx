import styled from "@emotion/styled";
import { Typo } from "@solved-ac/ui-react";
import { ellipsis } from "polished";
import { SongDatabaseItemWithRecord } from "../../const/songDatabase";
import { wanpaku } from "../../styles/fonts/wanpaku";
import {
  difficultyBackgroundColor,
  difficultyBorderColor,
} from "../../utils/difficulty";
import { rankChipBackground } from "../../utils/rank";
import LevelGradientText from "../LevelGradientText";

const MUSIC_DX_URL = "https://maimaidx-eng.com/maimai-mobile/img/music_dx.png";
const MUSIC_STD_URL =
  "https://maimaidx-eng.com/maimai-mobile/img/music_standard.png";

const RecordContainer = styled.div`
  border-bottom: ${({ theme }) => theme.styles.border()};
  padding: 8px 0;
  display: grid;
  align-items: center;
  grid-template-columns: 64px 48px 1fr 4em 12em;
  gap: 8px 0;

  @media (max-width: 640px) {
    grid-template-columns: 72px 48px 1em 4em 1fr;
  }
`;

const LevelIndicator = styled.div`
  ${wanpaku}
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  font-size: 120%;

  @media (max-width: 640px) {
    grid-row: 1 / span 2;
    height: 72px;
  }
`;

const Jacket = styled.img`
  display: block;
  height: 64px;
  width: 64px;

  @media (max-width: 640px) {
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

  @media (max-width: 640px) {
    grid-row: 1;
    grid-column: 4 / -1;
    padding: 0;
  }
`;

const Title = styled.span`
  ${ellipsis()}
  font-weight: 600;
`;

const Artist = styled(Typo)`
  @media (max-width: 640px) {
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

  @media (max-width: 640px) {
    grid-row: 2;
    grid-column: 5;
    font-size: 100%;
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

const RankContainer = styled.div`
  flex: 0 0 4em;
  color: black;
  padding: 0.1em 0.4em;
  font-weight: 800;
  text-align: center;

  @media (max-width: 640px) {
    grid-row: 2;
    grid-column: 4;
    font-size: 80%;
  }
`;

interface Props {
  song: SongDatabaseItemWithRecord;
}

const RecordSummary = ({ song }: Props) => {
  const { jacketKey, type, difficulty, title, artist, record } = song;
  const { achievement, rank, rating } = record;

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
      <RankContainer
        style={{
          background: rankChipBackground(rank),
          borderColor: difficultyBorderColor(difficulty),
        }}
      >
        {rank}
      </RankContainer>
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
