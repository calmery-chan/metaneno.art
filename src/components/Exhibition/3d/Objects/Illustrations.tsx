import React, { useState, useEffect } from "react";
import { Scene } from "three";
import * as Three from "three";
import { AreaObject } from "~/types/exhibition";
import { getGltf, rewriteMaterials } from "~/utils/exhibition";

const Illustration = React.memo<AreaObject>(
  ({ position, rotation, scale, url }) => {
    const [scene, setScene] = useState<Scene>();

    // Side Effects

    useEffect(() => {
      (async () => {
        const { scene } = await getGltf(url);
        rewriteMaterials(scene);
        setScene(scene);
      })();
    }, [url]);

    useEffect(() => {
      if (!scene) {
        return;
      }

      scene.position.set(position.x, position.y, position.z);
      scene.rotation.set(
        Three.MathUtils.degToRad(rotation.x),
        Three.MathUtils.degToRad(rotation.y),
        Three.MathUtils.degToRad(rotation.z)
      );

      scene.scale.set(scale.x, scale.y, scale.z);
    }, [position, rotation, scale, scene]);

    // Render

    if (!scene) {
      return null;
    }

    return <primitive object={scene} />;
  }
);

export const Exhibition3dObjectsIllustrations: React.FC<{ objects: AreaObject[] }> = ({
  objects,
}) => (
  <>
    {objects.map((object) => (
      <Illustration
        {...object}
        key={object.url}
      />
    ))}
  </>
);
