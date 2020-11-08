export const CHEKI_FRAME_MARGIN_BOTTOM = 304;
export const CHEKI_FRAME_MARGIN_LEFT = 64;
export const CHEKI_FRAME_MARGIN_RIGHT = 64;
export const CHEKI_FRAME_MARGIN_TOP = 128;

export const CHEKI_HORIZONTAL_IMAGE_HEIGHT = 900;
export const CHEKI_HORIZONTAL_IMAGE_WIDTH = 1200;
export const CHEKI_HORIZONTAL_FRAME_HEIGHT =
  CHEKI_FRAME_MARGIN_TOP +
  CHEKI_HORIZONTAL_IMAGE_HEIGHT +
  CHEKI_FRAME_MARGIN_BOTTOM;
export const CHEKI_HORIZONTAL_FRAME_WIDTH =
  CHEKI_FRAME_MARGIN_LEFT +
  CHEKI_HORIZONTAL_IMAGE_WIDTH +
  CHEKI_FRAME_MARGIN_RIGHT;

export const CHEKI_IMAGE_MAX_WIDTH = 1200;
export const CHEKI_IMAGE_MAX_HEIGHT = 1200;

export const CHEKI_VERTICAL_IMAGE_HEIGHT = 1200;
export const CHEKI_VERTICAL_IMAGE_WIDTH = 900;
export const CHEKI_VERTICAL_FRAME_HEIGHT =
  CHEKI_FRAME_MARGIN_TOP +
  CHEKI_VERTICAL_IMAGE_HEIGHT +
  CHEKI_FRAME_MARGIN_BOTTOM;
export const CHEKI_VERTICAL_FRAME_WIDTH =
  CHEKI_FRAME_MARGIN_LEFT +
  CHEKI_VERTICAL_IMAGE_WIDTH +
  CHEKI_FRAME_MARGIN_RIGHT;

export const CHEKI_FRAME_IMAGE_URLS = [
  // https://www.vecteezy.com/vector-art/123466-cartoon-sweets-vector-pattern
  "/cheki/frames/1.png",
  // https://www.vecteezy.com/vector-art/98112-cute-girly-pattern-vector
  "/cheki/frames/2.png",
  // https://www.vecteezy.com/vector-art/149825-colorful-candy-pattern-vectors
  "/cheki/frames/3.png",
];

export type ChekiFilter =
  | "diamante"
  | "flagblue"
  | "islands"
  | "liquid"
  | "marine"
  | "oceanic"
  | "perfume"
  | "seagreen"
  | "serenity"
  | "vintage";

// https://silvia-odwyer.github.io/photon/
// silvia-odwyer/photon: Rust/WebAssembly image processing library (https://github.com/silvia-odwyer/photon)
// https://github.com/silvia-odwyer/photon/blob/4db0d5912a3ab7231bf5109ba0628f843d5a4872/crate/src/filters.rs#L107-L146
// https://github.com/silvia-odwyer/photon/blob/4db0d5912a3ab7231bf5109ba0628f843d5a4872/crate/src/colour_spaces.rs#L575-L599

export const CHEKI_FILTERS: {
  [key in ChekiFilter]: {
    r: number;
    g: number;
    b: number;
    a: number;
    background: string;
  };
} = {
  diamante: {
    r: 30,
    g: 82,
    b: 87,
    a: 0.1,
    background: "rgba(232,237,238	,1)",
  },
  flagblue: {
    r: 0,
    g: 0,
    b: 131,
    a: 0.2,
    background: "rgba(204,204,230	,1)",
  },
  islands: {
    r: 0,
    g: 24,
    b: 95,
    a: 0.2,
    background: "rgba(204,	208,	223	,1)",
  },
  liquid: {
    r: 0,
    g: 10,
    b: 75,
    a: 0.2,
    background: "rgba(204,206,219	,1)",
  },
  marine: {
    r: 0,
    g: 14,
    b: 119,
    a: 0.2,
    background: "rgba(204,206,227,1)",
  },
  oceanic: {
    r: 0,
    g: 89,
    b: 173,
    a: 0.2,
    background: "rgba(204, 221, 238, 1)",
  },
  perfume: {
    r: 80,
    g: 40,
    b: 120,
    a: 0.2,
    background: "rgba(220,212,228	,1)",
  },
  seagreen: {
    r: 0,
    g: 68,
    b: 62,
    a: 0.2,
    background: "rgba(204,217,216	,1)",
  },
  serenity: {
    r: 10,
    g: 40,
    b: 90,
    a: 0.2,
    background: "rgba(206,212,222,1)",
  },
  vintage: {
    r: 120,
    g: 70,
    b: 13,
    a: 0.2,
    background: "rgba(228,218,206	,1)",
  },
};
