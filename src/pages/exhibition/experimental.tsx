import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { Exhibition2dMorning } from "~/components/Exhibition/2d/Morning";
import { Exhibition2dNight } from "~/components/Exhibition/2d/Night";
import { Exhibition3d } from "~/components/Exhibition/3d";
import { ExhibitionMenu } from "~/components/Exhibition/Menu";
import { GraphicsQuality } from "~/types/exhibition";

const Exhibition: NextPage = () => {
  const [creamsoda, setCreamsoda] = useState<"flower" | "water" | null>(null);
  const [location, setLocation] = useState<"2d-morning" | "2d-night" | "3d">(
    "2d-morning"
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

  // Render

  return (
    <>
      {location === "3d" && creamsoda && (
        <Exhibition3d creamsoda={creamsoda} settings={{ graphicsQuality }} />
      )}
      {location === "2d-night" && (
        <Exhibition2dNight onComplete={handleComplete2dNight} />
      )}
      {location === "2d-morning" && (
        <Exhibition2dMorning />
      )}
      <ExhibitionMenu onChangeGraphicsQuality={handleChangeQuality} />
    </>
  );
};

export default Exhibition;
