import CameraControls from "camera-controls";
import React, { useEffect, useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";
import { AnimationClip, AnimationMixer, Box3, Mesh, Scene, Vector3 } from "three";
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
  defaultPosition?: { x: number, y: number, z: number };
  defaultRotation?: { x: number, y: number, z: number };
  offsetPosition?: { x: number, y: number, z: number };
}>(({ defaultPosition = { x: 0, y: 0, z: 0 }, defaultRotation = { x: 0, y: 0, z: 0 }, offsetPosition = { x: 0, y: 0, z: 0 } }) => {
  const [animations, setAnimations] = useState<AnimationClip[]>();
  const [cameraOffset, setCameraOffset] = useState<Vector3>();
  const [mixer, setMixer] = useState<AnimationMixer>();
  const [state, setState] = useState<"running" | "standing" | "walking">(
    "standing"
  );
  const [scene, setScene] = useState<Scene>();
  const camera = useCamera(scene?.position, cameraOffset);
  const { down, left, right, up } = useKeyboard();
  const { scene: s } = useThree();
  const [meshes, setMeshes] = useState<Mesh[]>([]);
  const [obj, setObj] = useState<THREE.Object3D>();

  // Side Effects

  useEffect(() => {
    // @ts-ignore
    // const meshes = s.children.find(c => c.name === "COL")?.children[0].children.filter<Mesh>((m) => m instanceof Mesh);
    // setMeshes(meshes!);

    setTimeout(() => {
      setMeshes(s.children.find(c => c.name === "COL")!.children as Mesh[]);
      setObj(s.children.find(c => c.name === "COL")!);
    }, 3000)
  }, [s]);

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

    scene.position.set(
      defaultPosition.x + offsetPosition.x,
      defaultPosition.y + offsetPosition.y,
      defaultPosition.z + offsetPosition.z);
    
    scene.rotation.set(
      defaultRotation.x,
      defaultRotation.y,
      defaultRotation.z
    )
  }, [defaultPosition, defaultRotation, offsetPosition, scene]);

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

      const { x, y, z } = velocity
        .clone()
        .normalize()
        .multiply(new Vector3(6, 6, 6))
        .multiply(new Vector3(delta, delta, delta))
        .applyQuaternion(camera.quaternion);

      const nextPosition = new Vector3(
        scene.position.x + x + offsetPosition.x,
        offsetPosition.y,
        scene.position.z + z + offsetPosition.z
      );

      const result = meshes.some((mesh) => {
        const box3 = new THREE.Box3().setFromObject(mesh);
        return box3.containsPoint(nextPosition);
      })

      const rotation = scene.position.clone().sub(nextPosition).normalize();
      scene.rotation.y = Math.atan2(rotation.x, rotation.z);

      if (!result) {
      scene.position.set(nextPosition.x, nextPosition.y, nextPosition.z);
      }
    }
  });

  // Render

  if (!animations || !scene) {
    return null;
  }

  return <primitive object={scene} />;
});
