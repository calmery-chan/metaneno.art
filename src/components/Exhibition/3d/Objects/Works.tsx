import React, { useState, useEffect } from "react";
import { Scene } from "three";
import { Exhibition3dScene } from "../Scene";
import { AreaWorkObject, AreaObject } from "~/types/exhibition";
import { getGltf, rewriteMaterials, setupScene } from "~/utils/exhibition";

// Work は完全に不変、更新する必要がない
const Work = React.memo<AreaObject & { onClick: () => void }>(
  ({ onClick, position, rotation, scale, url }) => {
    const [scene, setScene] = useState<Scene>();

    // Side Effects

    useEffect(() => {
      (async () => {
        const { scene } = await getGltf(url);

        setupScene(scene, position, rotation, scale);

        rewriteMaterials(scene);
        setScene(scene);
      })();
    }, []);

    // Render

    return <Exhibition3dScene onClick={onClick} scene={scene} />;
  },
  (previousProps, nextProps) => previousProps.onClick === nextProps.onClick
);

export const Exhibition3dObjectsWorks: React.FC<{
  objects: AreaWorkObject[];
  onClick: (id: string) => void;
}> = ({ objects, onClick }) => (
  <>
    {objects.map((object) => (
      <Work {...object} key={object.url} onClick={() => onClick(object.id)} />
    ))}
  </>
);
