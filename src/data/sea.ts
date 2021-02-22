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
    url: "",
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
        scenarios: [],
        scale: {
          x: 0.5,
          y: 0.5,
          z: 0.5,
        },
        url: "http://localhost:8000/objects/characters/hitsugi.glb",
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
        url: "http://localhost:8000/objects/characters/noneme.glb",
      },
    ],
    components: ["water"],
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
        url: "http://localhost:8000/objects/areas/sea/board.glb",
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
        url: "http://localhost:8000/objects/areas/sea/terrain.glb",
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
        url: "http://localhost:8000/objects/areas/sea/beams.glb",
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
        url: "http://localhost:8000/objects/areas/sea/bottles.glb",
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
        url: "http://localhost:8000/objects/areas/sea/cages.glb",
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
        url: "http://localhost:8000/objects/areas/sea/columns.glb",
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
        url: "http://localhost:8000/objects/areas/sea/crystals.glb",
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
        url: "http://localhost:8000/objects/areas/sea/cups.glb",
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
        url: "http://localhost:8000/objects/areas/sea/grasses.glb",
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
        url: "http://localhost:8000/objects/areas/sea/pillars.glb",
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
        url: "http://localhost:8000/objects/areas/sea/ruins.glb",
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
        url: "http://localhost:8000/objects/areas/sea/stones.glb",
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
        url: "http://localhost:8000/objects/areas/sea/tables.glb",
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
        url: "http://localhost:8000/objects/areas/sea/walls.glb",
      },
    ],
    items: [],
    works: [
      {
        characters: [],
        comment: "",
        date: "",
        id: "",
        imageUrl: "aquarium",
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
        title: "",
        url: "http://localhost:8000/objects/areas/sea/aquarium.glb",
      },
      {
        characters: [],
        comment: "",
        date: "",
        id: "",
        imageUrl: "cirno",
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
        title: "",
        url: "http://localhost:8000/objects/areas/sea/cirno.glb",
      },
      {
        characters: [],
        comment: "",
        date: "",
        id: "",
        imageUrl: "deep_sea",
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
        title: "",
        url: "http://localhost:8000/objects/areas/sea/deep_sea.glb",
      },
      {
        characters: [],
        comment: "",
        date: "",
        id: "",
        imageUrl: "flowers",
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
        title: "",
        url: "http://localhost:8000/objects/areas/sea/flowers.glb",
      },
      {
        characters: [],
        comment: "",
        date: "",
        id: "",
        imageUrl: "gear",
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
        title: "",
        url: "http://localhost:8000/objects/areas/sea/gear.glb",
      },
      {
        characters: [],
        comment: "",
        date: "",
        id: "",
        imageUrl: "goldfish",
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
        title: "",
        url: "http://localhost:8000/objects/areas/sea/goldfish.glb",
      },
      {
        characters: [],
        comment: "",
        date: "",
        id: "",
        imageUrl: "hydrangea",
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
        title: "",
        url: "http://localhost:8000/objects/areas/sea/hydrangea.glb",
      },
      {
        characters: [],
        comment: "",
        date: "",
        id: "",
        imageUrl: "melon_soda",
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
        title: "",
        url: "http://localhost:8000/objects/areas/sea/melon_soda.glb",
      },
      {
        characters: [],
        comment: "",
        date: "",
        id: "",
        imageUrl: "submerged",
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
        title: "",
        url: "http://localhost:8000/objects/areas/sea/submerged.glb",
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
    url: "http://localhost:8000/objects/player.glb",
  },
  sound: {
    url: "http://localhost:8000/sounds/sea.mp3",
  },
};

export default area;
