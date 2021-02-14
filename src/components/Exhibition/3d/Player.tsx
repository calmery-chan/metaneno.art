import CameraControls from "camera-controls";
import React, { useEffect, useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";
import { AnimationClip, AnimationMixer, Box3, Scene, Vector3 } from "three";
import GLTFLoader from "three-gltf-loader";

CameraControls.install({ THREE });

const useCamera = (
  position: Vector3 = new Vector3(0, 0, 0),
  offset: Vector3 = new Vector3(0, 0, 0)
) => {
  const [cameraControls, setCameraControls] = useState<CameraControls>();
  const [clock, setClock] = useState<THREE.Clock>();
  const { camera, gl } = useThree();

  useEffect(() => {
    setClock(new THREE.Clock());
  }, []);

  useEffect(() => {
    const cameraControls = new CameraControls(camera, gl.domElement);

    cameraControls.maxDistance = 10;
    cameraControls.maxPolarAngle = 50 * (Math.PI / 180);
    cameraControls.minDistance = 3;
    cameraControls.minPolarAngle = 50 * (Math.PI / 180);
    cameraControls.polarAngle = 50 * (Math.PI / 180);

    setCameraControls(cameraControls);
  }, [camera, gl.domElement]);

  useFrame((_, delta) => {
    if (clock && cameraControls) {
      cameraControls.moveTo(
        position.x + offset.x,
        position.y + offset.y,
        position.z + offset.z,
        false
      );

      cameraControls.update(delta);
    }
  });
};

export const Exhibition3dPlayer = React.memo<{
  state: "running" | "standing" | "walking";
}>(({ state }) => {
  const [animations, setAnimations] = useState<AnimationClip[]>();
  const [mixer, setMixer] = useState<AnimationMixer>();
  const [scene, setScene] = useState<Scene>();
  const [cameraOffset, setCameraOffset] = useState<Vector3>();

  // Side Effects

  useEffect(() => {
    new GLTFLoader().load("/hikikomori_chan.glb", ({ animations, scene }) => {
      setAnimations(animations);
      setCameraOffset(
        new Vector3(
          0,
          new Box3().setFromObject(scene).getSize(new Vector3()).y / 2,
          0
        )
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

  useCamera(scene?.position, cameraOffset);

  useFrame((_, delta) => {
    /* Animation */

    if (mixer) {
      mixer.update(delta);
    }
  });

  // Render

  if (!animations || !scene) {
    return null;
  }

  return <primitive object={scene} />;
});
