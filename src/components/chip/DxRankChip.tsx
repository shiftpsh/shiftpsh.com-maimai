import { ForwardedRef, forwardRef } from "react";
import { DxRank } from "../../types/types";
import { dxRankChipBackground } from "../../utils/dxScore";
import { ChipContainer, ChipText } from "./ChipCommons";

const GRADIENT_67 = "linear-gradient(to bottom, #012bc6, #02398a, #00bae8)";
const GRADIENT_345 = "linear-gradient(to bottom, #c63901, #8a3b02, #ffa72b)";
const GRADIENT_12 = "linear-gradient(to bottom, #199400, #004505, #04e800)";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  rank: DxRank;
}

const DxRankChip = forwardRef(
  ({ rank, ...rest }: Props, ref?: ForwardedRef<HTMLDivElement>) => {
    return (
      <ChipContainer
        ref={ref}
        {...rest}
        showOverlay={rank !== 0}
        style={{
          background: dxRankChipBackground(rank),
          ...rest.style,
        }}
      >
        {rank > 0 && (
          <div>
            <ChipText
              gradient={
                rank >= 6 ? GRADIENT_67 : rank >= 3 ? GRADIENT_345 : GRADIENT_12
              }
            >
              ✦{rank}
            </ChipText>
          </div>
        )}
      </ChipContainer>
    );
  }
);

export default DxRankChip;
