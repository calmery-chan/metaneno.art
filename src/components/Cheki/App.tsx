import { styled } from "linaria/react";
import { GradientColors } from "~/styles/colors";
import { Media } from "~/styles/media";
import { Spacing } from "~/styles/spacing";

export const ChekiApp = styled.div<{ margin?: boolean }>`
  background: ${GradientColors.page};
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  position: fixed;
  width: 100%;

  ${Media.queries.pc} {
    padding: 0 ${({ margin }) => (margin ? `${Spacing.xl}px` : 0)};
  }

  ${Media.queries.sp} {
    padding: 0 ${({ margin }) => (margin ? `${Spacing.l}px` : 0)};
  }
`;
