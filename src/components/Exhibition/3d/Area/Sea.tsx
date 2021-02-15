import React, { useEffect, useState } from "react";
import { useThree } from "react-three-fiber";
import * as Three from "three";
import { Color, MathUtils, PlaneGeometry, Vector2, Vector3 } from "three";
import { Exhibition3dCamera } from "../Camera";
import { Exhibition3dCanvas } from "../Canvas";
import { Exhibition3dLights } from "../Lights";
import { Exhibition3dCanvasObjects } from "../Objects";
import { Exhibition3dPlayer } from "../Player";
import { Exhibition3dRenderer } from "../Renderer";
import { Water } from "~/externals/Water2";
import { useObjects } from "~/hooks/exhibition/useObjects";
import { preload } from "~/utils/exhibition";
import { Sentry } from "~/utils/sentry";

const Fog = React.memo(() => {
  const { scene } = useThree();

  useEffect(() => {
    const color = new Color(0x2cddee);

    scene.background = color;
    scene.fog = new Three.Fog(color, 1.5, 20);
  }, [scene]);

  return null;
});

const Sea = React.memo(() => {
  const { scene } = useThree();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const water: any = new Water(new PlaneGeometry(100, 100), {
      color: "#17A0B4",
      flowDirection: new Vector2(1, 1),
      scale: 10,
      textureHeight: 512,
      textureWidth: 512,
    });

    water.position.y = 1.22;
    water.rotation.x = MathUtils.degToRad(-90);
    scene.add(water);

    return () => {
      scene.remove(water);
    };
  }, [scene]);

  return null;
});

export const Exhibition3dAreaSea: React.FC = () => {
  const [ready, setReady] = useState(false);
  const { objects } = useObjects("sea");

  // Side Effects

  useEffect(() => {
    if (!objects) return;

    (async () => {
      try {
        await Promise.all(objects.map(({ url }) => url).map(preload));
        setReady(true);
      } catch (error) {
        Sentry.captureException(error);
      }
    })();
  }, [objects]);

  // Render

  if (!objects || !ready) {
    return <div>Loading</div>;
  }

  return (
    <Exhibition3dCanvas>
      <Fog />
      <Sea />
      <Exhibition3dCamera />
      <Exhibition3dCanvasObjects objects={objects} />
      <Exhibition3dLights />
      <Exhibition3dPlayer offset={new Vector3(0, 1.25, 0)} />
      <Exhibition3dRenderer />
    </Exhibition3dCanvas>
  );
};
