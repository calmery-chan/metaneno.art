import React from "react";
import { ChekiCanvasTrimedImage } from "./Refactor/CanvasTrimedImage";
import { ChekiFilterDefs } from "~/components/Cheki/FilterDefs";
import { ChekiFilterImage } from "~/components/Cheki/FilterImage";
import { selectors, useSelector } from "~/domains";

export const ChekiCanvasFilters: React.FC = () => {
  const cheki = useSelector(selectors.cheki);

  const { image } = cheki;
  const { filter, height, width } = image;

  return (
    <ChekiCanvasTrimedImage>
      <svg
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        x={image.x}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        y={image.y}
      >
        <ChekiFilterDefs />
        <ChekiFilterImage filter={filter} height={height} width={width} />
      </svg>
    </ChekiCanvasTrimedImage>
  );
};
