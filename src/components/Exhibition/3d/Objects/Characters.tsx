import React, { useState, useEffect } from "react";
import { useFrame } from "react-three-fiber";
import { AnimationMixer, Scene } from "three";
import * as Three from "three";
import { Exhibition3dScene } from "../Scene";
import { AreaCharacterObject } from "~/types/exhibition";
import { getGltf } from "~/utils/exhibition";

const Character = React.memo<
  AreaCharacterObject & {
    onClick: () => void;
  }
>(({ onClick, position, rotation, scale, scenarios, url }) => {
  const [mixer, setMixer] = useState<AnimationMixer>();
  const [scene, setScene] = useState<Scene>();

  // Side Effects

  useEffect(() => {
    (async () => {
      const { animations, scene } = await getGltf(url);

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

  return (
    <Exhibition3dScene
      onClick={scenarios.length ? onClick : undefined}
      scene={scene}
    />
  );
});

export const Exhibition3dObjectsCharacters: React.FC<{
  objects: AreaCharacterObject[];
  onClick: (characterId: string) => void;
}> = ({ objects, onClick }) => (
  <>
    {objects.map((object) => (
      <Character
        {...object}
        key={object.url}
        onClick={() => onClick(object.id)}
      />
    ))}
  </>
);
