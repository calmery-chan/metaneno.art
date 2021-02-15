import axios from "axios";
import { AnimationClip, Scene } from "three";
import GLTFLoader from "three-gltf-loader";

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
