import React, { useEffect, useState } from "react";
import { useThree } from "react-three-fiber";
import * as Three from "three";
import { Color, Vector3 } from "three";
import { Exhibition3dCanvas } from "../Canvas";
import { Exhibition3dCanvasObjects } from "../Objects";
import { Exhibition3dPlayer } from "../Player";
import { Exhibition3dRenderer } from "../Renderer";
import cloud from "./cloud.json";
import { objects } from "~/data/cloud.json";
import { useAudio } from "~/hooks/useAudio";
import { GraphicsQuality } from "~/types/exhibition";
import { preload } from "~/utils/exhibition";
import { Sentry } from "~/utils/sentry";
import { Exhibition3dBackground } from "../Background";
import { Exhibition3dFog } from "../Fog";
import { Exhibition3dLights } from "../Lights";

// Main

export const Exhibition3dAreaCloud: React.FC<{ quality: GraphicsQuality }> = ({
  quality,
}) => {
  const [ready, setReady] = useState(false);
  const { audio } = useAudio(cloud.sound.url, { loop: true });
  // const { objects } = useObjects("meadow");

  // Side Effects

  useEffect(() => {
    if (audio && objects && ready) {
      audio.play();

      return () => {
        audio.stop();
      };
    }
  }, [audio, objects, ready]);

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
      <Exhibition3dBackground {...cloud.background} />
      <Exhibition3dFog {...cloud.fog} />
      <Exhibition3dLights {...cloud.lights} />
      <Exhibition3dPlayer {...cloud.player} />
      <Exhibition3dRenderer quality={quality} />

      <Exhibition3dCanvasObjects objects={objects} />
    </Exhibition3dCanvas>
  );
};
