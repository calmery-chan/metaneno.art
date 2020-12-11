import { ChekiDirection } from "./ChekiDirection";
import { ChekiFilter, ChekiFrame } from "~/constants/cheki";

export type ChekiDynamicDecoration<T> = {
  component: React.FC<T>;
  id: number;
  props: (props: {
    direction: ChekiDirection;
    filter: ChekiFilter;
    frame: ChekiFrame;
  }) => T;
};

type ChekiStaticDecorationLayer = {
  height: number;
  url: string;
  width: number;
  x: number;
  y: number;
};

export type ChekiStaticDecoration = {
  horizontal: ChekiStaticDecorationLayer[];
  id: number;
  vertical: ChekiStaticDecorationLayer[];
};
