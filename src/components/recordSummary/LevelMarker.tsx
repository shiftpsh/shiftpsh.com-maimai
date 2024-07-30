import styled from "@emotion/styled";
import { darken } from "polished";
import { SongDatabaseItemWithRecord } from "../../const/songDatabase";
import { wanpaku } from "../../styles/fonts/wanpaku";
import {
  difficultyBackgroundColor,
  difficultyBorderColor,
  difficultyLevelBackground,
  difficultyTextGradientDark,
  difficultyTextGradientLight,
} from "../../utils/difficulty";
import { GradientText } from "../GradientText";

const LevelMarkerContainer = styled.div`
  position: relative;
  container-type: size;
  height: 2em;
`;

const DifficultyContainer = styled.div`
  ${wanpaku}
  height: 100%;
  font-size: 50cqh;
  font-weight: 800;
  display: flex;
  align-items: center;
  padding: 0 8px;
`;

const LevelValueContainer = styled.div`
  ${wanpaku}
  position: absolute;
  right: -1px;
  bottom: 0;
  height: 120cqh;
  font-size: 120%;
  padding: 0 0.5em;
  border-top-left-radius: 8px;
  border-left: 1px solid;
  border-top: 1px solid;
  display: flex;
  align-items: center;
`;

const LevelTextAligner = styled.div`
  display: flex;
  align-items: baseline;
`;

const LevelFractionContainer = styled.span`
  position: relative;
  display: inline-block;
  font-size: 70%;
`;

const LevelPlusContainer = styled(GradientText)`
  position: absolute;
  left: 0%;
  top: -40%;
  font-size: 90%;
`;

interface Props {
  song: SongDatabaseItemWithRecord;
}

const LevelMarker = ({ song }: Props) => {
  const { difficulty, internalLevel, internalLevelIsAccurate, record } = song;
  const { rating } = record;

  const internalLevelWhole = Math.floor(internalLevel / 10);
  const internalLevelFraction = internalLevel % 10;
  const isInternalLevelPlus =
    internalLevelWhole >= 7 && internalLevelFraction >= 6;

  return (
    <LevelMarkerContainer>
      <DifficultyContainer
        style={{
          backgroundColor: difficultyBackgroundColor(difficulty),
        }}
      >
        <GradientText gradient={difficultyTextGradientLight(difficulty)}>
          {Math.floor(rating)}
        </GradientText>
        <LevelValueContainer
          style={{
            backgroundImage: difficultyLevelBackground(difficulty),
            borderColor: difficultyBorderColor(difficulty),
          }}
        >
          <LevelTextAligner>
            <GradientText
              gradient={difficultyTextGradientDark(difficulty)}
              style={{
                filter: `drop-shadow(0 0 2px ${darken(
                  0.1,
                  difficultyBackgroundColor(difficulty)
                )})`,
              }}
            >
              {internalLevelWhole}
            </GradientText>
            <LevelFractionContainer>
              <GradientText
                gradient={difficultyTextGradientDark(difficulty)}
                style={{
                  filter: `drop-shadow(0 0 2px ${darken(
                    0.1,
                    difficultyBackgroundColor(difficulty)
                  )})`,
                  opacity: internalLevelIsAccurate ? 1 : 0.3,
                }}
              >
                .{internalLevelFraction}
              </GradientText>
              {isInternalLevelPlus && (
                <LevelPlusContainer
                  gradient={difficultyTextGradientDark(difficulty)}
                  style={{
                    filter: `drop-shadow(0 0 2px ${darken(
                      0.1,
                      difficultyBackgroundColor(difficulty)
                    )})`,
                  }}
                >
                  +
                </LevelPlusContainer>
              )}
            </LevelFractionContainer>
          </LevelTextAligner>
        </LevelValueContainer>
      </DifficultyContainer>
    </LevelMarkerContainer>
  );
};

export default LevelMarker;
