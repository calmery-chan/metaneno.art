import CameraControls from "camera-controls";
import React, { useEffect, useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";
import { AnimationClip, AnimationMixer, Box3, Scene, Vector3 } from "three";
import GLTFLoader from "three-gltf-loader";

CameraControls.install({ THREE });

export const Exhibition3dPlayer = React.memo<{
  state: "running" | "standing" | "walking";
}>(({ state }) => {
  const [cameraControls, setCameraControls] = useState<CameraControls>();
  const [animations, setAnimations] = useState<AnimationClip[]>();
  const [mixer, setMixer] = useState<AnimationMixer>();
  const [scene, setScene] = useState<Scene>();
  const {
    gl: { domElement },
    camera,
  } = useThree();
  const [clock, setClock] = useState<THREE.Clock>();
  const [cameraCameraOffsetY, setCameraOffsetY] = useState(0);

  useEffect(() => {
    setClock(new THREE.Clock());
  }, []);

  // Side Effects

  useEffect(() => {
    new GLTFLoader().load("/hikikomori_chan.glb", ({ animations, scene }) => {
      setAnimations(animations);
      setCameraOffsetY(
        new Box3().setFromObject(scene).getSize(new Vector3()).y / 2
      );
      setMixer(new AnimationMixer(scene));
      setScene(scene);
    });
  }, []);

  useEffect(() => {
    if (!animations || !mixer) {
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
  }, [animations, mixer, state]);

  useEffect(() => {
    const cameraControls = new CameraControls(camera, domElement);

    cameraControls.maxDistance = 10;
    cameraControls.maxPolarAngle = 50 * (Math.PI / 180);
    cameraControls.minDistance = 3;
    cameraControls.minPolarAngle = 50 * (Math.PI / 180);
    cameraControls.polarAngle = 50 * (Math.PI / 180);

    setCameraControls(cameraControls);
  }, [camera, domElement]);

  useFrame((_, delta) => {
    /* Animation */

    if (mixer) {
      mixer.update(delta);
    }

    /* Camera */

    if (clock && cameraControls && scene) {
      cameraControls.moveTo(
        scene.position.x,
        scene.position.y + cameraCameraOffsetY,
        scene.position.z,
        false
      );
      cameraControls.update(delta);
    }
  });

  // Render

  if (!animations || !scene) {
    return null;
  }

  return <primitive object={scene} />;
});
