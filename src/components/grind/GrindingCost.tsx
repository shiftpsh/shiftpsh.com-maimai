import styled from "@emotion/styled";
import { IconUsers, IconUser, IconClock } from "@tabler/icons-react";

const CostRow = styled.div`
  max-width: 480px;
  display: grid;
  grid-template-columns: 7em 7em 4em;
  justify-content: space-between;
  color: ${({ theme }) => theme.color.text.secondary.main};
  font-size: 80%;
  font-feature-settings: "tnum";
`;

const CostItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface Props {
  leftCount: number;
  needsSync: boolean;
}

const GrindingCost = ({ leftCount, needsSync }: Props) => {
  const creditsSync = Math.ceil(leftCount / 4);
  const creditsSingle = Math.ceil(leftCount / 3);
  const timeMinutes = Math.round((leftCount / 4) * 15);

  const timeDisplay =
    timeMinutes < 60 ? `${timeMinutes}m` : `${(timeMinutes / 60).toFixed(1)}h`;

  return (
    <CostRow>
      <CostItem>
        <IconUsers size="1em" />₩ {(creditsSync * 1000).toLocaleString()}
      </CostItem>
      <CostItem>
        <IconUser size="1em" />₩{" "}
        {needsSync ? "-" : (creditsSingle * 1000).toLocaleString()}
      </CostItem>
      <CostItem>
        <IconClock size="1em" /> {timeDisplay}
      </CostItem>
    </CostRow>
  );
};

export default GrindingCost;
