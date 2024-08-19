import styled from "@emotion/styled";
import { Space, Typo } from "@solved-ac/ui-react";
import GrindingLevelStats from "./grind/GrindingLevelStats";
import { useSearchParams } from "react-router-dom";
import GrindingPlateStats from "./grind/GrindingPlateStats";
import ErrorNotFound from "./ErrorNotFound";

const CRITERIAS = [
  {
    key: "level",
    label: "레벨",
  },
  {
    key: "plates",
    label: "플레이트",
  },
];

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Grinding = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const criteria = searchParams.get("criteria") || "level";

  return (
    <>
      <HeaderRow>
        <Typo h1 no-margin>
          순회 현황
        </Typo>
        <Space w={16} />
        {CRITERIAS.map(({ key, label }) => (
          <Typo
            key={key}
            as="a"
            href="#"
            style={{
              textDecoration: "none",
              borderBottom: "1px solid",
              borderBottomColor: criteria === key ? "black" : "transparent",
            }}
            description={criteria !== key}
            onClick={() => {
              setSearchParams({ criteria: key });
            }}
          >
            {criteria === key ? <b>{label}</b> : label}
          </Typo>
        ))}
      </HeaderRow>
      {criteria === "level" ? (
        <GrindingLevelStats />
      ) : criteria === "plates" ? (
        <GrindingPlateStats />
      ) : (
        <ErrorNotFound />
      )}
    </>
  );
};

export default Grinding;
