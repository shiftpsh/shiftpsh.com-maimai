import styled from "@emotion/styled";
import { transparentize } from "polished";
import { Rank } from "../types/types";
import { rankChipBackground } from "../utils/rank";
import { ForwardedRef, forwardRef } from "react";
import { GradientText } from "./GradientText";
import { css } from "@emotion/react";

const overlayWhite = css`
  &:before {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    background: linear-gradient(
      to bottom,
      ${transparentize(0.4, "white")},
      ${transparentize(0.1, "white")} 50%,
      ${transparentize(0.8, "white")} 50%,
      ${transparentize(0.2, "white")}
    );
    z-index: 20;
  }
`;

const RankContainer = styled.div`
  position: relative;
  flex: 0 0 4em;
  color: black;
  padding: 0.1em 0.4em;
  font-weight: 800;
  text-align: center;
  z-index: 10;
  ${overlayWhite}
`;

const RankText = styled(GradientText)`
  position: relative;
  z-index: 30;
  filter: drop-shadow(0 0 1px white);
`;

const Sup = styled.span `
  font-size: 90%;
  line-height: 1;
  vertical-align: 30%;
`;

const GRADIENT = "linear-gradient(to bottom, #012bc6, #02398a, #00bae8)";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  rank: Rank;
}

const RankChip = forwardRef(
  ({ rank, ...rest }: Props, ref?: ForwardedRef<HTMLDivElement>) => {
    const plus = rank.endsWith("+");
    const rankWithoutPlus = plus ? rank.slice(0, -1) : rank;

    return (
      <RankContainer
        ref={ref}
        {...rest}
        style={{
          background: rankChipBackground(rank),
          ...rest.style,
        }}
      >
        <RankText gradient={GRADIENT}>{rankWithoutPlus}</RankText>
        {plus && (
          <Sup>
            <RankText gradient={GRADIENT}>+</RankText>
          </Sup>
        )}
      </RankContainer>
    );
  }
);

export default RankChip;
