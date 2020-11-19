import { css } from "@emotion/react";
import React from "react";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

export const ChekiNote: React.FC = ({ children }) => (
  <div
    className="font-bold text-center"
    css={css`
      ${Typography.XS};
      color: #787878;
      margin-bottom: ${Spacing.s}px;
    `}
  >
    {children}
  </div>
);
