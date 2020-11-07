import React, { useEffect, useState } from "react";
import {
  CHEKI_FRAME_MARGIN_LEFT,
  CHEKI_FRAME_MARGIN_TOP,
  CHEKI_HORIZONTAL_IMAGE_HEIGHT,
  CHEKI_HORIZONTAL_IMAGE_WIDTH,
  CHEKI_VERTICAL_IMAGE_HEIGHT,
  CHEKI_VERTICAL_IMAGE_WIDTH,
} from "~/constants/cheki";
import { selectors, useSelector } from "~/domains";

export const ChekiCanvasImageLayer: React.FC = () => {
  const { direction, imageHeight, imageUrl, imageWidth } = useSelector(
    selectors.cheki
  );
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    switch (direction) {
      case "horizontal": {
        setHeight(CHEKI_HORIZONTAL_IMAGE_HEIGHT);
        setWidth(CHEKI_HORIZONTAL_IMAGE_WIDTH);
        return;
      }

      case "vertical": {
        setHeight(CHEKI_VERTICAL_IMAGE_HEIGHT);
        setWidth(CHEKI_VERTICAL_IMAGE_WIDTH);
        return;
      }
    }
  }, [direction]);

  return (
    <svg
      height={height}
      width={width}
      x={CHEKI_FRAME_MARGIN_LEFT}
      y={CHEKI_FRAME_MARGIN_TOP}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect fill="green" width="100%" height="100%" />
      <image height={imageHeight} width={imageWidth} xlinkHref={imageUrl} />
    </svg>
  );
};
