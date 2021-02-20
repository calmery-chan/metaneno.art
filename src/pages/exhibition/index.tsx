import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { Exhibition3dAreaCloud } from "~/components/Exhibition/3d/Area/Cloud";
import { ExhibitionMenu } from "~/components/Exhibition/Menu";
import { GraphicsQuality } from "~/types/exhibition";

const Exhibition: NextPage = () => {
  const [quality, setQuality] = useState<GraphicsQuality>("high");

  const handleChangeQuality = useCallback((quality: GraphicsQuality) => {
    setQuality(quality);
  }, []);

  return (
    <>
      <Exhibition3dAreaCloud quality={quality} />
      <ExhibitionMenu onChangeGraphicsQuality={handleChangeQuality} />
    </>
  );
};

export default Exhibition;
