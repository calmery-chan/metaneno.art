import { ABOUT_THIS_WORLD } from "./common/scenarios";
import { Area } from "~/types/exhibition";

const area: Area = {
  areas: {
    meadow: {
      minimumX: -1,
      minimumZ: 12,
      maximumX: 1,
      maximumZ: 16,
    },
  },
  background: {
    color: "#2CDDEE",
  },
  collider: {
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    scale: {
      x: 1,
      y: 1,
      z: 1,
    },
    url: "/objects/areas/sea/collider.glb",
  },
  fog: {
    color: "#2CDDEE",
  },
  lights: {
    directional: {
      color: "#AEF3FF",
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
    points: [],
  },
  objects: {
    characters: [
      {
        id: "hitsugi",
        name: "棺",
        position: {
          x: 4.55,
          y: 1.4,
          z: 7.6,
        },
        rotation: {
          x: 0,
          y: 160,
          z: 0,
        },
        scenarios: [
          {
            animations: [["smile", "starnding"]],
            branches: [
              {
                message: "ここって水中だよね…？",
                scenarios: [
                  {
                    animations: [["smile", "standing"]],
                    branches: [
                      {
                        message: "泳ぐの苦手…。",
                        scenarios: [
                          {
                            animations: [["blink", "standing"]],
                            message: "………カナヅチ？",
                          },
                          {
                            animations: [["blink", "smile"]],
                            message:
                              "ここでは普通に歩けるから無理して泳ぐ必要はないよ。良かったね…。",
                          },
                        ],
                      },
                      {
                        message: "目が痛くなってきた…。",
                        scenarios: [
                          {
                            animations: [["blink", "standing"]],
                            message: "水中で目を開けることに慣れてないの…？",
                          },
                          {
                            animations: [["smile", "standing"]],
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
                scenarios: [
                  {
                    message: "私は…棺(ひつぎ)。",
                  },
                  {
                    message:
                      "色々な世界を見て回って面白いことや楽しいことを探しているの。",
                  },
                  {
                    message:
                      "過去にも未来にも何処にだって行くことが出来るの…。",
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
            message: "………水中遺跡って何だか探求心がくすぐられますよね…",
            name: "棺",
          },
        ],
        scale: {
          x: 0.5,
          y: 0.5,
          z: 0.5,
        },
        url: "/objects/characters/hitsugi.glb",
      },
      {
        id: "noneme",
        name: "ノネメ",
        position: {
          x: -18.17,
          y: 1.35,
          z: 0.1,
        },
        rotation: {
          x: 0,
          y: -20,
          z: 0,
        },
        scenarios: [
          {
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
                            message:
                              "ん～…まあね…ちょっとサボりたいときとか…。",
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
        ],
        scale: {
          x: 0.25,
          y: 0.25,
          z: 0.25,
        },
        url: "/objects/characters/noneme.glb",
      },
      {
        id: "water_sheep",
        name: "",
        position: {
          x: -27.9,
          y: 1.375,
          z: 8.75,
        },
        rotation: {
          x: 0,
          y: 210,
          z: 0,
        },
        scenarios: [
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
        ],
        scale: {
          x: 0.2,
          y: 0.2,
          z: 0.2,
        },
        url: "/objects/characters/water_sheep.glb",
      },
    ],
    components: [
      {
        name: "water",
        props: {
          y: 1.22,
        },
      },
    ],
    decorations: [
      {
        position: {
          x: 1.09,
          y: 1.79,
          z: 10.25,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/sea/board.glb",
      },
      {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/sea/terrain.glb",
      },
      {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/sea/beams.glb",
      },
      {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/sea/bottles.glb",
      },
      {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/sea/cages.glb",
      },
      {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/sea/columns.glb",
      },
      {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/sea/crystals.glb",
      },
      {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/sea/cups.glb",
      },
      {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/sea/grasses.glb",
      },
      {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/sea/pillars.glb",
      },
      {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/sea/ruins.glb",
      },
      {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/sea/stones.glb",
      },
      {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/sea/tables.glb",
      },
      {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/sea/walls.glb",
      },
    ],
    items: [],
    works: [
      {
        characters: ["棺（ひつぎ）"],
        comment: "",
        date: "2021/02",
        id: "aquarium",
        imageUrl: "/images/aquarium.png",
        position: {
          x: 3.5,
          y: 2.15,
          z: 5.95,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        title: "私の水槽",
        url: "/objects/areas/sea/aquarium.glb",
      },
      {
        characters: ["チルノ（東方Project）"],
        comment:
          "※こちらの作品は二次創作作品です。\n\n氷って透明でキラキラしててとっても綺麗ですが、人間は氷よりもずっと温度が高いので触ると溶けてしまいますよね。\n氷に囲まれ、触れ合うことが出来るのは氷の妖精さんの特権。",
        date: "2016/09",
        id: "cirno",
        imageUrl: "/images/cirno.png",
        position: {
          x: -6.85,
          y: 2.1,
          z: 6.15,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        title: "0909",
        url: "/objects/areas/sea/cirno.glb",
      },
      {
        characters: ["棺（ひつぎ）"],
        comment:
          "深海に現れた棺ちゃん。\n色んな世界線を見てまわることが好きな彼女。\n今回もひとつの人生（物語）の終わりを見届けに来たようです。\n\n彼女はとある人生の終わりそうな瞬間（死に際）に現れて息絶えていく様子を見守っていてくれます。\n今回は深海に沈んで行く人間を観察しているのでしょうか…。\n決して助けに来てくれた訳ではないので、冷たいです。",
        date: "2020/08",
        id: "deep_sea",
        imageUrl: "/images/deep_sea.png",
        position: {
          x: -3.525,
          y: 2.45,
          z: -2.37,
        },
        rotation: {
          x: -11,
          y: -2,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        title: "深海の死麗",
        url: "/objects/areas/sea/deep_sea.glb",
      },
      {
        characters: [],
        comment:
          "こちらのイラストはギャラリーIYN様のグループ展「ふしぎな魔法少女展」に参加させていただいた絵です。少女は氷魔法を扱う才能を持っているけど、取得したいのはお花を咲かす魔法みたいです。\n\n生命活動を誘う暖かい魔法と、すべてを凍らせてしまう冷たい魔法。真逆すぎますね…。",
        date: "2019/12",
        id: "flowers",
        imageUrl: "/images/flowers.png",
        position: {
          x: -3.5,
          y: 2.1,
          z: 6.3,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        title: "花を咲かせない魔法",
        url: "/objects/areas/sea/flowers.glb",
      },
      {
        characters: [],
        comment:
          "結構前のイラストです。\n中学生の時に描いた貴重な一枚絵です。\nグリーンとか青色のライトってカッコイイですよね。\nつながる歯車と人の手。(一部つながってないけど…。)\nこの絵を描いてるときは永遠とTHE YELLOW MONKEYの8というアルバムを聴いていた思い出があります。",
        date: "2013",
        id: "gear",
        imageUrl: "/images/gear.png",
        position: {
          x: -8.175,
          y: 1.96,
          z: -1.55,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        title: "ギア少女",
        url: "/objects/areas/sea/gear.glb",
      },
      {
        characters: [],
        comment: "",
        date: "2021/02",
        id: "goldfish",
        imageUrl: "/images/goldfish.png",
        position: {
          x: 1.9,
          y: 2.25,
          z: -0.9,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        title: "金魚を瓶に封じ込めて飾りたい",
        url: "/objects/areas/sea/goldfish.glb",
      },
      {
        characters: ["古明地こいし（東方Project）"],
        comment:
          "※こちらの作品は二次創作作品です。\n\n「花隠れ」をテーマにした同人本に収録した一枚です。\n紫陽花の花手水です。\n水面がゆらゆらと揺れる様子と、こいしちゃんの不安定さを合わせてみました。",
        date: "2019/10",
        id: "hydrangea",
        imageUrl: "/images/hydrangea.png",
        position: {
          x: -16.5,
          y: 2,
          z: 5.67,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        title: "水面に映る小石",
        url: "/objects/areas/sea/hydrangea.glb",
      },
      {
        characters: [],
        comment:
          "メロンソーダのような海なら溺れてみたい。\nメロンソーダとか、ソーダ系の飲み物って泡がしゅわしゅわキラキラして色も綺麗なので飲むのが勿体なく感じます。\n美味しいのですぐ飲みきってしまうんですけど…。",
        date: "2021/02",
        id: "melon_soda",
        imageUrl: "/images/melon_soda.png",
        position: {
          x: -26.5,
          y: 1.9,
          z: 6.05,
        },
        rotation: {
          x: -11,
          y: 1,
          z: 5,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        title: "メロンソーダの中身",
        url: "/objects/areas/sea/melon_soda.glb",
      },
      {
        characters: [],
        comment: "",
        date: "2021/02",
        id: "submerged",
        imageUrl: "/images/submerged.png",
        position: {
          x: -21,
          y: 3.055,
          z: 4.785,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        title: "過去のアトリエ",
        url: "/objects/areas/sea/submerged.glb",
      },
    ],
  },
  player: {
    defaultPosition: {
      x: 0.25,
      y: 1.35,
      z: 11,
    },
    defaultRotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    defaultScale: {
      x: 0.5,
      y: 0.5,
      z: 0.5,
    },
    url: "/objects/player.glb",
  },
  sound: {
    url: "/sounds/sea.mp3",
  },
};

export default area;
