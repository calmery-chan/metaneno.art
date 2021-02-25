import { ABOUT_THIS_WORLD } from "../common/scenarios";
import { Scenario } from "~/types/exhibition";

export const CALMERY_CHAN_SCENARIOS: Scenario[] = [
  {
    animations: [["wave"], ["idle"]],
    branches: [
      {
        message: "ください",
        scenarios: [
          {
            message: "どうぞ！",
          },
          {
            message: "甘くてふわふわしていた。",
            name: null,
          },
          {
            animations: [["wave"], ["idle"]],
            message: "また来てね！",
            name: "あめり",
          },
        ],
      },
      {
        message: "首を横に振る",
        scenarios: [
          {
            animations: [["wave"], ["idle"]],
            message: "また来てね！",
          },
        ],
      },
    ],
    message: "こんにちは！雲から作ったわたあめはいかがですか～？",
    name: "あめり",
  },
];

export const FLOWER_SHEEP_SCENARIOS: Scenario[] = [
  {
    branches: [
      {
        message: "行く",
        scenarios: [
          {
            actions: ["move_to_meadow"],
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
    message: "どうやら草原に連れて行ってくれるようだ。",
  },
];

export const HITSUGI_SCENARIOS: Scenario[] = [
  {
    actions: ["talk_with_hitsugi"],
    branches: [
      {
        message: "好きなお菓子のはなし",
        scenarios: [
          {
            message: "…私はグミが好き。",
          },
          {
            message: "食感がグミグミしてて何だか気持ちいいから…。",
          },
        ],
      },
      {
        message: "この世界について",
        scenarios: ABOUT_THIS_WORLD,
      },
    ],
    message: "………ここは甘いにおいがする。",
    name: "棺",
  },
];

export const MAID_SCENARIOS: Scenario[] = [
  {
    message: "はじめまして！あの…突然ですがちょっと料理を作りすぎてしまって…",
    name: "メイドさん",
  },
  {
    branches: [
      {
        message: "パンケーキがいい",
        scenarios: [
          {
            animations: [["pose"]],
            branches: [
              {
                message: "食べる",
                scenarios: [
                  {
                    message:
                      "わぁ！ありがとうございます♪お口に合うといいのですが！",
                  },
                  {
                    message: "体力が10回復した。しかし元々体力はMAXのようだ！",
                    name: null,
                  },
                ],
              },
              {
                message: "頭にのせておく",
                scenarios: [
                  {
                    branches: [
                      {
                        message: "乗せて！",
                        scenarios: [
                          {
                            actions: ["pancake"],
                            animations: [["idle"]],
                            message:
                              "…乗せましたよ！落とさないように気を付けてくださいね…？",
                          },
                        ],
                      },
                      {
                        message: "…やっぱり何でもないです…。",
                        scenarios: [
                          {
                            animations: [["pose", "smile", "meido_Standing"]],
                            message: "あ、いえいえ…！(ほっ……)",
                          },
                        ],
                      },
                    ],
                    message:
                      "え………？頭に…？いいんでしょうか……本当に乗せちゃいますよ…？",
                  },
                ],
              },
            ],
            message: "...",
          },
        ],
      },
      {
        message: "目玉焼きがいい",
        scenarios: [
          {
            animations: [["pose"]],
            branches: [
              {
                message: "食べる",
                scenarios: [
                  {
                    message:
                      "わぁ！ありがとうございます♪お口に合うといいのですが！",
                  },
                  {
                    message: "体力が10回復した。しかし元々体力はMAXのようだ！",
                    name: null,
                  },
                ],
              },
              {
                message: "頭にのせておく",
                scenarios: [
                  {
                    branches: [
                      {
                        message: "乗せて！",
                        scenarios: [
                          {
                            actions: ["fried_egg"],
                            animations: [["idle"]],
                            message:
                              "…乗せましたよ！落とさないように気を付けてくださいね…？",
                          },
                        ],
                      },
                      {
                        message: "…やっぱり何でもないです…。",
                        scenarios: [
                          {
                            animations: [["pose", "smile", "meido_Standing"]],
                            message: "あ、いえいえ…！(ほっ……)",
                          },
                        ],
                      },
                    ],
                    message:
                      "え………？頭に…？いいんでしょうか……本当に乗せちゃいますよ…？",
                  },
                ],
              },
            ],
            message: "...",
          },
        ],
      },
    ],
    message: "パンケーキと目玉焼き…もしお腹が空いていれば、食べませんか…？",
  },
];

export const NEMINKO_SCENARIOS: Scenario[] = [
  {
    actions: ["talk_with_neminko"],
    animations: [["blink"]],
    branches: [
      {
        message: "この夢から覚めるには？",
        scenarios: [
          {
            animations: [["talk"]],
            message:
              "夢から覚めるコツ・・・？うーん・・・。自然と目が覚めるまで夢を楽しむことかな…♪",
          },
          {
            message:
              "なんてね。いつもたべん子ちゃんからは手とかほっぺをつねってもらってるよ。",
          },
          {
            animations: [["idle"]],
            branches: [
              {
                message: "この世界の出口はどこにあるの？",
                scenarios: [
                  {
                    animations: [["blink"]],
                    message:
                      "んー…ゴールっぽい場所ならここの奥の雲の先で見た気がするよ～。",
                  },
                ],
              },
              {
                message: "ほっぺつねってくれませんか……？",
                scenarios: [
                  {
                    animations: [["blink"]],
                    message: "しょうがないなぁ～。一回だけだよ？えい、ぐいー。",
                  },
                  {
                    message: "…………………夢から覚める気配がない…",
                    name: null,
                  },
                  {
                    message: "うーん。効果なかったみたいだねぇ。",
                    name: "ねみん子",
                  },
                  {
                    animations: [["talk"]],
                    message:
                      "そういえば、ここから奥に進むとゴール的なものがあった気がするよ～。",
                  },
                  {
                    animations: [["idle"]],
                    message:
                      "私はもう少しここで寝ていたいから…じゃあおやすみ～♪",
                  },
                ],
              },
            ],
            message: "じゃあおやすみ…Zzz",
          },
        ],
      },
      {
        message: "ねみん子ちゃんだ！",
        scenarios: [
          {
            animations: [["talk"]],
            message: "え？なんで私の事知ってるの…？",
          },
          {
            message:
              "授業中寝ててもテストで100点取れちゃうからそれで有名になっちゃったかなぁ？",
          },
          {
            message: "えへへ…サインなら書いてあげるよ…むにゃむにゃぁ",
          },
        ],
      },
      {
        message: "あっ、すいません…。",
        scenarios: [
          {
            animations: [["idle"]],
            message: "ん……………Zzz",
          },
        ],
      },
    ],
    message: "……………むにゃ？",
    name: "ねみん子",
  },
];

export const NONEME_SCENARIOS: Scenario[] = [
  {
    actions: ["talk_with_noneme"],
    branches: [
      {
        message: "どんな味がするの？",
        scenarios: [
          {
            message: "………味？…ふわふわしてる…。",
          },
        ],
      },
      {
        message: "好きなお菓子のはなし",
        scenarios: [
          {
            message: "えっと……見た目が可愛いものかな…。写真映えするし…♪",
          },
        ],
      },
    ],
    message: "……………♪",
    name: "ノネメ",
  },
];

export const PC_SCENARIOS: Scenario[] = [
  {
    branches: [
      {
        message: "する",
        scenarios: [
          {
            message: "（何だか昔作ったサイトに似てるなぁ…？）",
          },
          {
            actions: ["open_okusuri_land"],
            message: "...",
          },
        ],
      },
      {
        message: "しない",
        scenarios: [
          {
            message: "...",
          },
        ],
      },
    ],
    message: "おくすりランドに接続しますか？",
  },
];

export const WATER_SHEEP_SCENARIOS: Scenario[] = [
  {
    branches: [
      {
        message: "行く",
        scenarios: [
          {
            actions: ["move_to_sea"],
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
    message: "どうやら水中遺跡に連れて行ってくれるようだ。",
  },
];
