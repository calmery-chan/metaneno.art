import axios from "axios";
import {
  AnimationClip,
  Material,
  Mesh,
  MeshStandardMaterial,
  MeshToonMaterial,
  Object3D,
  Scene,
  MathUtils,
} from "three";
import GLTFLoader from "three-gltf-loader";

import { GraphicsQuality, Transform } from "~/types/exhibition";

const createMaterial = (material: Material) => {
  // UniGLTF/UniUnlit を使用しているときは MeshBasicMaterial となる、書き換えない
  if (material.type === "MeshBasicMaterial") {
    return material;
  }

  const m = material as MeshStandardMaterial;

  // MToon で出力すると MeshStandardMaterial となる、影の描写がおかしくなるのでマテリアルを作り直す
  return new MeshToonMaterial({
    alphaTest: m.alphaTest,
    color: m.color,
    map: m.map,
    opacity: m.opacity,
    transparent: m.transparent,
  });
};

export const alwaysTrue = () => true;

export const getDevicePixelRatio = (quality: GraphicsQuality) => {
  if (!window) {
    return 1;
  }

  const { devicePixelRatio } = window;

  // スマートフォンなどでは `devicePixelRatio` が 2 や 3 になるときがある
  if (devicePixelRatio > 1) {
    switch (quality) {
      case "low":
        return 1;

      case "middle":
        return 1 + (devicePixelRatio - 1) / 2;

      case "high":
        return devicePixelRatio;
    }
  }

  switch (quality) {
    case "low":
      return devicePixelRatio * 0.5;

    case "middle":
      return devicePixelRatio * 0.75;

    case "high":
      return devicePixelRatio;
  }
};

export const getGltf = (
  url: string
): Promise<{
  animations: AnimationClip[];
  scene: Scene;
}> =>
  new Promise((resolve, reject) => {
    new GLTFLoader().load(
      `${
        process.env.NODE_ENV === "production"
          ? "https://assets.metaneno.art"
          : "http://localhost:8000"
      }${url}`,
      ({ animations, scene }) => {
        scene.animations = animations;

        return resolve({
          animations,
          scene,
        });
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      reject
    );
  });

export const getScene = async (url: string) => {
  const { scene } = await getGltf(url);
  return scene;
};

export const ping = async (): Promise<void> => {
  await fetch(
    process.env.NODE_ENV === "production"
      ? "https://multiplay-creamsoda-in-a-dream.herokuapp.com/a/dream"
      : "http://localhost:5000"
  );
};

export const preload = (url: string) =>
  axios.get(
    `${
      process.env.NODE_ENV === "production"
        ? "https://assets.metaneno.art"
        : "http://localhost:8000"
    }${url}`
  );

export const rewriteMaterials = (scene: Scene) => {
  const helper = (objects: Object3D[]) => {
    objects.forEach((object) => {
      if (object instanceof Mesh) {
        if (Array.isArray(object.material)) {
          object.material = object.material.map(createMaterial);
          return;
        }

        object.material = createMaterial(object.material);
        return;
      }

      if (object instanceof Object3D) {
        helper(object.children);
        return;
      }
    });
  };

  helper(scene.children);
};

export const setupScene = (
  scene: Scene,
  position: Transform,
  rotation: Transform,
  scale: Transform
) => {
  scene.position.set(position.x, position.y, position.z);
  scene.rotation.set(
    MathUtils.degToRad(rotation.x),
    MathUtils.degToRad(rotation.y),
    MathUtils.degToRad(rotation.z)
  );
  scene.scale.set(scale.x, scale.y, scale.z);
  return scene;
};
