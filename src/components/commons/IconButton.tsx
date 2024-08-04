import styled from "@emotion/styled";
import { Button } from "@solved-ac/ui-react";
import { PropsWithChildren } from "react";

export const IconButton = styled(Button)`
  width: 48px;
  height: 48px;
  border-radius: 96px;
  color: ${({ theme }) => theme.color.text.secondary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

export const FilterIconButton = styled(IconButton)<PropsWithChildren>`
  @media (max-width: 960px) {
    height: 32px;
    width: 32px;
    font-size: ${({ children }) =>
      typeof children !== "string" || children.length > 1 ? "80%" : "100%"};
    font-weight: 500;
  }
`;
