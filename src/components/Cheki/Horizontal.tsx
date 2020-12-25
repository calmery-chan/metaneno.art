import { css } from "@emotion/react";
import { Spacing } from "~/styles/spacing";

const container = css`
  width: 100%;
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const items = css`
  display: flex;
  padding: 0 ${Spacing.l}px;
  width: fit-content;
`;

export const ChekiHorizontal: React.FC = ({ children }) => (
  <div css={container}>
    <div css={items}>{children}</div>
  </div>
);
