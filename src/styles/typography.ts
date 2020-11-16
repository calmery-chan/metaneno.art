import { css } from "linaria";

/** font-size: 10px / line-height: 14px */
export const XS = css`
  font-family: Roboto, sans-serif;
  font-size: 10px;
  line-height: 14px;
`;

/** font-size: 12px / line-height: 16px */
export const S = css`
  font-family: Roboto, sans-serif;
  font-size: 12px;
  line-height: 16px;
`;

/** font-size: 14px / line-height: 18px */
export const M = css`
  font-family: Roboto, sans-serif;
  font-size: 14px;
  line-height: 18px;
`;

/** font-size: 16px / line-height: 20px */
export const L = css`
  font-family: Roboto, sans-serif;
  font-size: 16px;
  line-height: 20px;
`;

// Exports

export const Typography = { XS, S, M, L };
export const TypographyLineHeight = { XS: 14, S: 16, M: 18, L: 20 };
