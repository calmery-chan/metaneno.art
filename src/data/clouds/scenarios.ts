import { Scenario } from "~/types/exhibition";

// Maid

export const MAID_SCENARIOS: Scenario[] = [
  {
    animations: [["blink", "standing"]],
    message: "はじめまして！あの…突然ですがちょっと料理を作りすぎてしまって…",
    name: "メイドさん",
  },
  {
    branches: [
      {
        message: "パンケーキがいい",
        scenarios: [
          {
            branches: [
              {
                message: "食べる",
                scenarios: [
                  {
                    animations: [["open mouth", "pose", "smile", "standing"]],
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
                    animations: [["komaru", "pose", "standing"]],
                    branches: [
                      {
                        message: "乗せて！",
                        scenarios: [
                          {
                            actions: ["pancake"],
                            message:
                              "…乗せましたよ！落とさないように気を付けてくださいね…？",
                          },
                        ],
                      },
                      {
                        message: "…やっぱり何でもないです…。",
                        scenarios: [
                          {
                            animations: [["pose", "smile", "standing"]],
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
            branches: [
              {
                message: "食べる",
                scenarios: [
                  {
                    animations: [["open mouth", "pose", "smile", "standing"]],
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
                    animations: [["komaru", "pose", "standing"]],
                    branches: [
                      {
                        message: "乗せて！",
                        scenarios: [
                          {
                            actions: ["fried_egg"],
                            message:
                              "…乗せましたよ！落とさないように気を付けてくださいね…？",
                          },
                        ],
                      },
                      {
                        message: "…やっぱり何でもないです…。",
                        scenarios: [
                          {
                            animations: [["pose", "smile", "standing"]],
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
