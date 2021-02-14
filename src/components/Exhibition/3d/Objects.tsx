import React, { useState, useEffect } from "react";

import { Scene } from "three";
import { AreaObject } from "~/types/exhibition";
import { getScene } from "~/utils/exhibition";

const Exhibition3dCanvasObject = React.memo<AreaObject>(
  ({ transform, url }) => {
    const [scene, setScene] = useState<Scene>();
    const { position, rotation, scale } = transform;

    // Side Effects

    useEffect(() => {
      (async () => {
        setScene(await getScene(url));
      })();
    }, [url]);

    useEffect(() => {
      if (!scene) {
        return;
      }

      scene.position.set(position.x, position.y, position.z);

      scene.rotation.set(rotation.x, rotation.y, rotation.z);

      scene.scale.set(scale.x, scale.y, scale.z);
    }, [position, rotation, scale, scene]);

    // Render

    if (!scene) {
      return null;
    }

    return <primitive object={scene} />;
  }
);

export const Exhibition3dCanvasObjects: React.FC<{ objects: AreaObject[] }> = ({
  objects,
}) => (
  <>
    {objects.map((object) => (
      <Exhibition3dCanvasObject key={object.url} {...object} />
    ))}
  </>
);
