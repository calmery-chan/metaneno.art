import classnames from "classnames";
import { css } from "linaria";
import React from "react";
import { Colors, GradientColors } from "~/styles/colors";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

export const ChekiButton: React.FC<{
  maxWidth?: number;
  onClick?: () => void;
}> = ({ children, maxWidth, onClick }) => (
  <div
    className={classnames(
      Typography.M,
      css`
        color: ${Colors.white};
        display: flex;
        justify-content: center;
        height: ${Spacing.m * 2 + 14}px;
        line-height: 14px;
        width: 100%;
      `
    )}
  >
    <button
      className={classnames(
        "h-full rounded-full w-full",
        css`
          ${Mixin.clickable};

          background: ${GradientColors.pinkToOrange};
          font-weight: bold;
          outline: none !important;
        `
      )}
      onClick={onClick}
      style={{
        maxWidth: maxWidth ? `${maxWidth}px` : "auto",
      }}
    >
      <div
        className={css`
          display: flex;
          margin: 0 auto;
          width: fit-content;
        `}
      >
        {children}
      </div>
    </button>
  </div>
);
