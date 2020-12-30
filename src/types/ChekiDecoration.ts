import { ChekiDirection } from "./ChekiDirection";

type ChekiDecorationLayer = {
  height: number;
  rotate: number;
  url: string;
  width: number;
  x: number;
  y: number;
};

export type ChekiDecoration = {
  direction: ChekiDirection;
  id: string;
  layers: ChekiDecorationLayer[];
  thumbnail: string;
};
