import React, { useEffect, useState } from "react";
import { ChekiFilterDefs } from "~/components/Cheki/FilterDefs";
import {
  CHEKI_FRAME_MARGIN_LEFT,
  CHEKI_FRAME_MARGIN_TOP,
} from "~/constants/cheki";
import { selectors, useSelector } from "~/domains";
import { getImageSizeByDirection } from "~/utils/cheki";

export const ChekiCanvasCharacterLayer: React.FC = () => {
  const { character, image } = useSelector(selectors.cheki);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const { direction, filter } = image;

  useEffect(() => {
    const { height, width } = getImageSizeByDirection(direction);
    setHeight(height);
    setWidth(width);
  }, [direction]);

  return (
    <svg
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      x={CHEKI_FRAME_MARGIN_LEFT}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={CHEKI_FRAME_MARGIN_TOP}
    >
      <ChekiFilterDefs />

      <svg
        height={image.height}
        viewBox={`0 0 ${image.width} ${image.height}`}
        width={image.width}
        x={image.x}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        y={image.y}
      >
        {character && (
          <image
            x={(character.x - image.width) * -1}
            xlinkHref={character.dataUrl}
            y={(character.y - image.height) * -1}
          />
        )}
      </svg>
    </svg>
  );
};
