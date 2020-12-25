import { State } from "../";

export const displayableHeight = ({ cheki }: State) =>
  cheki.layout.displayable.height;
export const displayableWidth = ({ cheki }: State) =>
  cheki.layout.displayable.width;
export const displayableX = ({ cheki }: State) => cheki.layout.displayable.x;
export const displayableY = ({ cheki }: State) => cheki.layout.displayable.y;

export const frame = ({ cheki }: State) => cheki.frame.index;
export const frameHeight = ({ cheki }: State) => cheki.layout.frame.height;
export const frameWidth = ({ cheki }: State) => cheki.layout.frame.width;
export const frameViewBoxHeight = ({ cheki }: State) =>
  cheki.layout.frame.viewBoxHeight;
export const frameViewBoxWidth = ({ cheki }: State) =>
  cheki.layout.frame.viewBoxWidth;
export const frameX = ({ cheki }: State) => cheki.layout.frame.x;
export const frameY = ({ cheki }: State) => cheki.layout.frame.y;

export const imageDataUrl = ({ cheki }: State) => cheki.image.dataUrl;
export const imageDirection = ({ cheki }: State) => cheki.image.direction;
export const imageFilter = ({ cheki }: State) => cheki.image.filter;
export const imageHeight = ({ cheki }: State) => cheki.image.height;
export const imageWidth = ({ cheki }: State) => cheki.image.width;
export const imageX = ({ cheki }: State) => cheki.image.x;
export const imageY = ({ cheki }: State) => cheki.image.y;

export const ready = ({ cheki }: State) => cheki.ready;

export const splashed = ({ cheki }: State) => cheki.splashed;

export const trimDisplayMagnification = ({ cheki }: State) =>
  cheki.layout.trim.displayMagnification;
export const trimHeight = ({ cheki }: State) => cheki.layout.trim.height;
export const trimWidth = ({ cheki }: State) => cheki.layout.trim.width;
export const trimViewBoxHeight = ({ cheki }: State) =>
  cheki.layout.trim.viewBoxHeight;
export const trimViewBoxWidth = ({ cheki }: State) =>
  cheki.layout.trim.viewBoxWidth;
export const trimX = ({ cheki }: State) => cheki.layout.trim.x;
export const trimY = ({ cheki }: State) => cheki.layout.trim.y;
