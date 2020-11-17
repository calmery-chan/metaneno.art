import { styled } from "linaria/react";
import React from "react";
import { GradientColors } from "~/styles/colors";

const Container = styled.div`
  color: transparent;
  background: ${GradientColors.pinkToOrange};
  background-clip: text;
  display: inline-block;
`;

export const ChekiGradientText: React.FC<{ children: string }> = ({
  children,
}) => <Container>{children}</Container>;
