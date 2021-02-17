import axios from "axios";
import { AnimationClip, Scene } from "three";
import GLTFLoader from "three-gltf-loader";

export const getDevicePixelRatio = (quality: "low" | "middle" | "high") => {
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
      url,
      (gltf) =>
        resolve({
          animations: gltf.animations,
          scene: gltf.scene,
        }),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      reject
    );
  });

export const preload = (url: string) => axios.get(url);
