import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { Exhibition3d } from "~/components/Exhibition/3d";
import { ExhibitionMenu } from "~/components/Exhibition/Menu";
import { GraphicsQuality } from "~/types/exhibition";
import cloud from "~/data/cloud.json";

const Exhibition: NextPage = () => {
  const [graphicsQuality, setGraphicsQuality] = useState<GraphicsQuality>("high");

  const handleChangeQuality = useCallback((graphicsQuality: GraphicsQuality) => {
    setGraphicsQuality(graphicsQuality);
  }, []);

  return (
    <>
      <Exhibition3d area={cloud} settings={{ graphicsQuality }} />
      <ExhibitionMenu onChangeGraphicsQuality={handleChangeQuality} />
    </>
  );
};

export default Exhibition;
