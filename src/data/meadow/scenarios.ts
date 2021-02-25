import { ABOUT_HITSUGI_SCENARIOS, ABOUT_THIS_WORLD } from "../common/scenarios";
import { Scenario } from "~/types/exhibition";

export const CALMERY_CHAN_SCENARIOS: Scenario[] = [
  {
    name: null,
    message: "かるめりちゃんだ！ブランコを楽しそうに漕いでいる。",
  },
];

export const HITSUGI_SCENARIOS: Scenario[] = [
  {
    actions: ["talk_with_hitsugi"],
    animations: [["smile"]],
    branches: [
      {
        message: "あなたは誰？",
        scenarios: ABOUT_HITSUGI_SCENARIOS,
      },
      {
        message: "この世界について",
        scenarios: ABOUT_THIS_WORLD,
      },
    ],
    message: "お日様がぽかぽかして気持ちいいね。",
    name: "棺",
  },
];

export const NEMINKO_SCENARIOS: Scenario[] = [
  {
    actions: ["talk_with_neminko"],
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
    name: "ねみん子",
  },
];

export const NONEME_SCENARIOS: Scenario[] = [
  {
    actions: ["talk_with_noneme"],
    name: null,
    message: "…ピアノを弾くのに夢中みたいだ。",
  },
];
