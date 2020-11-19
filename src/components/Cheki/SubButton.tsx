import { css } from "@emotion/react";
import React from "react";
import { Colors, GradientColors } from "~/styles/colors";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

export const ChekiSubButton: React.FC<{
  disabled?: boolean;
  onClick?: () => void;
}> = ({ children, disabled, onClick }) => (
  <div
    css={css`
      ${Typography.M};
      color: ${Colors.white};
      display: flex;
      justify-content: center;
      height: ${Spacing.m * 2 + 14}px;
      line-height: 14px;
      width: 100%;
    `}
  >
    <button
      className="h-full rounded-full w-full"
      css={css`
        background: ${GradientColors.pinkToOrange};
        box-sizing: border-box;
        cursor: not-allowed;
        font-weight: bold;
        opacity: 0.48;
        outline: none !important;
        padding: ${Spacing.xs / 2}px;

        ${!disabled &&
        css`
          ${Mixin.clickable};
          opacity: 1;
          cursor: pointer;
        `}
      `}
      onClick={disabled ? undefined : onClick}
      style={{
        maxWidth: "512px",
      }}
    >
      <div className="bg-white h-full rounded-full w-full">
        <div
          className="flex h-full items-center justify-center rounded-full w-full"
          css={css`
            background: ${GradientColors.pinkToOrange};
            background-clip: text;
            color: transparent;
          `}
        >
          {children}
        </div>
      </div>
    </button>
  </div>
);
