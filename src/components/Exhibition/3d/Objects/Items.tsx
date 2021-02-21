import React, { useState, useEffect } from "react";
import { Scene } from "three";
import { Exhibition3dScene } from "../Scene";
import { AreaItemObject } from "~/types/exhibition";
import {
  alwaysTrue,
  getGltf,
  rewriteMaterials,
  setupScene,
} from "~/utils/exhibition";

// Item は完全に不変、更新する必要がない
const Item = React.memo<
  AreaItemObject & {
    onClick: () => void;
  }
>(({ onClick, position, rotation, scale, url }) => {
  const [scene, setScene] = useState<Scene>();

  useEffect(() => {
    (async () => {
      const { scene } = await getGltf(url);

      setupScene(scene, position, rotation, scale);

      rewriteMaterials(scene);
      setScene(scene);
    })();
  }, []);

  return <Exhibition3dScene onClick={onClick} scene={scene} />;
}, alwaysTrue);

export const Exhibition3dObjectsItems: React.FC<{
  objects: AreaItemObject[];
  onClick: (itemId: string) => void;
}> = ({ objects, onClick }) => (
  <>
    {objects.map((object) => (
      <Item {...object} key={object.url} onClick={() => onClick(object.id)} />
    ))}
  </>
);
