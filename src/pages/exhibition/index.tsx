import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { Exhibition3d } from "~/components/Exhibition/3d";
import { ExhibitionMenu } from "~/components/Exhibition/Menu";
import { Area, GraphicsQuality } from "~/types/exhibition";

const cloud: Area = {
  background: {
    color: "#FFCFCB",
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
        url: "http://localhost:8000/objects/characters/ameri.glb",
      },
      {
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
        url: "http://localhost:8000/objects/characters/meido.glb",
      },
      {
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
        url: "http://localhost:8000/objects/characters/hitugi.glb",
      },
    ],
    colliders: [],
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
        url: "http://localhost:8000/objects/areas/cloud/balloons.glb",
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
        url: "http://localhost:8000/objects/areas/cloud/candy.glb",
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
        url: "http://localhost:8000/objects/areas/cloud/clouds.glb",
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
        url: "http://localhost:8000/objects/areas/cloud/neminko_sleeping.glb",
      },
      {
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
        url: "http://localhost:8000/objects/areas/cloud/noneme_sitting.glb",
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
        url: "http://localhost:8000/objects/areas/cloud/pc.glb",
      },
      {
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
        url: "http://localhost:8000/objects/areas/cloud/post.glb",
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
        url: "http://localhost:8000/objects/areas/cloud/sweets.glb",
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
        url: "http://localhost:8000/objects/areas/cloud/terrain.glb",
      },
    ],
    illustrations: [
      {
        id: "calmery_chan",
        image: { url: "/og.png" },
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
        url: "http://localhost:8000/objects/areas/cloud/calmery_chan.glb",
      },
      {
        id: "fried_egg",
        image: { url: "/og.png" },
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
        url: "http://localhost:8000/objects/areas/cloud/fried_egg.glb",
      },
      {
        id: "koishi",
        image: { url: "/og.png" },
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
        url: "http://localhost:8000/objects/areas/cloud/koishi.glb",
      },
      {
        id: "lee_mai",
        image: { url: "/og.png" },
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
        url: "http://localhost:8000/objects/areas/cloud/lee_mai.glb",
      },
      {
        id: "maid",
        image: { url: "/og.png" },
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
        url: "http://localhost:8000/objects/areas/cloud/maid.glb",
      },
      {
        id: "maid_gas_mask",
        image: { url: "/og.png" },
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
        url: "http://localhost:8000/objects/areas/cloud/maid_gas_mask.glb",
      },
      {
        id: "maid_pancake",
        image: { url: "/og.png" },
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
        url: "http://localhost:8000/objects/areas/cloud/maid_pancake.glb",
      },
      {
        id: "main_visual",
        image: { url: "/og.png" },
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
        url: "http://localhost:8000/objects/areas/cloud/main_visual.glb",
      },
      {
        id: "moment",
        image: { url: "/og.png" },
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
        url: "http://localhost:8000/objects/areas/cloud/moment.glb",
      },
      {
        id: "neminko",
        image: { url: "/og.png" },
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
        url: "http://localhost:8000/objects/areas/cloud/neminko.glb",
      },
      {
        id: "okusuri",
        image: { url: "/og.png" },
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
        url: "http://localhost:8000/objects/areas/cloud/okusuri.glb",
      },
      {
        id: "pancake",
        image: { url: "/og.png" },
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
        url: "http://localhost:8000/objects/areas/cloud/pancake.glb",
      },
      {
        id: "satori_koishi",
        image: { url: "/og.png" },
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
        url: "http://localhost:8000/objects/areas/cloud/satori_koishi.glb",
      },
      {
        id: "strawberry_cake",
        image: { url: "/og.png" },
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
        url: "http://localhost:8000/objects/areas/cloud/strawberry_cake.glb",
      },
      {
        id: "tabenemi",
        image: { url: "/og.png" },
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
        url: "http://localhost:8000/objects/areas/cloud/tabenemi.glb",
      },
      {
        id: "yumekawa",
        image: { url: "/og.png" },
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
        url: "http://localhost:8000/objects/areas/cloud/yumekawa.glb",
      },
    ],
  },
  player: {
    defaultPosition: {
      x: 0,
      y: 5.7,
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
  },
  sound: {
    url: "http://localhost:8000/sounds/cloud.mp3",
  },
};

const Exhibition: NextPage = () => {
  const [graphicsQuality, setGraphicsQuality] = useState<GraphicsQuality>(
    "high"
  );

  const handleChangeQuality = useCallback(
    (graphicsQuality: GraphicsQuality) => {
      setGraphicsQuality(graphicsQuality);
    },
    []
  );

  return (
    <>
      <Exhibition3d area={cloud} settings={{ graphicsQuality }} />
      <ExhibitionMenu onChangeGraphicsQuality={handleChangeQuality} />
    </>
  );
};

export default Exhibition;
