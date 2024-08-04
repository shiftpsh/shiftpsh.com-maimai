import styled from "@emotion/styled";
import { darken } from "polished";
import {
  difficultyTextGradientDark,
  difficultyBackgroundColor,
} from "../../utils/difficulty";
import { GradientText } from "./GradientText";
import { Difficulty } from "../../types/types";

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
  difficulty: Difficulty;
  level: number;
  accurate: boolean;
}

const LevelGradientText = ({ level, accurate, difficulty }: Props) => {
  const internalLevelWhole = Math.floor(level / 10);
  const internalLevelFraction = level % 10;
  const isInternalLevelPlus =
    internalLevelWhole >= 7 && internalLevelFraction >= 6;

  return (
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
            opacity: accurate ? 1 : 0.3,
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
  );
};

export default LevelGradientText;
