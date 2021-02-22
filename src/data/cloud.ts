import { MAID_SCENARIOS } from "./clouds/scenarios";
import { ABOUT_THIS_WORLD } from "./common/scenarios";
import { Area } from "~/types/exhibition";

const area: Area = {
  areas: {},
  background: {
    color: "#FFCFCB",
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
    url: "/objects/areas/cloud/collider.glb",
  },
  fog: {
    color: "#FFCFCB",
  },
  lights: {
    directional: {
      color: "#FD4D56",
      position: {
        x: 0,
        y: 10,
        z: 0,
      },
    },
    points: [
      {
        color: "#FFF",
        position: {
          x: 0,
          y: 10,
          z: 0,
        },
      },
    ],
  },
  objects: {
    characters: [
      {
        id: "noneme_sitting",
        name: "",
        position: {
          x: 12.15,
          y: 5.825,
          z: 2.385,
        },
        rotation: {
          x: 0,
          y: -180,
          z: 0,
        },
        scale: {
          x: 0.25,
          y: 0.25,
          z: 0.25,
        },
        scenarios: [],
        url: "/objects/characters/noneme_sitting.glb",
      },
      {
        id: "flower_sheep",
        name: "",
        position: {
          x: -1.68,
          y: 6,
          z: 11.07,
        },
        rotation: {
          x: 0,
          y: 145,
          z: 0,
        },
        scale: {
          x: 0.2,
          y: 0.2,
          z: 0.2,
        },
        scenarios: [
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
        ],
        url: "/objects/characters/flower_sheep.glb",
      },
      {
        id: "water_sheep",
        name: "",
        position: {
          x: -2.725,
          y: 6,
          z: 11.07,
        },
        rotation: {
          x: 0,
          y: 180,
          z: 0,
        },
        scale: {
          x: 0.2,
          y: 0.2,
          z: 0.2,
        },
        scenarios: [
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
        ],
        url: "/objects/characters/water_sheep.glb",
      },
      {
        id: "ameri",
        name: "あめり",
        position: {
          x: 15.05,
          y: 6.155,
          z: 2.56,
        },
        rotation: {
          x: -180,
          y: 18,
          z: -180,
        },
        scale: {
          x: 0.25,
          y: 0.25,
          z: 0.25,
        },
        scenarios: [],
        url: "/objects/characters/ameri.glb",
      },
      {
        id: "maid",
        name: "メイドさん",
        position: {
          x: 7.75,
          y: 5.79,
          z: 9.835,
        },
        rotation: {
          x: -180,
          y: -18,
          z: 180,
        },
        scale: {
          x: 0.25,
          y: 0.25,
          z: 0.25,
        },
        scenarios: MAID_SCENARIOS,
        url: "/objects/characters/maid.glb",
      },
      {
        id: "hitugi",
        name: "棺",
        position: {
          x: -2.2,
          y: 6,
          z: 11.25,
        },
        rotation: {
          x: 0,
          y: -200,
          z: 0,
        },
        scale: {
          x: 0.5,
          y: 0.5,
          z: 0.5,
        },
        scenarios: [
          {
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
          },
        ],
        url: "/objects/characters/hitsugi.glb",
      },
    ],
    components: [],
    decorations: [
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
        url: "/objects/areas/cloud/balloons.glb",
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
        url: "/objects/areas/cloud/candy.glb",
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
        url: "/objects/areas/cloud/clouds.glb",
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
        url: "/objects/areas/cloud/neminko_sleeping.glb",
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
        url: "/objects/areas/cloud/pc.glb",
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
        url: "/objects/areas/cloud/sweets.glb",
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
        url: "/objects/areas/cloud/terrain.glb",
      },
    ],
    items: [
      {
        id: "fanarts",
        position: {
          x: 10.75,
          y: 5.5,
          z: 2.65,
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
        url: "/objects/areas/cloud/post.glb",
      },
    ],
    works: [
      {
        characters: ["ノネメちゃん"],
        comment: "コメント",
        date: "2020/01",
        id: "calmery_chan",
        imageUrl: "/og.png",
        position: {
          x: 3.25,
          y: 6.85,
          z: -3.25,
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
        url: "/objects/areas/cloud/calmery_chan.glb",
        title: "タイトル",
      },
      {
        characters: ["ノネメちゃん"],
        comment: "コメント",
        date: "2020/01",
        id: "fried_egg",
        imageUrl: "/og.png",
        position: {
          x: 12.6,
          y: 6.87,
          z: 9.9,
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
        url: "/objects/areas/cloud/fried_egg.glb",
        title: "タイトル",
      },
      {
        characters: ["ノネメちゃん"],
        comment: "コメント",
        date: "2020/01",
        id: "koishi",
        position: {
          x: -3.75,
          y: 6.85,
          z: 2,
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
        url: "/objects/areas/cloud/koishi.glb",
        imageUrl: "/logo.png",
        title: "タイトル",
      },
      {
        characters: ["ノネメちゃん"],
        comment: "コメント",
        date: "2020/01",
        id: "lee_mai",
        position: {
          x: 6.95,
          y: 6.9,
          z: -2.85,
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
        url: "/objects/areas/cloud/lee_mai.glb",
        imageUrl: "/logo.png",
        title: "タイトル",
      },
      {
        characters: ["ノネメちゃん"],
        comment: "コメント",
        date: "2020/01",
        id: "maid",
        position: {
          x: 1.7,
          y: 6.885,
          z: 9.75,
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
        url: "/objects/areas/cloud/maid.glb",
        imageUrl: "/logo.png",
        title: "タイトル",
      },
      {
        characters: ["ノネメちゃん"],
        comment: "コメント",
        date: "2020/01",
        id: "maid_gas_mask",
        imageUrl: "/og.png",
        position: {
          x: 9.2,
          y: 6.85,
          z: 9.35,
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
        url: "/objects/areas/cloud/maid_gas_mask.glb",
        title: "タイトル",
      },
      {
        characters: ["ノネメちゃん"],
        comment: "コメント",
        date: "2020/01",
        id: "maid_pancake",
        imageUrl: "/og.png",
        position: {
          x: -10.65,
          y: 6.87,
          z: 9.68,
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
        url: "/objects/areas/cloud/maid_pancake.glb",
        title: "タイトル",
      },
      {
        characters: ["ノネメちゃん"],
        comment: "コメント",
        date: "2020/01",
        id: "main_visual",
        imageUrl: "/og.png",
        position: {
          x: -10.175,
          y: 6.75,
          z: -19.8,
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
        url: "/objects/areas/cloud/main_visual.glb",
        title: "タイトル",
      },
      {
        characters: ["ノネメちゃん"],
        comment: "コメント",
        date: "2020/01",
        id: "moment",
        imageUrl: "/og.png",
        position: {
          x: -0.615,
          y: 6.85,
          z: -3.13,
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
        url: "/objects/areas/cloud/moment.glb",
        title: "タイトル",
      },
      {
        characters: ["ノネメちゃん"],
        comment: "コメント",
        date: "2020/01",
        id: "neminko",
        imageUrl: "/og.png",
        position: {
          x: -14,
          y: 6.925,
          z: -7.85,
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
        url: "/objects/areas/cloud/neminko.glb",
        title: "タイトル",
      },
      {
        characters: ["ノネメちゃん"],
        comment: "コメント",
        date: "2020/01",
        id: "okusuri",
        imageUrl: "/og.png",
        position: {
          x: -8.9,
          y: 6.85,
          z: 1.85,
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
        url: "/objects/areas/cloud/okusuri.glb",
        title: "タイトル",
      },
      {
        characters: ["ノネメちゃん"],
        comment: "コメント",
        date: "2020/01",
        id: "pancake",
        imageUrl: "/og.png",
        position: {
          x: -15.28,
          y: 6.88,
          z: 8.82,
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
        url: "/objects/areas/cloud/pancake.glb",
        title: "タイトル",
      },
      {
        characters: ["ノネメちゃん"],
        comment: "コメント",
        date: "2020/01",
        id: "satori_koishi",
        imageUrl: "/og.png",
        position: {
          x: -0.37,
          y: 6.85,
          z: 2.12,
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
        url: "/objects/areas/cloud/satori_koishi.glb",
        title: "タイトル",
      },
      {
        characters: ["ノネメちゃん"],
        comment: "コメント",
        date: "2020/01",
        id: "strawberry_cake",
        imageUrl: "/og.png",
        position: {
          x: -21.5,
          y: 6.85,
          z: 10.85,
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
        url: "/objects/areas/cloud/strawberry_cake.glb",
        title: "タイトル",
      },
      {
        characters: ["ノネメちゃん"],
        comment: "コメント",
        date: "2020/01",
        id: "tabenemi",
        imageUrl: "/og.png",
        position: {
          x: -17.95,
          y: 6.85,
          z: 9,
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
        url: "/objects/areas/cloud/tabenemi.glb",
        title: "タイトル",
      },
      {
        characters: ["ノネメちゃん"],
        comment: "コメント",
        date: "2020/01",
        id: "yumekawa",
        imageUrl: "/og.png",
        position: {
          x: -18.4,
          y: 6.89,
          z: -8.2,
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
        url: "/objects/areas/cloud/yumekawa.glb",
        title: "タイトル",
      },
    ],
  },
  player: {
    defaultPosition: {
      x: -2.95,
      y: 5.7,
      z: 13,
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
    url: "/sounds/cloud.mp3",
  },
};

export default area;
