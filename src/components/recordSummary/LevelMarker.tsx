import styled from "@emotion/styled";
import { SongDatabaseItemWithRecord } from "../../const/songDatabase";
import { wanpaku } from "../../styles/fonts/wanpaku";
import {
  difficultyBackgroundColor,
  difficultyBorderColor,
  difficultyLevelBackground,
  difficultyTextGradientLight,
} from "../../utils/difficulty";
import { GradientText } from "../commons/GradientText";
import LevelGradientText from "../commons/LevelGradientText";

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

interface Props {
  song: SongDatabaseItemWithRecord;
}

const LevelMarker = ({ song }: Props) => {
  const { difficulty, internalLevel, internalLevelIsAccurate, record } = song;
  const { rating } = record;

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
          <LevelGradientText
            level={internalLevel}
            accurate={internalLevelIsAccurate}
            difficulty={difficulty}
          />
        </LevelValueContainer>
      </DifficultyContainer>
    </LevelMarkerContainer>
  );
};

export default LevelMarker;
