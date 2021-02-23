import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { Exhibition3d } from "~/components/Exhibition/3d";
import { ExhibitionMenu } from "~/components/Exhibition/Menu";
import cloud from "~/data/cloud";
import meadow from "~/data/meadow";
import sea from "~/data/sea";
import { AreaName, GraphicsQuality } from "~/types/exhibition";

const Exhibition: NextPage = () => {
  const [area, setArea] = useState<AreaName>("cloud");

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
        area={area === "sea" ? sea : area === "cloud" ? cloud : meadow}
        onChangeArea={setArea}
        settings={{ graphicsQuality }}
      />
      <ExhibitionMenu onChangeGraphicsQuality={handleChangeQuality} />
    </>
  );
};

export default Exhibition;
