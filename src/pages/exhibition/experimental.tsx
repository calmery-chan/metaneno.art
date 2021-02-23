import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { Exhibition2dMorning } from "~/components/Exhibition/2d/Morning";
import { Exhibition2dNight } from "~/components/Exhibition/2d/Night";
import { Exhibition3d } from "~/components/Exhibition/3d";
import { ExhibitionMenu } from "~/components/Exhibition/Menu";
import { ExhibitionOkusuriLandNotifications } from "~/components/Exhibition/OkusuriLandNotifications";
import { GraphicsQuality } from "~/types/exhibition";
import { useOkusuriLand } from "~/utils/okusuri.land";
import { Disease } from "~/utils/okusuri.land/types";

const Exhibition: NextPage = () => {
  const [creamsoda, setCreamsoda] = useState<"flower" | "water" | null>(null);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [location, setLocation] = useState<"2d-morning" | "2d-night" | "3d">(
    "2d-night"
  );
  const [graphicsQuality, setGraphicsQuality] = useState<GraphicsQuality>(
    "high"
  );

  // Events

  const handleChangeQuality = useCallback(
    (graphicsQuality: GraphicsQuality) => {
      setGraphicsQuality(graphicsQuality);
    },
    []
  );

  const handleComplete2dNight = useCallback((creamsoda: "flower" | "water") => {
    setCreamsoda(creamsoda);
    setLocation("3d");
  }, []);

  const handleComplete3d = useCallback(() => {
    setLocation("2d-morning");
  }, []);

  const handleResetDisease = useCallback(() => setDiseases([]), []);

  // Okusuri.land

  const okusuriLand = useOkusuriLand(setDiseases);

  // Render

  return (
    <div className="h-screen w-screen">
      {location === "3d" && creamsoda && (
        <Exhibition3d
          creamsoda={creamsoda}
          onComplete={handleComplete3d}
          settings={{ graphicsQuality }}
        />
      )}
      {location === "2d-night" && (
        <Exhibition2dNight onComplete={handleComplete2dNight} />
      )}
      {location === "2d-morning" && <Exhibition2dMorning />}
      <ExhibitionMenu
        okusuriLand={okusuriLand}
        onChangeGraphicsQuality={handleChangeQuality}
      />

      <ExhibitionOkusuriLandNotifications
        diseases={diseases}
        onAnimationCompleted={handleResetDisease}
      />
    </div>
  );
};

export default Exhibition;
