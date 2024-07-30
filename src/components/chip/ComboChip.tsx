import { ForwardedRef, forwardRef } from "react";
import { Combo } from "../../types/types";
import { comboChipBackground } from "../../utils/combo";
import { ChipContainer, ChipText, ChipTextSup } from "./ChipCommons";

const AP_GRADIENT = "linear-gradient(to bottom, #c63901, #8a3b02, #ffa72b)";
const FC_GRADIENT = "linear-gradient(to bottom, #199400, #004505, #04e800)";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  combo: Combo;
}

const ComboChip = forwardRef(
  ({ combo, ...rest }: Props, ref?: ForwardedRef<HTMLDivElement>) => {
    const plus = (combo || "").endsWith("+");
    const comboWithoutPlus = plus ? (combo || "").slice(0, -1) : combo;
    const comboShort = (comboWithoutPlus || "")
      .split(" ")
      .map((x) => x[0])
      .join("");
    const gradient = combo?.startsWith("ALL PERFECT")
      ? AP_GRADIENT
      : FC_GRADIENT;

    return (
      <ChipContainer
        ref={ref}
        {...rest}
        showOverlay={combo !== null}
        style={{
          background: comboChipBackground(combo),
          ...rest.style,
        }}
      >
        <div>
          <ChipText gradient={gradient}>{comboShort}</ChipText>
          {plus && (
            <ChipTextSup>
              <ChipText gradient={gradient}>+</ChipText>
            </ChipTextSup>
          )}
        </div>
      </ChipContainer>
    );
  }
);

export default ComboChip;
