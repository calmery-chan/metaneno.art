import CameraControls from "camera-controls";
import React, { useCallback, useEffect, useState } from "react";
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

  return camera;
};

const useKeyboard = () => {
  const [down, setDown] = useState(false);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [up, setUp] = useState(false);

  const handleKeydown = useCallback(({ code }: KeyboardEvent) => {
    if (code === "ArrowDown" || code === "KeyS") setDown(true);
    if (code === "ArrowLeft" || code === "KeyA") setLeft(true);
    if (code === "ArrowRight" || code === "KeyD") setRight(true);
    if (code === "ArrowUp" || code === "KeyW") setUp(true);
  }, []);

  const handleKeyup = useCallback(({ code }: KeyboardEvent) => {
    if (code === "ArrowDown" || code === "KeyS") setDown(false);
    if (code === "ArrowLeft" || code === "KeyA") setLeft(false);
    if (code === "ArrowRight" || code === "KeyD") setRight(false);
    if (code === "ArrowUp" || code === "KeyW") setUp(false);
  }, []);

  useEffect(() => {
    addEventListener("keydown", handleKeydown);
    addEventListener("keyup", handleKeyup);

    return () => {
      removeEventListener("keydown", handleKeydown);
      removeEventListener("keyup", handleKeyup);
    };
  }, []);

  return {
    down,
    left,
    right,
    up,
  };
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

  const camera = useCamera(scene?.position, cameraOffset);
  const { down, left, right, up } = useKeyboard();

  useFrame((_, delta) => {
    /* Animation */

    if (mixer) {
      mixer.update(delta);
    }

    if ((down || left || right || up) && scene) {
      const deltaTime = new Vector3(delta, delta, delta);
      const velocity = new Vector3(0, 0, 0);
      const speed = new Vector3(2, 2, 2);

      if (down) velocity.z += 1;
      if (left) velocity.x -= 1;
      if (right) velocity.x += 1;
      if (up) velocity.z -= 1;

      const { x, z } = velocity
        .normalize()
        .multiply(speed)
        .multiply(deltaTime)
        .applyQuaternion(camera.quaternion);

      scene.position.set(
        scene.position.x + x,
        scene.position.y,
        scene.position.z + z
      );
    }
  });

  // Render

  if (!animations || !scene) {
    return null;
  }

  return <primitive object={scene} />;
});
