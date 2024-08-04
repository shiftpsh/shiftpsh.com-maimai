import styled from "@emotion/styled";
import { Typo } from "@solved-ac/ui-react";
import { IconDots, IconReload } from "@tabler/icons-react";
import { useState } from "react";
import { Difficulty, DisplayLevel } from "../../types/types";
import {
  difficultyBackgroundColor,
  difficultyTextGradientDark,
} from "../../utils/difficulty";
import { Filter } from "../../utils/filterAndSort/types";
import { displayLevelRange } from "../../utils/level";
import { GradientText } from "../commons/GradientText";
import { FilterIconButton } from "../commons/IconButton";

const levelRange = (level: string): [number, number] => {
  if (level.startsWith("~")) {
    const range = displayLevelRange(level.slice(1) as DisplayLevel);
    return [0, range[1]];
  }
  if (level.includes(".")) {
    const internalLevel = Math.round(+level * 10);
    return [internalLevel, internalLevel];
  }

  return displayLevelRange(level as DisplayLevel) as [number, number];
};

const LEVELS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "7+",
  "8",
  "8+",
  "9",
  "9+",
  "10",
  "10+",
  "11",
  "11+",
  "12",
  "12+",
  "13",
  "13.6",
  "13.7",
  "13.8",
  "13.9",
  "14.0",
  "14.1",
  "14.2",
  "14.3",
  "14.4",
  "14.5",
  "14.6",
  "14.7",
  "14.8",
  "14.9",
  "15",
];

const LEVELS_COARSE = ["~11+", "12", "12+", "13", "13+", "14", "14+", "15"];

const LevelsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 8px;

  @media (max-width: 640px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const resolveLevelDifficulty = (level: string): Difficulty => {
  const [, max] = levelRange(level);
  if (max >= 150) return "Re:MASTER";
  if (max >= 130) return "MASTER";
  if (max >= 100) return "EXPERT";
  if (max >= 70) return "ADVANCED";
  return "BASIC";
};

interface Props {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}

const LevelRangeSelect = ({ filter, onFilterChange }: Props) => {
  const [coarse, setCoarse] = useState(true);
  const { level = [0, 155] } = filter;
  const [min, max] = level;

  const handleButtonClick = (level: string) => {
    const range = levelRange(level);

    if (min <= 10 && max >= 155) {
      // Entire range selected, previously
      onFilterChange({ ...filter, level: range });
      return;
    }

    if (min === range[0] && max === range[1]) {
      // Deselect
      onFilterChange({ ...filter, level: [0, 155] });
      return;
    }

    if (max < range[0]) {
      // Selecting a range to the right
      onFilterChange({ ...filter, level: [min, range[1]] });
      return;
    }

    if (min > range[1]) {
      // Selecting a range to the left
      onFilterChange({ ...filter, level: [range[0], max] });
      return;
    }

    // Selecting a range that overlaps
    onFilterChange({ ...filter, level: range });
  };

  return (
    <LevelsRow>
      {(coarse ? LEVELS_COARSE : LEVELS).map((lv) => {
        const inRange = min <= levelRange(lv)[0] && levelRange(lv)[1] <= max;
        const difficulty = resolveLevelDifficulty(lv);
        const [levelWhole, levelDecimal] = lv.split(".");
        const levelRender = levelDecimal ? (
          <>
            {levelWhole}.<Typo small>{levelDecimal}</Typo>
          </>
        ) : (
          lv
        );

        return (
          <FilterIconButton
            key={lv}
            onClick={() => handleButtonClick(lv)}
            style={{
              background: inRange
                ? difficultyBackgroundColor(difficulty)
                : undefined,
            }}
          >
            {inRange ? (
              <GradientText gradient={difficultyTextGradientDark(difficulty)}>
                {levelRender}
              </GradientText>
            ) : (
              levelRender
            )}
          </FilterIconButton>
        );
      })}
      <FilterIconButton
        onClick={() => onFilterChange({ ...filter, level: [0, 155] })}
        transparent
      >
        <IconReload />
      </FilterIconButton>
      <FilterIconButton onClick={() => setCoarse((prev) => !prev)} transparent>
        <IconDots />
      </FilterIconButton>
    </LevelsRow>
  );
};

export default LevelRangeSelect;
