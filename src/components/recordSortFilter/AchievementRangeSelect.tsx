import styled from "@emotion/styled";
import { IconDots, IconReload } from "@tabler/icons-react";
import { useState } from "react";
import { achievementColor } from "../../utils/achievement";
import { Filter } from "../../utils/filterAndSort/types";
import { FilterIconButton } from "../commons/IconButton";

const achievementRange = (ach: string): [number, number] => {
  if (ach === "~AAA") return [0, 97.0e4 - 1];
  if (ach === "S") return [97.0e4, 98.0e4 - 1];
  if (ach === "S+") return [98.0e4, 99.0e4 - 1];
  if (ach === "SS") return [99.0e4, 99.5e4 - 1];
  if (ach === "SS+") return [99.5e4, 100.0e4 - 1];
  if (ach === "SSS") return [100.0e4, 100.5e4 - 1];
  if (ach === "SSS+") return [100.5e4, 101.0e4];
  if (ach === ".5") return [100.5e4, 100.6e4 - 1];
  if (ach === ".6") return [100.6e4, 100.7e4 - 1];
  if (ach === ".7") return [100.7e4, 100.8e4 - 1];
  if (ach === ".8") return [100.8e4, 100.9e4 - 1];
  if (ach === ".9") return [100.9e4, 101.0e4 - 1];
  if (ach === "AP+") return [101.0e4, 101.0e4];
  throw new Error(`Invalid achievement: ${ach}`);
};

const buttonColor = (ach: string): string => {
  if (ach === "~AAA") return achievementColor(94e4);
  if (/^S?\+?$/.test(ach)) return achievementColor(97e4);
  if (/^SS?\+?$/.test(ach)) return achievementColor(99e4);
  if (/^SSS?\+?$/.test(ach)) return achievementColor(100e4);
  if (/^\.[0-9]$/.test(ach)) return achievementColor(100e4);
  if (ach === "AP+") return achievementColor(101e4);
  throw new Error(`Invalid achievement: ${ach}`);
};

const ACHIEVEMENTS = ["~AAA", "S", "S+", "SS", "SS+", "SSS", "SSS+"];

const ACHIEVEMENTS_COARSE = [
  "~AAA",
  "S",
  "S+",
  "SS",
  "SS+",
  "SSS",
  ".5",
  ".6",
  ".7",
  ".8",
  ".9",
  "AP+",
];

const LevelsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  @media (max-width: 640px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

interface Props {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}

const AchievementRangeSelect = ({ filter, onFilterChange }: Props) => {
  const [coarse, setCoarse] = useState(true);
  const { achievement = [0, 101.0e4] } = filter;
  const [min, max] = achievement;

  const handleButtonClick = (ach: string) => {
    const range = achievementRange(ach);

    if (min <= 0 && max >= 100.5e4) {
      // Entire range selected, previously
      onFilterChange({ ...filter, achievement: range });
      return;
    }

    if (min === range[0] && max === range[1]) {
      // Deselect
      onFilterChange({ ...filter, achievement: [0, 101.0e4] });
      return;
    }

    if (max < range[0]) {
      // Selecting a range to the right
      onFilterChange({ ...filter, achievement: [min, range[1]] });
      return;
    }

    if (min > range[1]) {
      // Selecting a range to the left
      onFilterChange({ ...filter, achievement: [range[0], max] });
      return;
    }

    // Selecting a range that overlaps
    onFilterChange({ ...filter, achievement: range });
  };

  return (
    <LevelsRow>
      {(coarse ? ACHIEVEMENTS : ACHIEVEMENTS_COARSE).map((lv) => {
        const inRange =
          min <= achievementRange(lv)[0] && achievementRange(lv)[1] <= max;

        return (
          <FilterIconButton
            key={lv}
            onClick={() => handleButtonClick(lv)}
            style={{
              backgroundColor: inRange ? buttonColor(lv) : undefined,
              color: inRange ? "white" : undefined,
            }}
          >
            {lv}
          </FilterIconButton>
        );
      })}
      <FilterIconButton
        onClick={() => onFilterChange({ ...filter, achievement: [0, 101.0e4] })}
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

export default AchievementRangeSelect;
