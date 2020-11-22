export const maxWidthMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

export const minWidthMediaQuery = (minWidth: number) =>
  `@media (min-width: ${minWidth}px)`;

// 名前    | 画面幅(x)の範囲    | 想定している環境
// -------|------------------|--------------------------
// xlarge | 1621 <= x        | PC(特にでかい)
// large  | 1232 <= x < 1621 | PC
// medium |  768 <= x < 1232 | タブレット
// small  |  351 <= x <  768 | スマートフォン
// xsmall |         x <  351 | iPhoneSEなど幅の狭いデバイス

export const breakPoints = {
  xlargeLarge: 1620,
  largeMedium: 1231,
  mediumSmall: 767,
  smallXsmall: 350,
};

export const media = {
  xlargeUp: minWidthMediaQuery(breakPoints.xlargeLarge + 1),
  largeUp: minWidthMediaQuery(breakPoints.largeMedium + 1),
  mediumUp: minWidthMediaQuery(breakPoints.mediumSmall + 1),
  smallUp: minWidthMediaQuery(breakPoints.smallXsmall + 1),
  largeDown: maxWidthMediaQuery(breakPoints.xlargeLarge),
  mediumDown: maxWidthMediaQuery(breakPoints.largeMedium),
  smallDown: maxWidthMediaQuery(breakPoints.mediumSmall),
  xsmallDown: maxWidthMediaQuery(breakPoints.smallXsmall),
};

export enum colors {
  yume = "#223963",
  choco = "#55291e",
}
