import React, { useEffect, useState } from "react";
import { Scene, Vector3 } from "three";
import { UpdateResponse, useMultiplay } from "~/hooks/exhibition/useMultuplay";
import { AreaName } from "~/types/exhibition";
import { getGltf, rewriteMaterials } from "~/utils/exhibition";

type S = Scene & {
  accessory: "fried_egg" | "pancake" | null;
  hasAccessory: boolean;
  nextPosition: Vector3 | null;
  lerpAlpha: number;
  lerpTimer: number | null;
  ready: boolean;
  updatedAt: number;
};

const FRAME_COUNT = 10;
const ALPFA = 1 / FRAME_COUNT;

const applyPlayerTransform = async (scene: S, payload: UpdateResponse) => {
  // First Update

  if (!scene.ready) {
    scene.accessory = null;
    scene.hasAccessory = false;
    scene.nextPosition = null;
    scene.position.set(
      payload.position.x,
      payload.position.y,
      payload.position.z
    );
    scene.ready = true;
    scene.updatedAt = payload.updatedAt;
  }

  // Accessory

  if (scene.accessory !== payload.accessory) {
    if (scene.hasAccessory) {
      scene.children = scene.children.slice(0, scene.children.length - 1);
    }

    if (payload.accessory === "pancake" || payload.accessory === "fried_egg") {
      const { scene: accessory } = await getGltf(
        `/objects/accessories/${payload.accessory}.glb`
      );
      rewriteMaterials(accessory);
      accessory.position.set(
        scene.position.x || 0,
        (scene.position.y || 0) + 0.95,
        scene.position.z || 0
      );
      scene.children.push(accessory);
      scene.accessory = payload.accessory;
      scene.hasAccessory = true;
    }
  }

  // Update Position

  const currentPosition = new Vector3(
    payload.position.x,
    payload.position.y,
    payload.position.z
  );

  if (
    !scene.nextPosition ||
    (scene.nextPosition && !scene.nextPosition.equals(currentPosition))
  ) {
    if (scene.lerpTimer) {
      clearInterval(scene.lerpTimer);
    }

    const nextPosition = new Vector3(
      payload.position.x,
      payload.position.y,
      payload.position.z
    );

    scene.lerpAlpha = 0;
    scene.lerpTimer = window.setInterval(() => {
      if (scene.lerpAlpha >= 1) {
        scene.nextPosition = null;
      }

      const position = scene.position.lerp(nextPosition, scene.lerpAlpha);
      scene.lerpAlpha += ALPFA;

      if (scene.hasAccessory) {
        scene.children[scene.children.length - 1].position.set(
          position.x,
          position.y + 0.95,
          position.z
        );
      }
    }, (payload.updatedAt - scene.updatedAt) / FRAME_COUNT);
    scene.nextPosition = nextPosition;
    scene.updatedAt = payload.updatedAt;
  }

  //

  scene.rotation.set(0, payload.rotation.y, 0);
  scene.scale.set(0.5, 0.5, 0.5);

  return scene;
};

export const Exhibition3dPlayers = React.memo<{
  areaName: AreaName;
  players: ReturnType<typeof useMultiplay>["players"];
}>(({ areaName, players }) => {
  const [scenes, setScenes] = useState<Record<string, S>>({});

  // Update

  useEffect(() => {
    if (!players) {
      setScenes({});
      return;
    }

    // 同一エリアにいるプレイヤーのみ絞り込む
    const renderablePlayerIds = Object.keys(players).filter((playerId) => {
      const player = players[playerId];
      return player && player.area === areaName;
    });

    (async () => {
      setScenes(
        (
          await Promise.all(
            renderablePlayerIds.map(async (playerId) => {
              const payload = players[playerId]!;

              if (scenes[playerId]) {
                return Promise.resolve({
                  [playerId]: await applyPlayerTransform(
                    scenes[playerId],
                    payload
                  ),
                });
              } else {
                const { scene } = await getGltf("/objects/other_player.glb");

                return Promise.resolve({
                  [playerId]: await applyPlayerTransform(scene as S, payload),
                });
              }
            })
          )
        ).reduce((xs, ys) => ({ ...xs, ...ys }), {})
      );
    })();
  }, [areaName, players]);

  // Render

  return (
    <>
      {Object.values(scenes).map((scene) => (
        <primitive key={scene.id} object={scene} />
      ))}
    </>
  );
});
