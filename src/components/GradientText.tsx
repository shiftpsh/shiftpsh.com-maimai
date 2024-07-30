import styled from "@emotion/styled";

export const GradientText = styled.span<{
  gradient: string;
}>`
  background-image: ${(props) => props.gradient};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;
