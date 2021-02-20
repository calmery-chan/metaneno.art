import React, { useState, useEffect, useCallback } from "react";
import { Scene } from "three";
import { Exhibition3dScene } from "../Scene";
import { AreaIllustrationObject, AreaObject } from "~/types/exhibition";
import { getGltf, rewriteMaterials, setupScene } from "~/utils/exhibition";

// Decoration は完全に不変、更新する必要がない
const Illustration = React.memo<AreaObject & { onClick: () => void }>(
  ({ onClick, position, rotation, scale, url }) => {
    const [scene, setScene] = useState<Scene>();

    // Events

    const handleClick = useCallback(() => {
      onClick();
      console.log("Click !", url);
    }, [onClick]);

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

    return <Exhibition3dScene onClick={handleClick} scene={scene} />;
  },
  (previousProps, nextProps) => previousProps.onClick === nextProps.onClick
);

export const Exhibition3dObjectsIllustrations: React.FC<{
  objects: AreaIllustrationObject[];
  onClick: (id: string) => void;
}> = ({ objects, onClick }) => (
  <>
    {objects.map((object) => (
      <Illustration
        {...object}
        key={object.url}
        onClick={() => onClick(object.id)}
      />
    ))}
  </>
);
