import styled from "@emotion/styled";
import { Typo } from "@solved-ac/ui-react";
import { IconMusicStar } from "@tabler/icons-react";
import { ellipsis } from "polished";
import { ratingsLatest, ratingsOld } from "../../const/bestRatings";
import { MUSIC_DX_URL, MUSIC_STD_URL } from "../../const/chartType";
import { SONG_DATABASE, SongDatabaseItem } from "../../const/songDatabase";
import { defaultFont } from "../../styles/fonts/default";
import { wanpaku } from "../../styles/fonts/wanpaku";
import { difficultyBackgroundColor } from "../../utils/difficulty";
import { dxScoreClosestNextBorder } from "../../utils/dxScore";
import { rating as ratingFn } from "../../utils/rating";
import { splitTitle } from "../../utils/title";
import ComboChip from "../chip/ComboChip";
import DxRankChip from "../chip/DxRankChip";
import RankChip from "../chip/RankChip";
import SyncChip from "../chip/SyncChip";
import LevelGradientText from "../commons/LevelGradientText";

const { latestVersion } = SONG_DATABASE;

const RecordContainer = styled.div`
  border-bottom: ${({ theme }) => theme.styles.border()};
  padding: 8px 0;
  display: grid;
  align-items: center;
  grid-template-columns: 64px 48px 1fr 4em 4em 4em 12em;
  gap: 8px 0;

  @media (max-width: 800px) {
    grid-template-columns: 72px 8px 4em 4em 4em 1fr;
  }

  @media (max-width: 480px) {
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

const TypeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
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
  @media (max-width: 420px) {
    grid-row: 3;
  }
`;

const Rank = styled(RankChip)`
  @media (max-width: 800px) {
    grid-row: 2;
    grid-column: 3;
    font-size: 80%;
  }
`;

const DxRank = styled(DxRankChip)`
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
  flex: 0 0 5.5em;
  align-items: baseline;
  justify-content: flex-end;
`;

const AchievementFraction = styled.span`
  font-size: 90%;
`;

const AchievementDescription = styled.span`
  font-family: ${defaultFont};
  font-weight: normal;
  font-size: 1rem;
  padding-right: 0.5em;
`;

const RatingPotentialsContainer = styled.div`
  grid-column: 1 / span 7;
`;

const RatingPotentialRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 6em 3em;
  text-align: right;
`;

const RatingPotentialAchievement = styled.span`
  font-feature-settings: "tnum";
`;

const RatingIncrease = styled.span`
  ${wanpaku}
`;

interface Props {
  song: SongDatabaseItem;
  mode?: "rating" | "rating-with-potential" | "dx-percent" | "dx-border";
}

const RecordRow = ({ song, mode = "rating" }: Props) => {
  const { jacketKey, type, difficulty, title, artist, record } = song;
  const {
    achievement = 0,
    rank,
    combo = null,
    sync = null,
    rating = 0,
    dxRank = 0 as const,
    dxScore = null,
  } = record || {};
  const { title: displayTitle, subtitle: displaySubtitle } = splitTitle(title);

  const [achievementWhole, achievementFraction] = ((achievement || 0) / 10000)
    .toLocaleString(undefined, {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    })
    .split(".");

  const [dxWhole, dxFraction] = (dxScore?.percentage || 0)
    .toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .split(".");

  const dxNext = dxScore && dxScoreClosestNextBorder(dxScore);

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

  const nextRankRatings = [97.0e4, 98.0e4, 99.0e4, 99.5e4, 100.0e4, 100.5e4]
    .map((achievement) => {
      const newRating = ratingFn(achievement, song.internalLevel);
      const increaseAmountOld =
        latestIndex !== -1
          ? Math.floor(newRating) - Math.floor(rating)
          : Math.floor(newRating) -
            (ratingsOld.length === 35
              ? Math.floor(ratingsOld[34].record?.rating)
              : 0);
      const increaseAmountLatest =
        latestIndex !== -1
          ? Math.floor(newRating) - Math.floor(rating)
          : Math.floor(newRating) -
            (ratingsLatest.length === 15
              ? Math.floor(ratingsLatest[14].record?.rating)
              : 0);

      return {
        score: achievement,
        rating: newRating,
        increase:
          song.version === latestVersion
            ? increaseAmountLatest
            : increaseAmountOld,
      };
    })
    .filter((x) => x.increase > 0);

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
        <TypeContainer>
          <Type src={type === "DX" ? MUSIC_DX_URL : MUSIC_STD_URL} alt={type} />
          {latestIndex !== -1 && (
            <>
              <Typo warn small>
                <IconMusicStar size="1em" />
              </Typo>
              <Typo warn small>
                <b>NEW #{latestIndex + 1}</b>
              </Typo>
            </>
          )}
          {oldIndex !== -1 && (
            <>
              <Typo error small>
                <IconMusicStar size="1em" />
              </Typo>
              <Typo error small>
                <b>OLD #{oldIndex + 1}</b>
              </Typo>
            </>
          )}
        </TypeContainer>
        <Title>
          {displayTitle}

          {displaySubtitle && <Typo small>{displaySubtitle}</Typo>}
        </Title>
        <Artist description small ellipsis>
          {artist}
        </Artist>
      </TitleContainer>
      {rank ? (
        <>
          {mode.startsWith("dx") ? (
            <DxRank rank={dxRank} />
          ) : (
            <Rank rank={rank} />
          )}
          <Combo combo={combo} />
          <Sync sync={sync} />
          <AchievementContainer>
            <AchievementNumber>
              {(mode === "rating" || mode === "rating-with-potential") && (
                <>
                  {achievementWhole}.
                  <AchievementFraction>
                    {achievementFraction}%
                  </AchievementFraction>
                </>
              )}
              {mode === "dx-percent" && (
                <>
                  {dxWhole}.
                  <AchievementFraction>{dxFraction}%</AchievementFraction>
                </>
              )}
              {mode === "dx-border" && (
                <>
                  <AchievementDescription>
                    <Typo description>✦{dxNext?.nextBorder}</Typo>
                  </AchievementDescription>
                  &minus;
                  {dxNext?.scoreUntilNextBorder}
                </>
              )}
            </AchievementNumber>
            <Rating tabular>
              {(mode === "rating" || mode === "rating-with-potential") && (
                <>
                  {rating.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </>
              )}
              {mode === "dx-percent" && <>{dxScore?.score}</>}
              {mode === "dx-border" && (
                <>
                  {dxWhole}.{dxFraction}%
                </>
              )}
            </Rating>
          </AchievementContainer>
        </>
      ) : null}
      {mode === "rating-with-potential" && (
        <RatingPotentialsContainer>
          {nextRankRatings.slice(0, 4).map((x) => (
            <RatingPotentialRow key={x.score}>
              <RatingPotentialAchievement>
                <Typo small description>
                  {(x.score / 1e4).toLocaleString(undefined, {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })}
                  %
                </Typo>
              </RatingPotentialAchievement>
              <RatingPotentialAchievement>
                <Typo small description>
                  &minus;
                  {((x.score - achievement) / 1e4).toLocaleString(undefined, {
                    minimumFractionDigits: 4,
                    maximumFractionDigits: 4,
                  })}
                  %
                </Typo>
              </RatingPotentialAchievement>
              <RatingIncrease>
                <Typo small>+{x.increase}</Typo>
              </RatingIncrease>
            </RatingPotentialRow>
          ))}
        </RatingPotentialsContainer>
      )}
    </RecordContainer>
  );
};

export default RecordRow;
