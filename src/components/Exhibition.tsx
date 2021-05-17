import classnames from "classnames";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { isMobileSafari } from "react-device-detect";
import { ExhibitionTitleScreen } from "./Exhibition/TitleScreen";
import { Exhibition2dMorning } from "~/components/Exhibition/2d/Morning";
import { Exhibition2dNight } from "~/components/Exhibition/2d/Night";
import { Exhibition3d } from "~/components/Exhibition/3d";
import { ExhibitionMenu } from "~/components/Exhibition/Menu";
import { ExhibitionOkusuriLandNotifications } from "~/components/Exhibition/OkusuriLandNotifications";
import { useMultiplay } from "~/hooks/exhibition/useMultuplay";
import { useScreenOrientation } from "~/hooks/exhibition/useScreenOrientation";
import { AreaName, GraphicsQuality } from "~/types/exhibition";
import { ping } from "~/utils/exhibition";
import * as GA from "~/utils/exhibition/google-analytics";
import * as state from "~/utils/exhibition/state";
import { useOkusuriLand } from "~/utils/okusuri.land";
import { Disease } from "~/utils/okusuri.land/types";
import * as share from "~/utils/share";

export const Exhibition: React.FC = () => {
  const { orientation } = useScreenOrientation();
  const multiplay = useMultiplay();
  const [creamsoda, setCreamsoda] = useState<"flower" | "water" | null>(null);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [location, setLocation] = useState<"2d-morning" | "2d-night" | "3d">(
    "2d-night"
  );
  const [graphicsQuality, setGraphicsQuality] = useState<GraphicsQuality>(
    "high"
  );
  const [ready, setReady] = useState(false);
  const [defaultArea, setDefaultArea] = useState<AreaName | null>(null);

  useEffect(() => {
    ping();

    if (!state.exists()) {
      return;
    }

    const { area, creamsoda, location } = state.get();

    if (creamsoda === "flower" || creamsoda === "water") {
      setCreamsoda(creamsoda);
    }

    if (
      location === "2d-morning" ||
      location === "2d-night" ||
      location === "3d"
    ) {
      setLocation(location);
    }

    if (area === "cloud" || area === "meadow" || area === "sea") {
      setDefaultArea(area);
    }

    setReady(true);
  }, []);

  // Events

  const handleChangeQuality = useCallback(
    (graphicsQuality: GraphicsQuality) => {
      setGraphicsQuality(graphicsQuality);
    },
    []
  );

  const handleComplete2dNight = useCallback((creamsoda: "flower" | "water") => {
    GA.drink(creamsoda);
    state.set({ creamsoda });
    okusuriLand.examine("METANENO_ART_NUMBER_OF_TRIPS", 1);
    const minTime = new Date("2021/02/27 21:00:00").getTime();
    const currentTime = new Date().getTime();
    const maxTime = new Date("2021/02/28 23:59:59").getTime();
    if (minTime <= currentTime && currentTime <= maxTime) {
      okusuriLand.examine("METANENO_ART_EARLY_ADOPTER", 1);
    }
    setCreamsoda(creamsoda);
    setLocation("3d");
  }, []);

  const handleComplete3d = useCallback(() => {
    setLocation("2d-morning");
  }, []);

  const handleResetDisease = useCallback(() => setDiseases([]), []);

  // Okusuri.land

  const okusuriLand = useOkusuriLand(setDiseases);

  useEffect(() => {
    (async () => {
      if (share.get()) {
        await okusuriLand.examine("METANENO_ART_NUMBER_OF_TIMES_SHARED", 1);
        share.remove();
      }
    })();
  }, []);

  useEffect(() => {
    state.set({ location });

    if (location === "3d") {
      GA.trip();
    } else if (multiplay.players) {
      multiplay.leave();
    }
  }, [location]);

  // Render

  const handleReady = useCallback(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return <ExhibitionTitleScreen onReady={handleReady} />;
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, width=device-width"
        />
      </Head>
      <div
        className={classnames("bg-black h-full w-full", {
          "h-screen w-screen": isMobileSafari && orientation === "landscape",
        })}
      >
        {location === "3d" && creamsoda && (
          <Exhibition3d
            creamsoda={creamsoda}
            defaultArea={defaultArea}
            examine={okusuriLand.examine}
            multiplay={multiplay}
            onComplete={handleComplete3d}
            settings={{ graphicsQuality }}
          />
        )}
        {location === "2d-night" && (
          <Exhibition2dNight onComplete={handleComplete2dNight} />
        )}
        {location === "2d-morning" && <Exhibition2dMorning />}
        <ExhibitionMenu
          mode={location === "3d" ? "3d" : "2d"}
          multiplay={multiplay}
          okusuriLand={okusuriLand}
          onChangeGraphicsQuality={handleChangeQuality}
        />
        <ExhibitionOkusuriLandNotifications
          diseases={diseases}
          onAnimationCompleted={handleResetDisease}
        />
      </div>
    </>
  );
};
