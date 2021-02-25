import { Scenario } from "~/types/exhibition";

// Meadow and Sea

const _HITSUGI_MEADOW_AND_SEA_FIRST_SCENARIOS: Scenario = {
  animations: [["idle"]],
  branches: [
    {
      message: "うん。",
      scenarios: [
        {
          message:
            "ここでは、とあるイラストレーターのイラストが沢山飾られています。",
        },
        {
          message:
            "イラストをタップすると作品詳細が見れたり、キャラクターに話しかけることも出来るよ。",
        },
        {
          message:
            "エリアは全部で3つ。草原、水中、雲のエリアが用意されています。",
        },
        {
          message:
            "水中と草原は自由に行き来できるけど、雲のエリアに行きたい場合はエリアの何処かにいるふわふわの羊に話しかけてね。",
        },
        {
          message: "水中と草原に行きたい場合は横にいるふわふわに話しかけて。",
        },
        {
          message:
            "またわからなくなったらいつでも聞いて。私はしばらくこの世界に居るから…。",
        },
      ],
    },
    {
      message: "…………。",
      scenarios: [
        {
          message: "………………",
        },
        {
          message: "………そう。また聞きたくなったらいつでも話しかけて………。",
        },
      ],
    },
  ],
  message: "良ければこの世界での動き方について説明するけど、聞きますか…？",
};

export const HITSUGI_MEADOW_AND_SEA_FIRST_SCENARIOS: Scenario[] = [
  {
    animations: [["rotate"], ["idle"]],
    branches: [
      {
        message: "うん。",
        scenarios: [
          {
            animations: [["smile"]],
            message:
              "………ようこそ。（良かった、アレで本当にこの世界に来れるんだ…。）",
          },
          _HITSUGI_MEADOW_AND_SEA_FIRST_SCENARIOS,
        ],
      },
      {
        message: "…………。",
        scenarios: [
          {
            animations: [["idle", "neck"]],
            message: "…………あれ、違ったのかな…………（まあいいか…。）",
          },
          _HITSUGI_MEADOW_AND_SEA_FIRST_SCENARIOS,
        ],
      },
    ],
    message: "………こんにちは。クリームソーダを飲んでこの世界へ来たのですね。",
  },
];

export const ABOUT_HITSUGI_SCENARIOS: Scenario[] = [
  {
    message: "私は…棺(ひつぎ)。",
  },
  {
    message: "色々な世界を見て回って面白いことや楽しいことを探しているの。",
  },
  {
    message: "過去にも未来にも何処にだって行くことが出来るの…。",
  },
  {
    message:
      "旅をしていると、いろんな物、景色、生き物…いろんな発見があって、それぞれにストーリーがあってとっても面白いの。",
  },
  {
    message: "あなたも、この世界で何かお気に入りの物が見つかるといいね…。",
  },
];

//

export const SHEEP_MEADOW_AND_SEA_SCENARIOS = [
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

//

export const ABOUT_THIS_WORLD: Scenario[] = [
  {
    animations: [["idle"]],
    branches: [
      {
        message: "めたねのおくすりってどんな人？",
        scenarios: [
          {
            message: "この世界を作った本人だよ。",
          },
          {
            message:
              "……女の子のイラストを描いたり3Dモデルを作ったりしている人みたいです。",
          },
          {
            message:
              "………ま、私もたまたまここに遊びに来てるだけだから詳しいことは知らないんだけどね。",
          },
        ],
      },
      {
        message: "何をすればいいの？",
        scenarios: [
          {
            message:
              "展示されているイラストを見て楽しんでもいいし、私みたいに他にも遊びに来てる子が何人かいるみたいだから、話しかけて会話を楽",
          },
          {
            message: "しんでみてもいいと思います…。",
          },
        ],
      },
      {
        message: "この世界での動き方を教えて",
        scenarios: [
          {
            message:
              "ここでは、とあるイラストレーターのイラストが沢山飾られています。",
          },
          {
            message:
              "イラストをタップすると作品詳細が見れたり、キャラクターに話しかけることも出来るよ。",
          },
          {
            message:
              "エリアは全部で3つ。草原、水中、雲のエリアが用意されています。",
          },
          {
            message:
              "水中と草原は自由に行き来できるけど、雲のエリアに行きたい場合はエリアの何処かにいるふわふわの羊に話しかけてね。",
          },
          {
            message:
              "またわからなくなったらいつでも聞いて。私はしばらくこの世界に居るから…。",
          },
        ],
      },
    ],
    message: "どんなことが知りたい？",
  },
];
