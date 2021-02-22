import { Area } from "~/types/exhibition";

const area: Area = {
  areas: {
    sea: {
      maximumX: -8.5,
      maximumZ: -20,
      minimumX: -11.5,
      minimumZ: -22,
    },
  },
  background: {
    color: "#F8FFC9",
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
    url: "http://localhost:8000/objects/areas/meadow/collider.glb",
  },
  fog: {
    color: "#F8FFC9",
  },
  lights: {
    directional: {
      color: "#F9FDC2",
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
        id: "ameri_swing",
        name: "",
        position: {
          x: -21,
          y: 4.15,
          z: -13.1,
        },
        rotation: {
          x: 0,
          y: -124,
          z: 0,
        },
        scenarios: [],
        scale: {
          x: 0.25,
          y: 0.25,
          z: 0.25,
        },
        url: "http://localhost:8000/objects/areas/meadow/ameri_swing.glb",
      },
      {
        id: "noneme_piano",
        name: "",
        position: {
          x: -1.365,
          y: 3.85,
          z: -11.56,
        },
        rotation: {
          x: 0,
          y: -257,
          z: 0,
        },
        scenarios: [],
        scale: {
          x: 0.595,
          y: 0.595,
          z: 0.595,
        },
        url: "http://localhost:8000/objects/areas/meadow/noneme_piano.glb",
      },
      {
        id: "hitugi",
        name: "",
        position: {
          x: -22.65,
          y: 3.9,
          z: -1.72,
        },
        rotation: {
          x: 0,
          y: -137,
          z: 0,
        },
        scenarios: [],
        scale: {
          x: 0.5,
          y: 0.5,
          z: 0.5,
        },
        url: "http://localhost:8000/objects/characters/hitugi.glb",
      },
      {
        id: "neminko",
        name: "",
        position: {
          x: 0,
          y: 3.8,
          z: 1,
        },
        rotation: {
          x: 0,
          y: -137,
          z: 0,
        },
        scenarios: [],
        scale: {
          x: 0.5,
          y: 0.5,
          z: 0.5,
        },
        url: "http://localhost:8000/objects/characters/neminko.glb",
      },
    ],
    components: [
      {
        name: "water",
        props: {
          y: 2.55,
        },
      },
    ],
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
        url: "http://localhost:8000/objects/areas/meadow/boards.glb",
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
        url: "http://localhost:8000/objects/areas/meadow/terrain.glb",
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
        url: "http://localhost:8000/objects/areas/meadow/bushes.glb",
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
        url: "http://localhost:8000/objects/areas/meadow/flowers.glb",
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
        url: "http://localhost:8000/objects/areas/meadow/grasses.glb",
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
        url: "http://localhost:8000/objects/areas/meadow/trees.glb",
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
        url: "http://localhost:8000/objects/areas/meadow/waterlily.glb",
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
        url: "http://localhost:8000/objects/areas/meadow/tulips.glb",
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
        url: "http://localhost:8000/objects/areas/meadow/stones.glb",
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
        url: "http://localhost:8000/objects/areas/meadow/sunflowers.glb",
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
        url: "http://localhost:8000/objects/areas/meadow/stumps.glb",
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
        url: "http://localhost:8000/objects/areas/meadow/piano.glb",
      },
      {
        position: {
          x: -22.27,
          y: 4.15,
          z: -2.4,
        },
        rotation: {
          x: 0,
          y: -140,
          z: 0,
        },
        scale: {
          x: 3.2,
          y: 3.2,
          z: 3.2,
        },
        url: "http://localhost:8000/objects/areas/meadow/chair.glb",
      },
    ],
    items: [],
    works: [
      {
        characters: [],
        comment: "",
        date: "",
        id: "ameri_sunflower",
        imageUrl: "",
        position: {
          x: -18.72,
          y: 5.355,
          z: -14.3,
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
        url: "http://localhost:8000/objects/areas/meadow/ameri_sunflower.glb",
      },
      {
        characters: [],
        comment: "",
        date: "",
        id: "easter_egg",
        imageUrl: "",
        position: {
          x: -10.05,
          y: 5.135,
          z: 0.143,
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
        url: "http://localhost:8000/objects/areas/meadow/easter_egg.glb",
      },
      {
        characters: [],
        comment: "",
        date: "",
        id: "koishi",
        imageUrl: "",
        position: {
          x: 6.6,
          y: 5.23,
          z: -6,
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
        url: "http://localhost:8000/objects/areas/meadow/koishi.glb",
      },
      {
        characters: [],
        comment: "",
        date: "",
        id: "koishi_hydrangea",
        imageUrl: "",
        position: {
          x: 13.85,
          y: 5.455,
          z: -10.8,
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
        url: "http://localhost:8000/objects/areas/meadow/koishi_hydrangea.glb",
      },
      {
        characters: [],
        comment: "",
        date: "",
        id: "koishi_sakura",
        imageUrl: "",
        position: {
          x: -3.07,
          y: 5.24,
          z: -6,
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
        url: "http://localhost:8000/objects/areas/meadow/koishi_sakura.glb",
      },
      {
        characters: [],
        comment: "",
        date: "",
        id: "koishi_sunflower",
        imageUrl: "",
        position: {
          x: -13.9,
          y: 5.335,
          z: -15.4,
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
        url: "http://localhost:8000/objects/areas/meadow/koishi_sunflower.glb",
      },
      {
        characters: [],
        comment: "",
        date: "",
        id: "lee_white_clover",
        imageUrl: "",
        position: {
          x: -7.65,
          y: 5.265,
          z: 0.55,
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
        url: "http://localhost:8000/objects/areas/meadow/lee_white_clover.glb",
      },
      {
        characters: [],
        comment: "",
        date: "",
        id: "noneme_dry",
        imageUrl: "",
        position: {
          x: 5.2,
          y: 5.4,
          z: -14,
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
        url: "http://localhost:8000/objects/areas/meadow/noneme_dry.glb",
      },
      {
        characters: [],
        comment: "",
        date: "",
        id: "noneme_sunflower",
        imageUrl: "",
        position: {
          x: -4.2,
          y: 5.45,
          z: -15.35,
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
        url: "http://localhost:8000/objects/areas/meadow/noneme_sunflower.glb",
      },
      {
        characters: [],
        comment: "",
        date: "",
        id: "rainy_season",
        imageUrl: "",
        position: {
          x: 17.765,
          y: 5.3,
          z: -11,
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
        url: "http://localhost:8000/objects/areas/meadow/rainy_season.glb",
      },
      {
        characters: [],
        comment: "",
        date: "",
        id: "red_gerbera",
        imageUrl: "",
        position: {
          x: 15.35,
          y: 5.275,
          z: -1,
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
        url: "http://localhost:8000/objects/areas/meadow/red_gerbera.glb",
      },
      {
        characters: [],
        comment: "",
        date: "",
        id: "red_spider_lily",
        imageUrl: "",
        position: {
          x: 19.575,
          y: 5.12,
          z: -0.65,
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
        url: "http://localhost:8000/objects/areas/meadow/red_spider_lily.glb",
      },
      {
        characters: [],
        comment: "",
        date: "",
        id: "sakura",
        imageUrl: "",
        position: {
          x: -7.525,
          y: 5.257,
          z: -5.9,
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
        url: "http://localhost:8000/objects/areas/meadow/sakura.glb",
      },
    ],
  },
  player: {
    defaultPosition: {
      x: 0,
      y: 3.8,
      z: 0,
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
    url: "http://localhost:8000/sounds/meadow.mp3",
  },
};

export default area;
