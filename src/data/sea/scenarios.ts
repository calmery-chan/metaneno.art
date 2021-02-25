import { ABOUT_HITSUGI_SCENARIOS, ABOUT_THIS_WORLD } from "../common/scenarios";
import { Scenario } from "~/types/exhibition";

export const HITSUGI_SCENARIOS: Scenario[] = [
  {
    actions: ["talk_with_hitsugi"],
    animations: [["smile"]],
    branches: [
      {
        message: "ここって水中だよね…？",
        scenarios: [
          {
            branches: [
              {
                message: "泳ぐの苦手…。",
                scenarios: [
                  {
                    animations: [["idle"]],
                    message: "………カナヅチ？",
                  },
                  {
                    animations: [["smile"]],
                    message:
                      "ここでは普通に歩けるから無理して泳ぐ必要はないよ。良かったね…。",
                  },
                ],
              },
              {
                message: "目が痛くなってきた…。",
                scenarios: [
                  {
                    animations: [["idle"]],
                    message: "水中で目を開けることに慣れてないの…？",
                  },
                  {
                    animations: [["smile"]],
                    message: "大丈夫…夢の中だし、多分気のせいです。",
                  },
                ],
              },
            ],
            message: "水中にいるのが不思議？ふふ…",
          },
        ],
      },
      {
        message: "あなたは誰？",
        scenarios: ABOUT_HITSUGI_SCENARIOS,
      },
      {
        message: "この世界について",
        scenarios: ABOUT_THIS_WORLD,
      },
    ],
    message: "………水中遺跡って何だか探求心がくすぐられますよね…",
    name: "棺",
  },
];

export const NONEME_SCENARIOS: Scenario[] = [
  {
    actions: ["talk_with_noneme"],
    branches: [
      {
        message: "君は溺れないの？",
        scenarios: [
          {
            message: "私は天使だから大丈夫だけど………。",
          },
          {
            message: "こちらを不思議そうな目で見られた。",
            name: null,
          },
        ],
      },
      {
        message: "何してるの？",
        scenarios: [
          {
            message: "………！",
          },
          {
            message: "気まずい空気が流れた。",
            name: null,
          },
        ],
      },
      {
        message: "何だかここって不思議な場所だね…",
        scenarios: [
          {
            message: "………うん…",
          },
          {
            message: "………",
          },
          {
            branches: [
              {
                message: "よく行くの？",
                scenarios: [
                  {
                    branches: [
                      {
                        message: "サボるんだ…",
                        scenarios: [
                          {
                            message: "……えへへ。",
                          },
                        ],
                      },
                    ],
                    message: "ん～…まあね…ちょっとサボりたいときとか…。",
                  },
                ],
              },
              {
                message: "そうなんだ...",
                scenarios: [
                  {
                    message: "うん…。",
                  },
                ],
              },
            ],
            message: "こんな感じの古びた雰囲気…結構好き～。",
          },
        ],
      },
    ],
    message: "～♪(歌を歌っている…)",
    name: "ノネメ",
  },
];
