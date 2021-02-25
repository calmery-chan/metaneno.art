import React, { useState, useEffect } from "react";
import { useFrame } from "react-three-fiber";
import {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  LoopOnce,
  LoopRepeat,
  Scene,
} from "three";
import * as Three from "three";
import { Exhibition3dScene } from "../Scene";
import { AreaCharacterObject } from "~/types/exhibition";
import { getGltf } from "~/utils/exhibition";

type A = AnimationAction & {
  name: string;
};

const playAnimations = (
  mixer: AnimationMixer,
  animations: AnimationClip[],
  loop = false
): Promise<void> =>
  new Promise((resolve) => {
    const names: string[] = [];
    const state: { [key in string]: boolean } = {};

    animations.forEach(({ name }) => {
      names.push(name);
      state[name] = false;
    });

    if (!loop) {
      mixer.addEventListener("finished", (event: Three.Event) => {
        const { name } = event.action as A;

        if (state[name] !== undefined) {
          state[name] = true;
        }

        if (names.every((name) => state[name])) {
          resolve();
        }
      });
    }

    animations.forEach((animation) => {
      const action = mixer.clipAction(animation) as A;
      action.clampWhenFinished = !loop;
      action.loop = loop ? LoopRepeat : LoopOnce;
      action.name = animation.name;
      action.play();
    });

    if (loop) {
      resolve();
    }
  });

const Character = React.memo<
  AreaCharacterObject & {
    animations?: string[][];
    onClick: () => void;
  }
>(
  ({
    id,
    animations: currentAnimations,
    onClick,
    position,
    rotation,
    scale,
    scenarios,
    url,
  }) => {
    const [animations, setAnimations] = useState<AnimationClip[]>([]);
    const [mixer, setMixer] = useState<AnimationMixer>();
    const [scene, setScene] = useState<Scene>();

    // Side Effects

    useEffect(() => {
      if (!currentAnimations && animations[0] && scene) {
        const mixer = new AnimationMixer(scene);
        setMixer(mixer);

        const animation = mixer.clipAction(animations[0]);
        animation.play();

        return () => {
          mixer.stopAllAction();
        };
      }

      if (!currentAnimations || !scene) {
        return;
      }

      (async () => {
        let mixer: AnimationMixer | undefined = undefined;

        for (let i = 0; i < currentAnimations.length; i++) {
          if (mixer) {
            mixer.stopAllAction();
          }

          mixer = new AnimationMixer(scene);
          setMixer(mixer);

          await playAnimations(
            mixer,
            currentAnimations[i]
              .map((animationName) =>
                animations.find(({ name }) => name === animationName)
              )
              .filter((x) => x instanceof AnimationClip) as AnimationClip[],
            i === currentAnimations.length - 1
          );
        }
      })();
    }, [animations, currentAnimations, scene]);

    useEffect(() => {
      if (animations[0] && scene) {
        const mixer = new AnimationMixer(scene);
        setMixer(mixer);

        const animation = mixer.clipAction(animations[0]);
        animation.play();

        return () => {
          mixer.stopAllAction();
        };
      }
    }, [animations, scene]);

    useEffect(() => {
      (async () => {
        const { animations, scene } = await getGltf(url);

        setAnimations(animations);
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
  }
);

export const Exhibition3dObjectsCharacters: React.FC<{
  animations: { [objectId in string]: string[][] };
  objects: AreaCharacterObject[];
  onClick: (characterId: string) => void;
}> = ({ animations, objects, onClick }) => (
  <>
    {objects.map((object) => (
      <Character
        {...object}
        animations={animations[object.id]}
        key={object.url}
        onClick={() => onClick(object.id)}
      />
    ))}
  </>
);
