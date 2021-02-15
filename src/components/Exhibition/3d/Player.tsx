import CameraControls from "camera-controls";
import React, { useEffect, useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";
import { AnimationClip, AnimationMixer, Box3, Scene, Vector3 } from "three";
import GLTFLoader from "three-gltf-loader";
import { useKeyboard } from "~/hooks/exhibition/useKeyboard";

CameraControls.install({ THREE });

const useCamera = (
  position: Vector3 = new Vector3(0, 0, 0),
  offset: Vector3 = new Vector3(0, 0, 0)
) => {
  const [cameraControls, setCameraControls] = useState<CameraControls>();
  const { camera, gl } = useThree();

  useEffect(() => {
    gl.outputEncoding = THREE.sRGBEncoding;
    gl.shadowMap.autoUpdate = false;
    gl.setPixelRatio(window.devicePixelRatio);
  }, [gl]);

  useEffect(() => {
    const cameraControls = new CameraControls(camera, gl.domElement);

    cameraControls.distance = 3;
    cameraControls.maxDistance = 4;
    cameraControls.maxPolarAngle = 50 * (Math.PI / 180);
    cameraControls.minDistance = 2;
    cameraControls.minPolarAngle = 50 * (Math.PI / 180);
    cameraControls.polarAngle = 50 * (Math.PI / 180);

    setCameraControls(cameraControls);
  }, [camera, gl.domElement]);

  useFrame((_, delta) => {
    if (cameraControls) {
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

export const Exhibition3dPlayer = React.memo<{
  offset?: Vector3;
}>(({ offset = new Vector3(0, 0, 0) }) => {
  const [animations, setAnimations] = useState<AnimationClip[]>();
  const [cameraOffset, setCameraOffset] = useState<Vector3>();
  const [mixer, setMixer] = useState<AnimationMixer>();
  const [state, setState] = useState<"running" | "standing" | "walking">(
    "standing"
  );
  const [scene, setScene] = useState<Scene>();
  const camera = useCamera(scene?.position, cameraOffset);
  const { down, left, right, up } = useKeyboard();

  // Side Effects

  useEffect(() => {
    new GLTFLoader().load("/player.glb", ({ animations, scene }) => {
      scene.scale.set(0.5, 0.5, 0.5);

      setAnimations(animations);
      setCameraOffset(
        new Vector3(
          0,
          new Box3().setFromObject(scene).getSize(new Vector3()).y / 4,
          0
        )
      );
      setMixer(new AnimationMixer(scene));
      setScene(scene);
    });
  }, []);

  useEffect(() => {
    if (!scene) {
      return;
    }

    scene.position.set(offset.x, offset.y, offset.z);
  }, [offset, scene]);

  useEffect(() => {
    if (!animations || !mixer) {
      return;
    }

    const animation = mixer.clipAction(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
    if (down || left || right || up) {
      setState("running");
      return;
    }

    setState("standing");
  }, [down, left, right, up]);

  useFrame((_, delta) => {
    if (mixer) {
      mixer.update(delta);
    }

    if ((down || left || right || up) && scene) {
      const velocity = new Vector3(0, 0, 0);

      if (down) {
        velocity.z += 1;
      }

      if (left) {
        velocity.x -= 1;
      }

      if (right) {
        velocity.x += 1;
      }

      if (up) {
        velocity.z -= 1;
      }

      const { x, z } = velocity
        .clone()
        .normalize()
        .multiply(new Vector3(6, 6, 6))
        .multiply(new Vector3(delta, delta, delta))
        .applyQuaternion(camera.quaternion);

      const nextPosition = new Vector3(
        scene.position.x + x + offset.x,
        offset.y,
        scene.position.z + z + offset.z
      );

      const rotation = scene.position.clone().sub(nextPosition).normalize();
      scene.rotation.y = Math.atan2(rotation.x, rotation.z);

      scene.position.set(nextPosition.x, nextPosition.y, nextPosition.z);
    }
  });

  // Render

  if (!animations || !scene) {
    return null;
  }

  return <primitive object={scene} />;
});
