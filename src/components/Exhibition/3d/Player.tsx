import CameraControls from "camera-controls";
import React, { useCallback, useEffect, useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";
import {
  AnimationClip,
  AnimationMixer,
  Box3,
  Mesh,
  MeshStandardMaterial,
  Scene,
  Vector3,
} from "three";
import { ControllerKeys } from "./Controller";
import { Area, AreaName, AreaObject } from "~/types/exhibition";
import { getGltf, rewriteMaterials } from "~/utils/exhibition";
import { useMultiplay } from "~/hooks/exhibition/useMultuplay";

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

export const Exhibition3dPlayer = React.memo<
  Area["player"] &
    ControllerKeys & {
      areaName: AreaName;
      areas: Area["areas"];
      accessory: "fried_egg" | "pancake" | null;
      completed: boolean;
      collider: AreaObject;
      onComplete: () => void;
      onChangeArea: (area: AreaName) => void;
      onUpdate: ReturnType<typeof useMultiplay>["update"]
      operable: boolean;
    }
>(
  ({
    accessory: _accessory,
    areas,
    areaName,
    completed,
    down,
    collider,
    defaultPosition,
    defaultRotation,
    defaultScale,
    left,
    right,
    onComplete,
    onChangeArea,
    onUpdate,
    operable,
    up,
    url,
  }) => {
    const [animations, setAnimations] = useState<AnimationClip[]>();
    const [cameraOffset, setCameraOffset] = useState<Vector3>();
    const [colliders, setColliders] = useState<Mesh[]>();
    const [mixer, setMixer] = useState<AnimationMixer>();
    const [state, setState] = useState<"running" | "standing" | "walking">(
      "standing"
    );
    const [accessory, setAccessory] = useState<Scene | null>(null);
    const [scene, setScene] = useState<Scene>();
    const camera = useCamera(scene?.position, cameraOffset);

    const handleUpdate = useCallback(() => {
      if (scene) {
        const isIdling = left || right || up || down;

        onUpdate({
          area: areaName,
          position: scene.position,
          rotation: {
            y: scene.rotation.y
          },
          state: isIdling ? "idle" : "run"
        })
      }
    }, [areaName, scene]);

    // Side Effects

    useEffect(() => {
      if (!_accessory) {
        setAccessory(null);
        return;
      }

      (async () => {
        const { scene: accessory } = await getGltf(
          `/objects/accessories/${_accessory}.glb`
        );

        rewriteMaterials(accessory);

        accessory.position.set(
          scene?.position.x || 0,
          (scene?.position.y || 0) + 0.95,
          scene?.position.z || 0
        );

        setAccessory(accessory);
      })();
    }, [_accessory]);

    useEffect(() => {
      (async () => {
        const { scene } = await getGltf(collider.url);

        scene.children.map((cube) => {
          ((cube as Mesh).material as MeshStandardMaterial).opacity = 0;
          ((cube as Mesh).material as MeshStandardMaterial).transparent = true;
        });

        setColliders(scene.children as Mesh[]);
      })();
    }, [collider]);

    useEffect(() => {
      (async () => {
        const { animations, scene } = await getGltf(url);

        scene.scale.set(0.5, 0.5, 0.5);

        setAnimations(animations);
        setCameraOffset(
          new Vector3(
            0,
            new Box3().setFromObject(scene).getSize(new Vector3()).y / 4 + 0.25,
            0
          )
        );
        setMixer(new AnimationMixer(scene));
        setScene(scene);
      })();
    }, []);

    useEffect(() => {
      if (!scene) {
        return;
      }

      scene.position.set(
        defaultPosition.x,
        defaultPosition.y,
        defaultPosition.z
      );
      scene.rotation.set(
        defaultRotation.x,
        defaultRotation.y,
        defaultRotation.z
      );
      scene.scale.set(defaultScale.x, defaultScale.y, defaultScale.z);
    }, [defaultPosition, defaultRotation, scene]);

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
      handleUpdate();

      if (!operable) {
        return;
      }

      if (down || left || right || up) {
        setState("running");
        return;
      }

      setState("standing");
    }, [down, left, operable, handleUpdate, right, up]);

    useFrame((_, delta) => {
      if (mixer) {
        mixer.update(delta);
      }

      if (!operable || completed) {
        return;
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
          scene.position.x + x,
          defaultPosition.y,
          scene.position.z + z
        );

        let isMoveable = true;

        if (colliders) {
          isMoveable = !colliders.some((mesh) =>
            new THREE.Box3().setFromObject(mesh).containsPoint(nextPosition)
          );
        }

        const rotation = scene.position.clone().sub(nextPosition).normalize();
        scene.rotation.y = Math.atan2(rotation.x, rotation.z);

        if (isMoveable) {
          scene.position.set(nextPosition.x, nextPosition.y, nextPosition.z);

          if (accessory) {
            accessory.position.set(
              nextPosition.x,
              nextPosition.y + 0.95,
              nextPosition.z
            );
            accessory.rotation.y = Math.atan2(rotation.x, rotation.z);
          }
        }

        // 他のエリアに移動可能かチェックする

        if (areas?.cloud) {
          const { maximumX, maximumZ, minimumX, minimumZ } = areas.cloud;

          if (
            minimumX <= nextPosition.x &&
            nextPosition.x <= maximumX &&
            minimumZ <= nextPosition.z &&
            nextPosition.z <= maximumZ
          ) {
            onChangeArea("cloud");
          }
        } else if (areas?.meadow) {
          const { maximumX, maximumZ, minimumX, minimumZ } = areas.meadow;

          if (
            minimumX <= nextPosition.x &&
            nextPosition.x <= maximumX &&
            minimumZ <= nextPosition.z &&
            nextPosition.z <= maximumZ
          ) {
            onChangeArea("meadow");
          }
        } else if (areas?.sea) {
          const { maximumX, maximumZ, minimumX, minimumZ } = areas.sea;

          if (
            minimumX <= nextPosition.x &&
            nextPosition.x <= maximumX &&
            minimumZ <= nextPosition.z &&
            nextPosition.z <= maximumZ
          ) {
            onChangeArea("sea");
          }
        }

        if (areaName === "cloud") {
          if (
            -12.5 <= nextPosition.x &&
            nextPosition.x <= -7.5 &&
            -22 <= nextPosition.z &&
            nextPosition.z <= -18
          ) {
            onComplete();
          }
        }
      }
    });

    // Render

    if (!animations || !scene) {
      return null;
    }

    return (
      <>
        <primitive object={scene} />
        {accessory && <primitive object={accessory} />}
      </>
    );
  }
);
