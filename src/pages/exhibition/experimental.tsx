import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { Exhibition2dNight } from "~/components/Exhibition/2d/Night";
import { Exhibition3d } from "~/components/Exhibition/3d";
import { ExhibitionMenu } from "~/components/Exhibition/Menu";
import { GraphicsQuality } from "~/types/exhibition";

type Location = "2d-morning" | "2d-night" | "3d";

const Exhibition: NextPage = () => {
  const [creamsoda, setCreamsoda] = useState<"flower" | "water" | null>(null);
  const [location, setLocation] = useState<Location>("2d-night");
  const [graphicsQuality, setGraphicsQuality] = useState<GraphicsQuality>(
    "high"
  );

  const handleChangeQuality = useCallback(
    (graphicsQuality: GraphicsQuality) => {
      setGraphicsQuality(graphicsQuality);
    },
    []
  );

  const handleComplete2dNight = useCallback((creamsoda: "blue" | "flower") => {
    if (creamsoda === "blue") {
      setCreamsoda("water");
    } else {
      setCreamsoda("flower");
    }

    setLocation("3d");
  }, []);

  const is2d = location === "2d-night" || location === "2d-morning";
  const is3d = !is2d;

  return (
    <>
      {location === "3d" && creamsoda && (
        <Exhibition3d creamsoda={creamsoda} settings={{ graphicsQuality }} />
      )}
      {location === "2d-night" && (
        <Exhibition2dNight onComplete={handleComplete2dNight} />
      )}
      <ExhibitionMenu
        mode={is2d ? "2d" : "3d"}
        onChangeGraphicsQuality={handleChangeQuality}
      />
    </>
  );
};

export default Exhibition;
