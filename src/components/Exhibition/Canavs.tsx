import { VRM } from "@pixiv/three-vrm";
import React, { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const loadVrm = (url: string): Promise<VRM> =>
  new Promise((resolve) =>
    new GLTFLoader().load(url, (gltf) => VRM.from(gltf).then(resolve))
  );

export const ExhibitionCanavs: React.FC = React.memo(() => {
  const [player, setPlayer] = useState<VRM | null>(null);

  useEffect(() => {
    (async () => setPlayer(await loadVrm("/exhibition/calmery-chan.vrm")))();
  }, []);

  if (!player) {
    return null;
  }

  return <primitive object={player.scene} />;
});
