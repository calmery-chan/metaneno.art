import React, { useEffect, useState } from "react";
import { useThree } from "react-three-fiber";
import * as Three from "three";
import { Color, Vector3 } from "three";
import { Exhibition3dCanvas } from "../Canvas";
import { Exhibition3dCanvasObjects } from "../Objects";
import { Exhibition3dPlayer } from "../Player";
import { Exhibition3dRenderer } from "../Renderer";
import { objects } from "~/data/cloud.json";
import { GraphicsQuality } from "~/types/exhibition";
import { preload } from "~/utils/exhibition";
import { Sentry } from "~/utils/sentry";

// Components

const Background = React.memo(() => {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = new Color(0xffcfcb);
  }, [scene]);

  return null;
});

const Fog = React.memo(() => {
  const { scene } = useThree();

  useEffect(() => {
    scene.fog = new Three.Fog(new Color(0xffcfcb), 1.5, 20);
  }, [scene]);

  return null;
});

const Lights = React.memo(() => (
  <>
    <directionalLight
      color={new Color(0xfd4d56)}
      position={new Vector3(0, 10, 0)}
    />
    <pointLight position={new Vector3(0, 10, 0)} />
  </>
));

// Main

export const Exhibition3dAreaCloud: React.FC<{ quality: GraphicsQuality }> = ({
  quality,
}) => {
  const [ready, setReady] = useState(false);
  // const { objects } = useObjects("meadow");

  // Side Effects

  useEffect(() => {
    if (!objects) return;

    (async () => {
      try {
        await Promise.all(objects.map(({ url }) => url).map(preload));
      } catch (error) {
        Sentry.captureException(error);
      } finally {
        setReady(true);
      }
    })();
  }, [objects]);

  // Render

  if (!objects || !ready) {
    return <div>Loading</div>;
  }

  return (
    <Exhibition3dCanvas>
      <Background />
      <Fog />
      <Lights />
      <Exhibition3dCanvasObjects objects={objects} />
      <Exhibition3dPlayer offset={new Vector3(0, 5.7, 0)} />
      <Exhibition3dRenderer quality={quality} />
    </Exhibition3dCanvas>
  );
};
