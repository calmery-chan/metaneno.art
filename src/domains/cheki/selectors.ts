import { State } from "../";

export const displayableHeight = ({ cheki }: State) =>
  cheki.layout.displayable.height;
export const displayableWidth = ({ cheki }: State) =>
  cheki.layout.displayable.width;
export const displayableX = ({ cheki }: State) => cheki.layout.displayable.x;
export const displayableY = ({ cheki }: State) => cheki.layout.displayable.y;
