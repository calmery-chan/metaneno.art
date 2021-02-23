import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Exhibition3dBackground } from "./3d/Background";
import { Exhibition3dCanvas } from "./3d/Canvas";
import { Exhibition3dCharacter } from "./3d/Character";
import { defaultControllerKeys, Exhibition3dController } from "./3d/Controller";
import { Exhibition3dFog } from "./3d/Fog";
import { Exhibition3dItem } from "./3d/Item";
import { Exhibition3dLights } from "./3d/Lights";
import { Exhibition3dObjectsCharacters } from "./3d/Objects/Characters";
import { Exhibition3dObjectsComponents } from "./3d/Objects/Components";
import { Exhibition3dObjectsDecorations } from "./3d/Objects/Decorations";
import { Exhibition3dObjectsItems } from "./3d/Objects/Items";
import { Exhibition3dObjectsWorks } from "./3d/Objects/Works";
import { Exhibition3dPlayer } from "./3d/Player";
import { Exhibition3dRenderer } from "./3d/Renderer";
import { Exhibition3dWork } from "./3d/Work";
import { useAudio } from "~/hooks/useAudio";
import {
  Area,
  AreaCharacterObject,
  AreaName,
  AreaWorkObject,
  GraphicsQuality,
} from "~/types/exhibition";
import { preload } from "~/utils/exhibition";
import { Sentry } from "~/utils/sentry";

export const Exhibition3d: React.FC<{
  area: Area;
  onChangeArea: (area: AreaName) => void;
  settings: { graphicsQuality: GraphicsQuality };
}> = ({ area, onChangeArea, settings }) => {
  useAudio(area.sound.url, { autoplay: true });
  const [keys, setKeys] = useState(defaultControllerKeys);
  const [characterId, setCharacterId] = useState<string | null>(null);
  const [characterAnimations, setCharacterAnimations] = useState<
    string[][] | null
  >(null);
  const [itemId, setItemId] = useState<string | null>(null);
  const [playerAccessory, setPlayerAccessory] = useState<
    "fried_egg" | "pancake" | null
  >(null);
  const [ready, setReady] = useState(false);
  const [workId, setWorkId] = useState<string | null>(null);

  // Find

  const character = useMemo<AreaCharacterObject | null>(() => {
    if (!characterId) {
      return null;
    }

    return area.objects.characters.find(({ id }) => id === characterId)!;
  }, [characterId]);

  const work = useMemo<AreaWorkObject | null>(() => {
    if (!workId) {
      return null;
    }

    return area.objects.works.find(({ id }) => id === workId)!;
  }, [workId]);

  // Events

  const handleCloseCharacter = useCallback(() => {
    setCharacterId(null);
  }, []);

  const handleCloseItem = useCallback(() => {
    setItemId(null);
  }, []);

  const handleCloseWork = useCallback(() => {
    setWorkId(null);
  }, []);

  //

  const handleAction = useCallback(
    (actions: string[]) => {
      actions.forEach((action) => {
        switch (action) {
          case "pancake":
            setPlayerAccessory("pancake");
            return;

          case "fried_egg":
            setPlayerAccessory("fried_egg");
            return;

          case "move_to_cloud":
            onChangeArea("cloud");
            return;

          case "move_to_meadow":
            onChangeArea("meadow");
            return;

          case "move_to_sea":
            onChangeArea("sea");
            return;
        }
      });
    },
    [onChangeArea]
  );

  const handleChangeCharacterAnimations = useCallback(
    (animations: string[][]) => {
      setCharacterAnimations(animations);
    },
    []
  );

  // Side Effects

  useEffect(() => {
    setReady(false);
    setCharacterId(null);
    setCharacterAnimations(null);
    setItemId(null);
    setWorkId(null);

    const urls = [
      "/exhibition/3d/bubble/background.png",
      "/exhibition/3d/bubble/choice.png",
      "/exhibition/3d/bubble/name.png",
    ];

    const objects = [
      { url: area.collider.url },
      { url: area.player.url },
      ...area.objects.characters,
      ...area.objects.decorations,
      ...area.objects.items,
      ...area.objects.works,
    ];

    (async () => {
      try {
        await Promise.all(objects.map(({ url }) => url).map(preload));
        await Promise.all(urls.map((url) => fetch(url)));
      } catch (error) {
        Sentry.captureException(error);
      } finally {
        setReady(true);
      }
    })();
  }, [area]);

  // Render

  if (!ready) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Exhibition3dCanvas>
        <Exhibition3dBackground {...area.background} />
        <Exhibition3dFog {...area.fog} />
        <Exhibition3dLights {...area.lights} />
        <Exhibition3dObjectsCharacters
          animations={
            characterId && characterAnimations
              ? {
                  [characterId]: characterAnimations,
                }
              : {}
          }
          objects={area.objects.characters}
          onClick={setCharacterId}
        />
        <Exhibition3dObjectsComponents components={area.objects.components} />
        <Exhibition3dObjectsDecorations objects={area.objects.decorations} />
        <Exhibition3dObjectsItems
          objects={area.objects.items}
          onClick={setItemId}
        />
        <Exhibition3dObjectsWorks
          objects={area.objects.works}
          onClick={setWorkId}
        />
        <Exhibition3dPlayer
          {...area.player}
          {...keys}
          areas={area.areas}
          accessory={playerAccessory}
          onChangeArea={onChangeArea}
          collider={area.collider}
          operable={!workId}
        />
        <Exhibition3dRenderer graphicsQuality={settings.graphicsQuality} />
      </Exhibition3dCanvas>
      {character && (
        <Exhibition3dCharacter
          onChangeActions={handleAction}
          onChangeAnimations={handleChangeCharacterAnimations}
          onClose={handleCloseCharacter}
          scenarios={character.scenarios}
        />
      )}
      {itemId && <Exhibition3dItem id={itemId} onClose={handleCloseItem} />}
      {work && (
        <Exhibition3dWork
          {...work}
          graphicsQuality={settings.graphicsQuality}
          onClose={handleCloseWork}
        />
      )}
      <Exhibition3dController onChange={setKeys} />
    </>
  );
};
