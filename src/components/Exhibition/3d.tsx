import React, { useCallback, useEffect, useState } from "react";
import { Exhibition3dBackground } from "./3d/Background";
import { Exhibition3dCanvas } from "./3d/Canvas";
import { Exhibition3dFog } from "./3d/Fog";
import { Exhibition3dLights } from "./3d/Lights";
import { Exhibition3dObjectsCharacters } from "./3d/Objects/Characters";
import { Exhibition3dObjectsDecorations } from "./3d/Objects/Decorations";
import { Exhibition3dObjectsWorks } from "./3d/Objects/Works";
import { Exhibition3dPlayer } from "./3d/Player";
import { Exhibition3dRenderer } from "./3d/Renderer";
import { Exhibition3dWork } from "./3d/Work";
import { objects } from "~/data/cloud.json";
import { useAudio } from "~/hooks/useAudio";
import { Area, GraphicsQuality } from "~/types/exhibition";
import { preload } from "~/utils/exhibition";
import { Sentry } from "~/utils/sentry";

export const Exhibition3d: React.FC<{
  area: Area;
  settings: { graphicsQuality: GraphicsQuality };
}> = ({ area, settings }) => {
  const [ready, setReady] = useState(false);
  const [workId, setWorkId] = useState<string | null>();
  const { audio } = useAudio(area.sound.url, { loop: true });

  // Events

  const handleCloseWork = useCallback(() => {
    setWorkId(null);
  }, []);

  // Side Effects

  useEffect(() => {
    setReady(false);

    console.log(area.objects);

    const objects = [
      ...area.objects.characters,
      ...area.objects.colliders,
      ...area.objects.decorations,
      ...area.objects.works,
    ];

    (async () => {
      try {
        await Promise.all(objects.map(({ url }) => url).map(preload));
      } catch (error) {
        Sentry.captureException(error);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (audio && ready) {
      audio.play();

      return () => {
        audio.stop();
      };
    }
  }, [audio, ready]);

  // Render

  if (!objects || !ready) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Exhibition3dCanvas>
        <Exhibition3dBackground {...area.background} />
        <Exhibition3dFog {...area.fog} />
        <Exhibition3dLights {...area.lights} />
        <Exhibition3dObjectsCharacters objects={area.objects.characters} />
        <Exhibition3dObjectsDecorations objects={area.objects.decorations} />
        <Exhibition3dObjectsWorks
          objects={area.objects.works}
          onClick={setWorkId}
        />
        <Exhibition3dPlayer {...area.player} operable={!workId} />
        <Exhibition3dRenderer graphicsQuality={settings.graphicsQuality} />
      </Exhibition3dCanvas>
      {workId && (
        <Exhibition3dWork
          graphicsQuality={settings.graphicsQuality}
          onClose={handleCloseWork}
        />
      )}
    </>
  );
};
