import React, { useState, useEffect } from "react";
import { Scene } from "three";
import { Exhibition3dScene } from "../Scene";
import { AreaObject } from "~/types/exhibition";
import {
  alwaysTrue,
  getGltf,
  rewriteMaterials,
  setupScene,
} from "~/utils/exhibition";

// Decoration は完全に不変、更新する必要がない
const Decoration = React.memo<AreaObject>(
  ({ position, rotation, scale, url }) => {
    const [scene, setScene] = useState<Scene>();

    useEffect(() => {
      (async () => {
        const { scene } = await getGltf(url);

        setupScene(scene, position, rotation, scale);

        rewriteMaterials(scene);
        setScene(scene);
      })();
    }, []);

    return <Exhibition3dScene scene={scene} />;
  },
  alwaysTrue
);

export const Exhibition3dObjectsDecorations: React.FC<{
  objects: AreaObject[];
}> = ({ objects }) => (
  <>
    {objects.map((object) => (
      <Decoration {...object} key={object.url} />
    ))}
  </>
);
