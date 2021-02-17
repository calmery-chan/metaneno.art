import React, { useState, useEffect } from "react";

import { useFrame } from "react-three-fiber";
import { AnimationMixer, Scene } from "three";
import * as Three from "three";
import { AreaObject } from "~/types/exhibition";
import { getGltf, rewriteMaterials } from "~/utils/exhibition";

const Exhibition3dCanvasObject = React.memo<AreaObject>(
  ({ transform, url }) => {
    const [mixer, setMixer] = useState<AnimationMixer>();
    const [scene, setScene] = useState<Scene>();
    const { position, rotation, scale } = transform;

    // Side Effects

    useEffect(() => {
      (async () => {
        const { animations, scene } = await getGltf(url);

        rewriteMaterials(scene);
        setScene(scene);

        if (animations[0]) {
          const mixer = new AnimationMixer(scene);
          setMixer(mixer);

          const animation = mixer.clipAction(animations[0]);
          animation.play();

          return () => {
            mixer.stopAllAction();
          };
        }
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

    useFrame((_, delta) => {
      if (mixer) {
        mixer.update(delta);
      }
    });

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
