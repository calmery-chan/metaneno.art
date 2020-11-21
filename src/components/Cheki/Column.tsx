import styled from "@emotion/styled";
import { Media } from "~/styles/media";
import { Spacing } from "~/styles/spacing";

export const ChekiColumn = styled.div<{ margin?: boolean }>`
  margin-top: ${Spacing.m}px;

  ${Media.queries.pc} {
    padding: 0 ${({ margin }) => (margin ? `${Spacing.xl}px` : 0)};
  }

  ${Media.queries.sp} {
    padding: 0 ${({ margin }) => (margin ? `${Spacing.l}px` : 0)};
  }
`;
