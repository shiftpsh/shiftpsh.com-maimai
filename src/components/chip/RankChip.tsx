import { ForwardedRef, forwardRef } from "react";
import { Rank } from "../../types/types";
import { rankChipBackground } from "../../utils/rank";
import { ChipContainer, ChipText, ChipTextSup } from "./ChipCommons";

const GRADIENT = "linear-gradient(to bottom, #012bc6, #02398a, #00bae8)";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  rank: Rank;
}

const RankChip = forwardRef(
  ({ rank, ...rest }: Props, ref?: ForwardedRef<HTMLDivElement>) => {
    const plus = rank.endsWith("+");
    const rankWithoutPlus = plus ? rank.slice(0, -1) : rank;

    return (
      <ChipContainer
        ref={ref}
        {...rest}
        showOverlay
        style={{
          background: rankChipBackground(rank),
          ...rest.style,
        }}
      >
        <div>
          <ChipText gradient={GRADIENT}>{rankWithoutPlus}</ChipText>
          {plus && (
            <ChipTextSup>
              <ChipText gradient={GRADIENT}>+</ChipText>
            </ChipTextSup>
          )}
        </div>
      </ChipContainer>
    );
  }
);

export default RankChip;
