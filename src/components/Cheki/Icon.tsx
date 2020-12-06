import { css } from "@emotion/react";
import React from "react";
import { Mixin } from "~/styles/mixin";

export const Icon: React.FC<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
> = (props) => (
  <img
    css={css`
      ${Mixin.clickable};

      cursor: pointer;
      user-select: none;
    `}
    {...props}
  />
);
