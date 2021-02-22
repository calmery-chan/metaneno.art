import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { Exhibition3d } from "~/components/Exhibition/3d";
import { ExhibitionMenu } from "~/components/Exhibition/Menu";
import cloud from "~/data/cloud";
import sea from "~/data/sea";
import { GraphicsQuality } from "~/types/exhibition";

const Exhibition: NextPage = () => {
  const [area, setArea] = useState<"cloud" | "meadow" | "sea">("sea");

  const [graphicsQuality, setGraphicsQuality] = useState<GraphicsQuality>(
    "high"
  );

  const handleChangeQuality = useCallback(
    (graphicsQuality: GraphicsQuality) => {
      setGraphicsQuality(graphicsQuality);
    },
    []
  );

  return (
    <>
      <Exhibition3d
        area={area === "sea" ? sea : cloud}
        onChangeArea={setArea}
        settings={{ graphicsQuality }}
      />
      <ExhibitionMenu onChangeGraphicsQuality={handleChangeQuality} />
    </>
  );
};

export default Exhibition;
