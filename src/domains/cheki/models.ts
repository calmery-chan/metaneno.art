import { PhantomType } from "~/types/PhantomType";

export type Hex = PhantomType<string, "Hex">;

export const isHex = (maybeHex: string): maybeHex is Hex =>
  /#([0-9|a-f|A-F]{3}|[0-9|a-f|A-F]{6})$/.test(maybeHex);
