import { DefaultSeoProps } from "next-seo";

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

export const CHEKI_THUMBNAIL_IMAGE_SIZE = 96 * 2; // Retina

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
  { name: "white", url: "/cheki/frames/white.png" },
  { name: "black", url: "/cheki/frames/black.png" },
  { name: "blue", url: "/cheki/frames/blue.png" },
  { name: "gray", url: "/cheki/frames/gray.png" },
  { name: "lightgray", url: "/cheki/frames/lightgray.png" },
  { name: "pink", url: "/cheki/frames/pink.png" },
  { name: "yellow", url: "/cheki/frames/yellow.png" },
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

export const DEFAULT_SEO_PROPS: DefaultSeoProps = {
  canonical: "https://metaneno.art/cheki",
  description: "ノネメちゃんと一緒に写真を撮ろう！",
  nofollow: true, // Top ページ以外は基本 nofollow にする
  noindex: true, // Top ページ以外は基本 noindex にする
  title: "ノネメちゃんチェキ | めたねのあーと",

  // Twitter
  twitter: {
    cardType: "summary_large_image",
    // @username for the content creator / author (outputs as `twitter:creator`)
    handle: "@metanen0x0",
    // @username for the website used in the card footer
    site: "@metanen0x0",
  },

  // OGP
  openGraph: {
    description: "ノネメちゃんと一緒に写真を撮ろう！",
    images: [
      {
        height: 630,
        url: "https://metaneno.art/cheki/og.png",
        width: 1200,
      },
    ],
    locale: "ja_JP",
    site_name: "ノネメチェキ",
    title: "ノネメちゃんチェキ | めたねのあーと",
    type: "website",
    url: "https://metaneno.art/cheki",
  },
};

export type Character = {
  fixed: {
    bottom: boolean;
    left: boolean;
    right: boolean;
    top: boolean;
  };
  height: number;
  url: string;
  rotate: { min: number; max: number };
  scale: { min: number; max: number };
  width: number;
};

export const NONEME_IMAGES = [
  {
    fixed: {
      bottom: true,
      left: false,
      right: false,
      top: false,
    },
    height: 750,
    url: "/cheki/characters/1.png",
    rotate: { min: -8, max: 8 },
    scale: { min: 1, max: 1 },
    width: 734,
  },
  {
    fixed: {
      bottom: true,
      left: false,
      right: false,
      top: false,
    },
    height: 800,
    url: "/cheki/characters/2.png",
    rotate: { min: -8, max: 8 },
    scale: { min: 1, max: 1 },
    width: 511,
  },
  {
    fixed: {
      bottom: false,
      left: false,
      right: false,
      top: false,
    },
    height: 600,
    url: "/cheki/characters/3.png",
    rotate: { min: -24, max: 24 },
    scale: { min: 0.4, max: 1 },
    width: 422,
  },
] as Character[];
