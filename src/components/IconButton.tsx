import styled from "@emotion/styled";
import { Button } from "@solved-ac/ui-react";

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
