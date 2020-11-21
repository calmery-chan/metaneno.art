import React from "react";
import { ChekiFilterDefs } from "~/components/Cheki/FilterDefs";
import { ChekiFilterImage } from "~/components/Cheki/FilterImage";
import { ChekiFilter } from "~/constants/cheki";
import { selectors, useSelector } from "~/domains";

export const ChekiCanvasTrimedImage: React.FC<{
  filter: ChekiFilter | null;
}> = ({ filter }) => {
  const cheki = useSelector(selectors.cheki);

  const { image, layout } = cheki;
  const { trim } = layout;
  const { height, width } = image;

  return (
    <svg
      height={trim.height}
      viewBox={`0 0 ${trim.viewBoxWidth} ${trim.viewBoxHeight}`}
      width={trim.width}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
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
    </svg>
  );
};
