import { ForwardedRef, forwardRef } from "react";
import { Sync } from "../../types/types";
import { syncChipBackground } from "../../utils/sync";
import { ChipContainer, ChipText, ChipTextSup } from "./ChipCommons";

const FSD_GRADIENT = "linear-gradient(to bottom, #c63901, #8a3b02, #ffa72b)";
const FS_GRADIENT = "linear-gradient(to bottom, #012bc6, #02398a, #00bae8)";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  sync: Sync;
}

const SyncChip = forwardRef(
  ({ sync, ...rest }: Props, ref?: ForwardedRef<HTMLDivElement>) => {
    const plus = (sync || "").endsWith("+");
    const syncWithoutPlus = sync?.startsWith("FULL SYNC DX")
      ? "FDX"
      : sync?.startsWith("FULL SYNC")
      ? "FS"
      : sync?.startsWith("SYNC")
      ? "SYNC"
      : null;
    const gradient = sync?.startsWith("FULL SYNC DX")
      ? FSD_GRADIENT
      : FS_GRADIENT;

    return (
      <ChipContainer
        ref={ref}
        {...rest}
        showOverlay={sync !== null && sync !== "SYNC PLAY"}
        style={{
          background: syncChipBackground(sync),
          border: sync === "SYNC PLAY" ? "1px solid #2acfff" : undefined,
          ...rest.style,
        }}
      >
        <div
          style={{
            fontSize: sync === "SYNC PLAY" ? "80%" : undefined,
          }}
        >
          <ChipText gradient={gradient}>{syncWithoutPlus}</ChipText>
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

export default SyncChip;
