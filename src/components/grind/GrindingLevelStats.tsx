import styled from "@emotion/styled";
import { List, ListItem, Space, Typo } from "@solved-ac/ui-react";
import { IconCheck } from "@tabler/icons-react";
import { transparentize } from "polished";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { SONG_DATABASE } from "../../const/songDatabase";
import { wanpaku } from "../../styles/fonts/wanpaku";
import { DisplayLevel } from "../../types/types";
import { achievementColor } from "../../utils/achievement";
import { comboSortWeight, indexToCombo } from "../../utils/combo";
import { filterToUrlQuery } from "../../utils/filterAndSort/query";
import { SORT_CRITERIAS } from "../../utils/filterAndSort/sort";
import { displayLevelRange } from "../../utils/level";
import { indexToSync, syncSortWeight } from "../../utils/sync";
import GrindingCost from "./GrindingCost";

const LEVELS = [
  "15",
  "14+",
  "14",
  "13+",
  "13",
  "12+",
  "12",
  "11+",
  "11",
  "10+",
  "10",
] as const;

const ACHIEVEMENT_OBJECTIVES = [
  80.0e4, 97.0e4, 98.0e4, 99.0e4, 99.5e4, 100.0e4, 100.5e4, 100.7e4, 100.8e4,
  100.9e4, 101.0e4,
];

const { tracks } = SONG_DATABASE;

const levelStats = (level: DisplayLevel) => {
  const levelRecords = tracks.filter((x) => x.displayLevel === level);
  const total = levelRecords.length;
  const achievementBuckets = new Map<number, number>();
  const syncBuckets = new Map<number, number>();
  const comboBuckets = new Map<number, number>();

  levelRecords.forEach(({ record }) => {
    if (!record) return;
    const { achievement, sync, combo } = record;
    ACHIEVEMENT_OBJECTIVES.forEach((objective) => {
      if (achievement >= objective) {
        achievementBuckets.set(
          objective,
          (achievementBuckets.get(objective) || 0) + 1
        );
      }
    });
    new Array(syncSortWeight("FULL SYNC DX+") + 1).fill(0).forEach((_, i) => {
      if (syncSortWeight(sync) >= i) {
        syncBuckets.set(i, (syncBuckets.get(i) || 0) + 1);
      }
    });
    new Array(comboSortWeight("ALL PERFECT+") + 1).fill(0).forEach((_, i) => {
      if (comboSortWeight(combo) >= i) {
        comboBuckets.set(i, (comboBuckets.get(i) || 0) + 1);
      }
    });
  });
  const achievement = ACHIEVEMENT_OBJECTIVES.map((objective) => ({
    objective,
    count: achievementBuckets.get(objective) || 0,
  }));
  return {
    level,
    total,
    achievement,
    lastCompleteAchievement: achievement.reduce(
      (acc, { count, objective }) =>
        count === total ? Math.max(objective, acc) : acc,
      0
    ),
    sync: new Array(syncSortWeight("FULL SYNC DX+") + 1)
      .fill(0)
      .map((_, i) => ({
        sync: indexToSync(i),
        count: syncBuckets.get(i) || 0,
      }))
      .filter((_, i) => i > 1),
    combo: new Array(comboSortWeight("ALL PERFECT+") + 1)
      .fill(0)
      .map((_, i) => ({
        combo: indexToCombo(i),
        count: comboBuckets.get(i) || 0,
      }))
      .filter((_, i) => i),
  };
};

const stats = LEVELS.map(levelStats);

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CompleteBadge = styled.div`
  padding: 2px 8px;
  color: white;
  font-size: 80%;
  font-weight: 800;
`;

const LevelContainer = styled.div`
  ${wanpaku}
  font-size: 150%;
`;

const ObjectiveRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5em 1fr 4em 4em;
  gap: 8px;
`;

const ProgressContainer = styled.div`
  background-color: ${({ theme }) => transparentize(0.5, theme.color.border)};
  height: 3px;
  flex: 1;
`;

const Progress = styled.div`
  height: 100%;
`;

const LeftCount = styled(Link)`
  ${wanpaku}
  text-align: right;
`;

const ProgressNumber = styled.span`
  text-align: right;
  font-size: 80%;
`;

const GrindingLevelStats = () => {
  return (
    <>
      <List>
        {stats.map(
          (
            { level, total, achievement, lastCompleteAchievement },
            index,
            arr
          ) => {
            const prevLastCompleteAchievement = arr
              .filter((_, i) => i < index)
              .map((x) => x.lastCompleteAchievement)
              .reduce((acc, x) => Math.max(acc, x), 0);

            return (
              <ListItem key={level}>
                <HeaderRow>
                  <LevelContainer
                    style={{
                      color: lastCompleteAchievement
                        ? achievementColor(lastCompleteAchievement)
                        : "#aaa",
                    }}
                  >
                    {level.replace(/\+$/, "")}
                    {level.endsWith("+") && <sup>+</sup>}
                  </LevelContainer>
                  {lastCompleteAchievement ? (
                    <CompleteBadge
                      style={{
                        backgroundColor: achievementColor(
                          lastCompleteAchievement
                        ),
                      }}
                    >
                      {(lastCompleteAchievement / 1e4).toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        }
                      )}
                      %+
                    </CompleteBadge>
                  ) : undefined}
                  <div style={{ flex: 1 }} />
                  <Typo description>{total.toLocaleString()}개 채보</Typo>
                </HeaderRow>
                <Space h={32} />
                {achievement
                  .filter(
                    ({ objective }) =>
                      objective >=
                      Math.max(
                        lastCompleteAchievement,
                        prevLastCompleteAchievement
                      )
                  )
                  .slice(0, 4 + (lastCompleteAchievement !== 0 ? 1 : 0))
                  .map(({ objective, count }) => (
                    <Fragment key={objective}>
                      <ObjectiveRow key={objective}>
                        <Typo tabular>
                          {(objective / 1e4).toLocaleString(undefined, {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
                          })}
                          %
                        </Typo>
                        <ProgressContainer>
                          <Progress
                            style={{
                              width: `${(count / total) * 100}%`,
                              backgroundColor: achievementColor(objective),
                            }}
                          />
                        </ProgressContainer>
                        <ProgressNumber>
                          <Typo tabular description>
                            {((count / total) * 100).toFixed(1)}%
                          </Typo>
                        </ProgressNumber>
                        <LeftCount
                          to={{
                            pathname: "/records",
                            search: filterToUrlQuery(
                              {
                                level: displayLevelRange(level),
                                achievement: [0, objective - 1],
                              },
                              {
                                sort: SORT_CRITERIAS.find(
                                  (x) => x.name === "스코어"
                                )!,
                                order: "desc",
                              }
                            ),
                          }}
                        >
                          {total === count ? (
                            <>
                              <IconCheck color={achievementColor(objective)} />
                            </>
                          ) : (
                            <>&minus;{(total - count).toLocaleString()}</>
                          )}
                        </LeftCount>
                      </ObjectiveRow>
                      {total !== count && (
                        <>
                          <GrindingCost
                            leftCount={total - count}
                            needsSync={false}
                          />
                        </>
                      )}
                      <Space h={8} />
                    </Fragment>
                  ))}
              </ListItem>
            );
          }
        )}
      </List>
    </>
  );
};

export default GrindingLevelStats;
