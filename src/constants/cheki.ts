import { DefaultSeoProps } from "next-seo";
import { Hex, ChekiDecoration } from "~/domains/cheki/models";

import { getTutorialElementId } from "~/utils/cheki";

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

export const CHEKI_DECORATION_COLORS = ["#000", "#F00", "#0F0"] as Hex[];

export const CHEKI_FRAME_IMAGE_URLS: {
  name: ChekiFrame;
  url: string;
}[] = [
  { name: "white", url: "/cheki/frames/white.png" },
  { name: "black", url: "/cheki/frames/black.png" },
  { name: "blue", url: "/cheki/frames/blue.png" },
  { name: "gray", url: "/cheki/frames/gray.png" },
  { name: "lightgray", url: "/cheki/frames/lightgray.png" },
  { name: "pink", url: "/cheki/frames/pink.png" },
  { name: "yellow", url: "/cheki/frames/yellow.png" },
  { name: "candy", url: "/cheki/frames/candy.png" },
  { name: "egg", url: "/cheki/frames/egg.png" },
  { name: "flower", url: "/cheki/frames/flower.png" },
  { name: "noise", url: "/cheki/frames/noise.png" },
  { name: "noiseblue", url: "/cheki/frames/noiseblue.png" },
];

export type ChekiFrame =
  | "white"
  | "black"
  | "blue"
  | "gray"
  | "lightgray"
  | "pink"
  | "yellow"
  | "candy"
  | "egg"
  | "flower"
  | "noise"
  | "noiseblue";

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
  "ノネメちゃんとチェキ撮ったよ",
  "ノネメちゃんマジ天使",
  "秋のノネメちゃん展覧会",
  "ノネメちゃん可愛い",
  "ノネメちゃんが現れた",
  "ノネメちゃんとエンカしたよ",
  "ノネメちゃん帝国",
  "天使見つけたよ",
].map(encodeURIComponent);

export const TWITTER_HASHTAG_URL =
  "https://twitter.com/hashtag/%E3%83%8E%E3%83%8D%E3%83%A1%E3%81%A1%E3%82%83%E3%82%93%E3%83%81%E3%82%A7%E3%82%AD";

export const DEFAULT_SEO_PROPS: DefaultSeoProps = {
  canonical: "https://metaneno.art/cheki",
  description: "天使のノネメちゃんと一緒にチェキを撮ろう！",
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
    description: "天使のノネメちゃんと一緒にチェキを撮ろう！",
    images: [
      {
        height: 630,
        url: "https://metaneno.art/cheki/og.png",
        width: 1200,
      },
    ],
    locale: "ja_JP",
    site_name: "めたねのあーと",
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
  tags: CharacterTag[];
  width: number;
};

export const CHEKI_DECORATIONS: ChekiDecoration[] = [
  {
    direction: "horizontal",
    id: "example-1",
    layers: [
      {
        height: 400,
        rotate: 0,
        url: "/cheki/decorations/1.png",
        width: 400,
        x: 0,
        y: 0,
      },
      {
        height: 400,
        rotate: 0,
        url: "/cheki/decorations/2.png",
        width: 400,
        x: 850,
        y: 900,
      },
    ],
    thumbnail: "/cheki/decorations/1.png",
  },
  {
    direction: "vertical",
    id: "example-2",
    layers: [
      {
        height: 400,
        rotate: 0,
        url: "/cheki/decorations/1.png",
        width: 400,
        x: 0,
        y: 0,
      },
      {
        height: 400,
        rotate: 0,
        url: "/cheki/decorations/2.png",
        width: 400,
        x: 0,
        y: 0,
      },
    ],
    thumbnail: "/cheki/decorations/2.png",
  },
  {
    id: "created-date",
    component: "created-date",
    thumbnail: "/cheki/decorations/2.png",
  },
];

export const CHARACTER_TAGS = [
  {
    id: "front",
    name: "正面",
  },
  {
    id: "peace",
    name: "ピース",
  },
  {
    id: "smile",
    name: "笑顔",
  },
  {
    id: "side",
    name: "横向き",
  },
] as const;

export type CharacterTag = typeof CHARACTER_TAGS[number]["id"];

export const NONEME_IMAGES = [
  {
    fixed: {
      bottom: false,
      left: false,
      right: false,
      top: false,
    },
    height: 400,
    url: "/cheki/characters/1.png",
    rotate: { min: -24, max: 24 },
    scale: { min: 0.5, max: 1 },
    tags: ["front", "smile"],
    width: 385,
  },
  {
    fixed: {
      bottom: true,
      left: true,
      right: false,
      top: false,
    },
    height: 600,
    url: "/cheki/characters/2.png",
    rotate: { min: -8, max: 8 },
    scale: { min: 1.2, max: 1.4 },
    tags: ["front"],
    width: 624,
  },
  {
    fixed: {
      bottom: true,
      left: false,
      right: true,
      top: false,
    },
    height: 600,
    url: "/cheki/characters/3.png",
    rotate: { min: -4, max: 8 },
    scale: { min: 1.2, max: 1.4 },
    tags: ["side"],
    width: 577,
  },
  {
    fixed: {
      bottom: true,
      left: false,
      right: false,
      top: false,
    },
    height: 600,
    url: "/cheki/characters/4.png",
    rotate: { min: -4, max: 4 },
    scale: { min: 1.1, max: 1.3 },
    tags: ["front", "peace"],
    width: 577,
  },
  {
    fixed: {
      bottom: true,
      left: false,
      right: false,
      top: false,
    },
    height: 600,
    url: "/cheki/characters/5.png",
    rotate: { min: -4, max: 4 },
    scale: { min: 1.1, max: 1.4 },
    tags: ["front", "smile"],
    width: 577,
  },
] as Character[];

export const NONEME_IMAGE_TAGS = NONEME_IMAGES.map(({ tags }) => tags);

export const FILTERS_PAGE_SCENARIO = [
  {
    emphasisElementId: getTutorialElementId("filters"),
    message: "ここにはフィルターが表示されているよ",
  },
  {
    message: "ここにはフィルターが表示されているよ",
  },
];
