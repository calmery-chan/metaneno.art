import { ABOUT_THIS_WORLD } from "../common/scenarios";
import { Scenario } from "~/types/exhibition";

export const CALMERY_CHAN_SCENARIOS: Scenario[] = [
  {
    name: null,
    message: "かるめりちゃんだ！ブランコを楽しそうに漕いでいる。",
  },
];

export const HITSUGI_SCENARIOS: Scenario[] = [
  {
    animations: [["smile"]],
    branches: [
      {
        message: "あなたは誰？",
        scenarios: [
          {
            animations: [["idle"]],
            message: "私は…棺(ひつぎ)。",
          },
          {
            message:
              "色々な世界を見て回って面白いことや楽しいことを探しているの。",
          },
          {
            message: "過去にも未来にも何処にだって行くことが出来るの…。",
          },
          {
            message:
              "旅をしていると、いろんな物、景色、生き物…いろんな発見があって、それぞれにストーリーがあってとっても面白いの。",
          },
          {
            message:
              "あなたも、この世界で何かお気に入りの物が見つかるといいね…。",
          },
        ],
      },
      {
        message: "この世界について",
        scenarios: ABOUT_THIS_WORLD,
      },
    ],
    message: "お日様がぽかぽかして気持ちいいね。",
  },
];

export const NEMINKO_SCENARIOS: Scenario[] = [
  {
    branches: [
      {
        message: "夢だよ！",
        scenarios: [
          {
            animations: [["sleepy"]],
            message: "そっかぁ…じゃあ楽しまなきゃ…♪",
          },
        ],
      },
      {
        message: "現実だよ。",
        scenarios: [
          {
            animations: [["sleepy"]],
            message: "えー…そうなの？ベットは何処かな…",
          },
        ],
      },
    ],
    message: "ん………………？ここは何処……？夢…？",
  },
];

export const NONEME_SCENARIOS: Scenario[] = [
  {
    name: null,
    message: "…ピアノを弾くのに夢中みたいだ。",
  },
];

export const SHEEP_SCENARIOS: Scenario[] = [
  {
    branches: [
      {
        message: "行く",
        scenarios: [
          {
            actions: ["move_to_cloud"],
            message: "…",
          },
        ],
      },
      {
        message: "止めとく",
        scenarios: [
          {
            message: "…",
          },
        ],
      },
    ],
    name: null,
    message: "どうやら雲の上に連れて行ってくれるみたいだ。",
  },
];
