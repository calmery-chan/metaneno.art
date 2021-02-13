import React, { useEffect, useState } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";
import { AnimationClip, AnimationMixer, Scene } from "three";
import GLTFLoader from "three-gltf-loader";

export const Exhibition3dPlayer = React.memo<{
  state: "running" | "standing" | "walking";
}>(({ state }) => {
  const [animations, setAnimations] = useState<AnimationClip[]>();
  const [mixer, setMixer] = useState<AnimationMixer>();
  const [scene, setScene] = useState<Scene>();

  // Side Effects

  useEffect(() => {
    new GLTFLoader().load("/hikikomori_chan.glb", ({ animations, scene }) => {
      setAnimations(animations);
      setMixer(new AnimationMixer(scene));
      setScene(scene);
    });
  }, []);

  useEffect(() => {
    if (!animations || !mixer || !scene) {
      return;
    }

    const animation = mixer.clipAction(
      animations.find((animation) => animation.name.toLowerCase() === state)!
    );

    animation.clampWhenFinished = true;
    animation.loop = THREE.LoopRepeat;
    animation.play();

    return () => {
      mixer.stopAllAction();
    };
  }, [animations, mixer, scene, state]);

  useFrame((_, delta) => {
    if (!mixer) {
      return;
    }

    mixer.update(delta);
  });

  // Render

  if (!animations || !scene) {
    return null;
  }

  return <primitive object={scene} />;
});
