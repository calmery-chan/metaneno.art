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

export const CHEKI_THUMBNAIL_IMAGE_SIZE = 96;

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

export const CHEKI_FILTERS = [
  "c1",
  "f2",
  "g3",
  "p5",
  "hb1",
  "hb2",
  "acg",
  "lv3",
  "m5",
  "a6",
  "kk2",
  "m3",
  "t1",
  "b5",
  "x1",
] as ChekiFilter[];

export type ChekiFilter =
  | "c1"
  | "f2"
  | "g3"
  | "p5"
  | "hb1"
  | "hb2"
  | "acg"
  | "lv3"
  | "m5"
  | "a6"
  | "kk2"
  | "m3"
  | "t1"
  | "b5"
  | "x1";

export const SPLASH_SCREEN_DURATION = 1600;

export const SHARE_RANDOM_HASHTAGS = [
  "ノネメしか勝たん",
  "ノネメちゃんとチェキ撮ったよ！",
  "ノネメちゃんマジ天使",
  "秋のノネメちゃん展覧会",
  "ノネメちゃん可愛い",
  "ノネメちゃんが現れた",
  "ノネメちゃんとエンカしたよ！",
  "ノネメちゃん帝国",
  "天使見つけたよ",
].map(encodeURIComponent);

export const TWITTER_HASHTAG_URL =
  "https://twitter.com/hashtag/%E3%83%8E%E3%83%8D%E3%83%A1%E3%81%A1%E3%82%83%E3%82%93%E3%83%81%E3%82%A7%E3%82%AD";
