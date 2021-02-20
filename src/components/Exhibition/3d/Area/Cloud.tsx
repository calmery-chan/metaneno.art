import React, { useEffect, useState } from "react";
import { useThree } from "react-three-fiber";
import * as Three from "three";
import { Color, Vector3 } from "three";
import { Exhibition3dCanvas } from "../Canvas";
import { Exhibition3dCanvasObjects } from "../Objects";
import { Exhibition3dPlayer } from "../Player";
import { Exhibition3dRenderer } from "../Renderer";
import { useObjects } from "~/hooks/exhibition/useObjects";
import { preload } from "~/utils/exhibition";
import { Sentry } from "~/utils/sentry";
import { objects } from "~/data/cloud.json";

const Fog = React.memo(() => {
  const { scene } = useThree();

  useEffect(() => {
    const color = new Color(0xffcfcb);

    scene.background = color;
    scene.fog = new Three.Fog(color, 1.5, 20);
  }, [scene]);

  return null;
});

export const Exhibition3dAreaCloud: React.FC = () => {
  // const [ready, setReady] = useState(false);
  // const { objects } = useObjects("meadow");

  // // Side Effects

  // useEffect(() => {
  //   if (!objects) return;

  //   (async () => {
  //     try {
  //       await Promise.all(objects.map(({ url }) => url).map(preload));
  //       setReady(true);
  //     } catch (error) {
  //       Sentry.captureException(error);
  //     }
  //   })();
  // }, [objects]);

  // // Render

  // if (!objects || !ready) {
  //   return <div>Loading</div>;
  // }

  return (
    <Exhibition3dCanvas>
      <Fog />
      <Exhibition3dCanvasObjects objects={objects} />
      <directionalLight position={new Vector3(0, 10, 0)} />
      <Exhibition3dPlayer offset={new Vector3(0, 5.79, 0)} />
      <Exhibition3dRenderer />
    </Exhibition3dCanvas>
  );
};
