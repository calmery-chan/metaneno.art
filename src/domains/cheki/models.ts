import { ChekiDirection } from "~/types/ChekiDirection";
import { PhantomType } from "~/types/PhantomType";

export type Hex = PhantomType<string, "Hex">;

export const isHex = (maybeHex: string): maybeHex is Hex =>
  /#([0-9|a-f|A-F]{3}|[0-9|a-f|A-F]{6})$/.test(maybeHex);

export type ChekiDynamicDecoration = {
  component: string;
  id: string;
  thumbnail: string;
};

export type ChekiStaticDecoration = {
  direction: ChekiDirection;
  id: string;
  layers: ChekiStaticDecorationLayer[];
  thumbnail: string;
};

export type ChekiStaticDecorationLayer = {
  height: number;
  rotate: number;
  url: string;
  width: number;
  x: number;
  y: number;
};

export type ChekiDecoration = ChekiDynamicDecoration | ChekiStaticDecoration;

export const isDynamicDecoration = (
  decoration: ChekiDecoration
): decoration is ChekiDynamicDecoration =>
  Object.prototype.hasOwnProperty.call(decoration, "component");
