import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { Colors, GradientColors } from "~/styles/colors";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

const Container = styled.div<Pick<ChekiSubButtonProps, "disabled">>`
  ${Typography.M};

  background: ${GradientColors.pinkToOrange};
  border-radius: 50vh;
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 512px;
  padding: 2px;
  text-align: center;
  width: 100%;
  opacity: 0.48;
  cursor: not-allowed;

  ${({ disabled }) =>
    !disabled &&
    css`
      ${Mixin.clickable};
      opacity: 1;
      cursor: pointer;
    `};
`;

const Body = styled.div`
  background: ${Colors.white};
  border-radius: 50vh;
  position: relative;
`;

const Text = styled.div`
  -webkit-background-clip: text;
  background-image: ${GradientColors.pinkToOrange};
  background-clip: text;
  color: transparent;
  overflow: hidden;
  padding: ${Spacing.m - 2}px ${Spacing.l - 2}px;
  line-height: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

type ChekiSubButtonProps = {
  disabled?: boolean;
  onClick?: () => void;
};

export const ChekiSubButton: React.FC<ChekiSubButtonProps> = ({
  children,
  disabled = false,
  onClick,
}) => (
  <Container disabled={disabled}>
    <Body onClick={disabled ? undefined : onClick}>
      <Text className="font-bold">{children}</Text>
    </Body>
  </Container>
);
