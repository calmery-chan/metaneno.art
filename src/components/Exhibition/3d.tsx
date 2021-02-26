import { css, keyframes } from "@emotion/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Exhibition3dBackground } from "./3d/Background";
import { Exhibition3dCanvas } from "./3d/Canvas";
import { Exhibition3dCharacter } from "./3d/Character";
import { defaultControllerKeys, Exhibition3dController } from "./3d/Controller";
import { Exhibition3dFog } from "./3d/Fog";
import { Exhibition3dItem } from "./3d/Item";
import { Exhibition3dLights } from "./3d/Lights";
import {
  Exhibition3dLoading,
  preload as preloadLoadingImages,
} from "./3d/Loading";
import { Exhibition3dObjectsCharacters } from "./3d/Objects/Characters";
import { Exhibition3dObjectsComponents } from "./3d/Objects/Components";
import { Exhibition3dObjectsDecorations } from "./3d/Objects/Decorations";
import { Exhibition3dObjectsItems } from "./3d/Objects/Items";
import { Exhibition3dObjectsWorks } from "./3d/Objects/Works";
import { Exhibition3dPlayer } from "./3d/Player";
import { Exhibition3dPlayers } from "./3d/Players";
import { Exhibition3dRenderer } from "./3d/Renderer";
import { Exhibition3dWork } from "./3d/Work";
import cloud from "~/data/cloud";
import meadow from "~/data/meadow";
import sea from "~/data/sea";
import { useMultiplay } from "~/hooks/exhibition/useMultuplay";
import { useAudio } from "~/hooks/useAudio";
import { Mixin } from "~/styles/mixin";
import {
  AreaCharacterObject,
  AreaName,
  AreaWorkObject,
  GraphicsQuality,
} from "~/types/exhibition";
import { preload } from "~/utils/exhibition";
import * as GA from "~/utils/exhibition/google-analytics";
import * as state from "~/utils/exhibition/state";
import { useOkusuriLand } from "~/utils/okusuri.land";
import { Sentry } from "~/utils/sentry";

const fadeOutKeyframes = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

export const fadeOut = css`
  animation: ${fadeOutKeyframes} 4.8s ease forwards;
`;

export const Exhibition3d: React.FC<{
  creamsoda: "flower" | "water";
  defaultArea: AreaName | null;
  examine: ReturnType<typeof useOkusuriLand>["examine"];
  multiplay: ReturnType<typeof useMultiplay>;
  onComplete: () => void;
  settings: { graphicsQuality: GraphicsQuality };
}> = ({
  creamsoda,
  defaultArea: _defaultArea,
  examine,
  multiplay,
  onComplete,
  settings,
}) => {
  const defaultArea =
    _defaultArea || (creamsoda === "flower" ? "meadow" : "sea");

  const [currentAreaName, setCurrentAreaName] = useState<AreaName>(defaultArea);
  const [firstUpdate, setFirstUpdate] = useState(true);
  const area = useMemo(() => {
    switch (currentAreaName) {
      case "cloud":
        return cloud(firstUpdate);

      case "meadow":
        return meadow(firstUpdate);

      case "sea":
        return sea(firstUpdate);
    }
  }, [currentAreaName, firstUpdate]);
  const [completed, setCompleted] = useState(false);

  const { audio } = useAudio(area.sound.url, { loop: true });
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
  const [loading, setLoading] = useState<{
    previous: AreaName;
    next: AreaName;
  } | null>({
    previous: defaultArea,
    next: defaultArea,
  });

  useEffect(() => {
    const { accessory } = state.get();

    if (accessory === "fried_egg" || accessory === "pancake") {
      setPlayerAccessory(accessory);
    }
  }, []);

  useEffect(() => {
    state.set({ area: currentAreaName });

    switch (currentAreaName) {
      case "cloud":
        examine("METANENO_ART_NUMBER_OF_TRIPS_TO_CLOUD", 1);
        GA.tripTo("cloud");
        return;

      case "meadow":
        examine("METANENO_ART_NUMBER_OF_TRIPS_TO_MEADOW", 1);
        GA.tripTo("meadow");
        return;

      case "sea":
        examine("METANENO_ART_NUMBER_OF_TRIPS_TO_SEA", 1);
        GA.tripTo("sea");
        return;
    }
  }, [currentAreaName]);

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

  const handleChangeArea = useCallback(
    (area: AreaName) => {
      // 2 回呼ばれることがある...
      if (currentAreaName !== area) {
        setLoading({
          previous: currentAreaName,
          next: area,
        });

        if (audio) {
          audio.fade(
            audio.volume(),
            0,
            Mixin.ANIMATION_DURATION.milliseconds * 2
          );
        }
      }

      setTimeout(() => {
        setCurrentAreaName(area);

        if (audio) {
          audio.stop();
          audio.unload();
        }
      }, Mixin.ANIMATION_DURATION.milliseconds * 2);
    },
    [audio, currentAreaName]
  );

  //

  const handleAction = useCallback(
    (actions: string[]) => {
      actions.forEach((action) => {
        switch (action) {
          case "open_okusuri_land":
            window.open("https://okusuri.land", "_blank");
            GA.click("pc_connected_to_okusuri.land");
            return;

          case "talk_with_noneme":
            GA.talk("noneme");
            examine("METANENO_ART_NUMBER_OF_TIMES_TALKED_TO_NONEME", 1);
            return;

          case "talk_with_neminko":
            GA.talk("neminko");
            examine("METANENO_ART_NUMBER_OF_TIMES_TALKED_TO_NEMINKO", 1);
            return;

          case "talk_with_hitsugi":
            GA.talk("hitsugi");
            setFirstUpdate(false);
            examine("METANENO_ART_NUMBER_OF_TIMES_TALKED_TO_HITSUGI", 1);
            return;

          case "talk_with_calmery_chan":
            GA.talk("calmery_chan");
            return;

          case "talk_with_maid":
            GA.talk("maid");
            return;

          case "pancake":
            examine("METANENO_ART_PUT_PANCAKE", 1);
            GA.wear("pancake");
            state.set({ accessory: "pancake" });
            setPlayerAccessory("pancake");
            return;

          case "fried_egg":
            examine("METANENO_ART_PUT_FRIED_EGG", 1);
            GA.wear("fried_egg");
            state.set({ accessory: "fried_egg" });
            setPlayerAccessory("fried_egg");
            return;

          case "move_to_cloud":
            handleChangeArea("cloud");
            return;

          case "move_to_meadow":
            handleChangeArea("meadow");
            return;

          case "move_to_sea":
            handleChangeArea("sea");
            return;
        }
      });
    },
    [examine, handleChangeArea]
  );

  const handleChangeCharacterAnimations = useCallback(
    (animations: string[][]) => {
      setCharacterAnimations(animations);
    },
    []
  );

  const handleOnComplete = useCallback(() => {
    setCompleted(true);

    if (audio) {
      audio.fade(audio.volume(), 0, 4800);
    }

    setTimeout(onComplete, 4800);
  }, [audio, onComplete]);

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
      { url: "/objects/other_player.glb" },
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
        await preloadLoadingImages();
      } catch (error) {
        Sentry.captureException(error);
      } finally {
        setReady(true);

        setTimeout(() => {
          setLoading(null);
        }, 3200);
      }
    })();
  }, [area]);

  useEffect(() => {
    if (audio) {
      audio.play();
    }
  }, [audio]);

  // Render

  return (
    <div className="w-full h-full bg-black">
      {ready && (
        <div className="w-full h-full" css={completed ? fadeOut : undefined}>
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
            <Exhibition3dObjectsComponents
              components={area.objects.components}
            />
            <Exhibition3dObjectsDecorations
              objects={area.objects.decorations}
            />
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
              areaName={currentAreaName}
              areas={area.areas}
              accessory={playerAccessory}
              completed={completed}
              onComplete={handleOnComplete}
              onChangeArea={handleChangeArea}
              onUpdate={multiplay.update}
              collider={area.collider}
              operable={!workId}
            />
            <Exhibition3dPlayers
              areaName={currentAreaName}
              players={multiplay.players}
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
        </div>
      )}
      <Exhibition3dLoading loading={loading} />
    </div>
  );
};
