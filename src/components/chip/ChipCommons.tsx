/* eslint-disable react-refresh/only-export-components */
import { css } from "@emotion/react";
import { transparentize } from "polished";
import { GradientText } from "../commons/GradientText";
import styled from "@emotion/styled";

export const chipOverlayWhite = css`
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

interface ChipContainerProps {
  showOverlay?: boolean;
}

export const ChipContainer = styled.div<ChipContainerProps>`
  position: relative;
  flex: 0 0 4em;
  color: black;
  padding: 0 0.4em;
  height: 1.6em;
  font-weight: 800;
  text-align: center;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ showOverlay }) => showOverlay && chipOverlayWhite}
`;

export const ChipText = styled(GradientText)`
  position: relative;
  z-index: 30;
  filter: drop-shadow(0 0 1px white);
`;

export const ChipTextSup = styled.span`
  font-size: 90%;
  line-height: 1;
  vertical-align: 30%;
`;
