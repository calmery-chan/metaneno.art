import axios from "axios";
import { Scene } from "three";
import GLTFLoader from "three-gltf-loader";

export const getScene = (url: string): Promise<Scene> =>
  new Promise((resolve, reject) => {
    new GLTFLoader().load(
      url,
      (gltf) => resolve(gltf.scene),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      reject
    );
  });

export const preload = (url: string) => axios.get(url);
