import styled from "@emotion/styled";
import {
  Cell,
  List,
  ListItem,
  Row,
  Space,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typo,
} from "@solved-ac/ui-react";
import { IconCheck } from "@tabler/icons-react";
import { darken, lighten, transparentize } from "polished";
import { SONG_DATABASE, SongDatabaseItem } from "../../const/songDatabase";
import { wanpaku } from "../../styles/fonts/wanpaku";
import { comboSortWeight } from "../../utils/combo";
import { difficultyBackgroundColor } from "../../utils/difficulty";
import {
  VERSION_PLATES,
  VersionPlateItem,
  filterVersionPlate,
} from "../../utils/grind/plates";
import { syncSortWeight } from "../../utils/sync";
import { Fragment } from "react/jsx-runtime";
import GrindingCost from "./GrindingCost";

type TrackCategory =
  | "BASIC"
  | "ADVANCED"
  | "EXPERT"
  | "MASTER_REMASTER_UNDER_13+"
  | "MASTER_REMASTER_14"
  | "MASTER_REMASTER_14+_15";

const CATEGORIES: TrackCategory[] = [
  "BASIC",
  "ADVANCED",
  "EXPERT",
  "MASTER_REMASTER_UNDER_13+",
  "MASTER_REMASTER_14",
  "MASTER_REMASTER_14+_15",
];

const categoryColor = (category: TrackCategory) => {
  if (category === "BASIC") return difficultyBackgroundColor("BASIC");
  if (category === "ADVANCED") return difficultyBackgroundColor("ADVANCED");
  if (category === "EXPERT") return difficultyBackgroundColor("EXPERT");
  if (category === "MASTER_REMASTER_UNDER_13+")
    return lighten(0.2, difficultyBackgroundColor("MASTER"));
  if (category === "MASTER_REMASTER_14")
    return difficultyBackgroundColor("MASTER");
  if (category === "MASTER_REMASTER_14+_15")
    return darken(0.2, difficultyBackgroundColor("MASTER"));
  return "black";
};

const { tracks } = SONG_DATABASE;

const recordCategory = (record: SongDatabaseItem) => {
  if (record.difficulty === "BASIC") return "BASIC";
  if (record.difficulty === "ADVANCED") return "ADVANCED";
  if (record.difficulty === "EXPERT") return "EXPERT";
  if (record.internalLevel < 140) return "MASTER_REMASTER_UNDER_13+";
  if (record.internalLevel < 146) return "MASTER_REMASTER_14";
  return "MASTER_REMASTER_14+_15";
};

const versionPlateStats = ({ filter }: VersionPlateItem) => {
  const records = tracks.filter((x) => filterVersionPlate(x, filter));
  const total = records.length;

  const totalBuckets = new Map<TrackCategory, number>();
  const clearBuckets = new Map<TrackCategory, number>();
  const fcBuckets = new Map<TrackCategory, number>();
  const apBuckets = new Map<TrackCategory, number>();
  const fdxBuckets = new Map<TrackCategory, number>();
  const sssBuckets = new Map<TrackCategory, number>();

  records.forEach((record) => {
    const category = recordCategory(record);
    totalBuckets.set(category, (totalBuckets.get(category) || 0) + 1);

    const { record: score } = record;
    if (!score) return;

    const clear = score.clear;
    const fc = comboSortWeight(score.combo) >= 1;
    const ap = comboSortWeight(score.combo) >= 3;
    const fdx = syncSortWeight(score.sync) >= 4;
    const sss = score.achievement >= 100.0e4;

    clearBuckets.set(
      category,
      (clearBuckets.get(category) || 0) + (clear ? 1 : 0)
    );
    fcBuckets.set(category, (fcBuckets.get(category) || 0) + (fc ? 1 : 0));
    apBuckets.set(category, (apBuckets.get(category) || 0) + (ap ? 1 : 0));
    fdxBuckets.set(category, (fdxBuckets.get(category) || 0) + (fdx ? 1 : 0));
    sssBuckets.set(category, (sssBuckets.get(category) || 0) + (sss ? 1 : 0));
  });

  return {
    total,
    data: CATEGORIES.map((category) => ({
      category,
      total: totalBuckets.get(category) || 0,
      clear: clearBuckets.get(category) || 0,
      fc: fcBuckets.get(category) || 0,
      ap: apBuckets.get(category) || 0,
      fdx: fdxBuckets.get(category) || 0,
      sss: sssBuckets.get(category) || 0,
    })),
  };
};

const stats = VERSION_PLATES.map((x) => ({
  ...versionPlateStats(x),
  version: x,
}));

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LevelContainer = styled.div`
  ${wanpaku}
  font-size: 150%;
`;

const ProgressContainer = styled.div`
  background-color: ${({ theme }) => transparentize(0.5, theme.color.border)};
  height: 3px;
  flex: 1;
`;

const Progress = styled.div`
  height: 100%;
`;

const ProgressNumber = styled.span`
  text-align: right;
  font-size: 80%;
`;

const StickyCell = styled(Cell)`
  position: sticky;
  left: 0;
  background-color: ${({ theme }) => theme.color.background.page};
  z-index: 1;
`;

const GrindingLevelStats = () => {
  return (
    <>
      <List>
        {stats.map(({ version, total, data }) => {
          const {
            prefix,
            displayCriteria,
            difficultyRangeCriteria = ["BASIC", "MASTER"],
            plateNames = ["将", "極", "神", "舞舞"],
            color,
          } = version;

          const rows =
            typeof plateNames === "string" ? [plateNames] : plateNames;
          const rowsData = rows
            .map((row) => {
              if (row === "覇者") return data.map((x) => x.clear);
              if (row === "将") return data.map((x) => x.sss);
              if (row === "極") return data.map((x) => x.fc);
              if (row === "神") return data.map((x) => x.ap);
              if (row === "舞舞") return data.map((x) => x.fdx);
              return [];
            })
            .map((x, i) => ({
              title: rows[i] === "覇者" ? "覇者" : [prefix, rows[i]].join(""),
              data: x,
            }));
          const totalData = data.map((x) => x.total);

          return (
            <ListItem key={version.prefix}>
              <HeaderRow>
                <LevelContainer style={{ color }}>
                  {typeof plateNames === "string" ? plateNames : prefix}
                </LevelContainer>
                <div style={{ flex: 1 }} />
                <Typo description>{total.toLocaleString()}개 채보</Typo>
              </HeaderRow>
              <Typo description>
                {displayCriteria}/{difficultyRangeCriteria[0]}~
                {difficultyRangeCriteria[1]}
              </Typo>
              <Space h={32} />
              <TableContainer>
                <Table
                  fullWidth
                  padding="dense"
                  style={{ tableLayout: "fixed", minWidth: 800 }}
                >
                  <TableHead>
                    <Row>
                      <StickyCell rowSpan={2} />
                      <Cell rowSpan={2}>BSC</Cell>
                      <Cell rowSpan={2}>ADV</Cell>
                      <Cell rowSpan={2}>EXP</Cell>
                      <Cell colSpan={3}>
                        {difficultyRangeCriteria[1] === "Re:MASTER"
                          ? "MAS/Re:MAS"
                          : "MAS"}
                      </Cell>
                    </Row>
                    <Row>
                      <Cell>
                        ~13<sup>+</sup>
                      </Cell>
                      <Cell>14</Cell>
                      <Cell>
                        14<sup>+</sup>~
                      </Cell>
                    </Row>
                  </TableHead>
                  <TableBody>
                    {rowsData.map((x) => (
                      <Fragment key={x.title}>
                        <Row>
                          <StickyCell rowSpan={2} style={{ paddingLeft: 0 }}>
                            {x.title}{" "}
                            <Typo description>
                              (&minus;
                              {totalData.reduce((a, b) => a + b, 0) -
                                x.data.reduce((a, b) => a + b, 0)}
                              )
                            </Typo>
                            <br />
                            <Typo description small>
                              {x.title === "覇者" && "CLEAR (80%+)"}
                              {x.title.endsWith("将") && "SSS (100%+)"}
                              {x.title.endsWith("極") && "FULL COMBO"}
                              {x.title.endsWith("神") && "ALL PERFECT"}
                              {x.title.endsWith("舞舞") && "FULL SYNC DX"}
                            </Typo>
                          </StickyCell>
                          {CATEGORIES.map((category, i) =>
                            totalData[i] !== 0 ? (
                              <Cell key={category}>
                                {x.data[i] === totalData[i] ? (
                                  <IconCheck color={categoryColor(category)} />
                                ) : (
                                  <>
                                    <Typo no-margin>{x.data[i]}</Typo>
                                    <Typo no-margin description>
                                      {" "}
                                      (&minus;{totalData[i] - x.data[i]})
                                    </Typo>
                                  </>
                                )}
                                <ProgressContainer>
                                  <Progress
                                    style={{
                                      width: `${
                                        (x.data[i] / totalData[i]) * 100
                                      }%`,
                                      backgroundColor: categoryColor(category),
                                    }}
                                  />
                                </ProgressContainer>
                                <ProgressNumber>
                                  {((x.data[i] / totalData[i]) * 100).toFixed(
                                    1
                                  )}
                                  %
                                </ProgressNumber>
                              </Cell>
                            ) : (
                              <Cell key={category} />
                            )
                          )}
                        </Row>
                        <Row>
                          <Cell colSpan={6}>
                            <GrindingCost
                              leftCount={
                                totalData.reduce((a, b) => a + b, 0) -
                                x.data.reduce((a, b) => a + b, 0)
                              }
                              needsSync={x.title.endsWith("舞舞")}
                            />
                          </Cell>
                        </Row>
                      </Fragment>
                    ))}
                    <Row>
                      <StickyCell />
                      {totalData.map((x, i) => (
                        <Cell key={i}>
                          <Typo description={x === 0}>{x}</Typo>
                        </Cell>
                      ))}
                    </Row>
                  </TableBody>
                </Table>
              </TableContainer>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default GrindingLevelStats;
