import styled from "@emotion/styled";
import { TrophyTier } from "../types/types";
import { ellipsis, transparentize } from "polished";

const TrophyBase = styled.div`
  ${ellipsis()}
  padding: 4px;
  width: 100%;
  font-size: 80%;
  text-align: center;
`;

const TrophyNormal = styled(TrophyBase)`
  border-bottom: 1px solid #b8b8b8;
  background-image: linear-gradient(
    to right,
    #f9f9f9,
    ${transparentize(0.5, "#f9f9f9")}
  );
`;

const TrophyBronze = styled(TrophyBase)`
  border-bottom: 1px solid #dd723e;
  background-image: linear-gradient(
    to right,
    #ffcdb5,
    ${transparentize(0.5, "#ffcdb5")}
  );
`;

const TrophySilver = styled(TrophyBase)`
  border-bottom: 1px solid #2336ac;
  background-image: linear-gradient(
    to right,
    #d5e3f6,
    ${transparentize(0.5, "#d5e3f6")}
  );
`;

const TrophyGold = styled(TrophyBase)`
  border-bottom: 1px solid #bb3e07;
  background-image: linear-gradient(
    to right,
    #ffdf4b,
    ${transparentize(0.5, "#ffdf4b")}
  );
`;

const TrophyRainbow = styled(TrophyBase)`
  border-bottom: 1px solid #ff6e53;
  background-image: linear-gradient(
    to right,
    #ffd4c4,
    #fdfd93,
    #ddfdaf,
    #ddfdfd,
    #fde4fd,
    #dff6fd
  );
`;

interface Props {
  trophy: {
    title: string;
    tier: TrophyTier;
  };
}

const Trophy = ({ trophy }: Props) => {
  const { tier, title } = trophy;
  switch (tier) {
    case "Normal":
      return <TrophyNormal>{title}</TrophyNormal>;
    case "Bronze":
      return <TrophyBronze>{title}</TrophyBronze>;
    case "Silver":
      return <TrophySilver>{title}</TrophySilver>;
    case "Gold":
      return <TrophyGold>{title}</TrophyGold>;
    case "Rainbow":
      return <TrophyRainbow>{title}</TrophyRainbow>;
  }
};

export default Trophy;
