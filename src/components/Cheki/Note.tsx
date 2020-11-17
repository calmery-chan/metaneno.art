import classnames from "classnames";
import { css } from "linaria";
import React from "react";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

export const ChekiNote: React.FC = ({ children }) => (
  <div
    className={classnames(
      "font-bold text-center",
      Typography.XS,
      css`
        color: #787878;
        margin-bottom: ${Spacing.s}px;
      `
    )}
  >
    {children}
  </div>
);
