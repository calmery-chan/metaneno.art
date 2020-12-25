import React from "react";
import {
  CHEKI_FRAME_MARGIN_LEFT,
  CHEKI_FRAME_MARGIN_TOP,
} from "~/constants/cheki";
import { ChekiCanvasImage } from "~/containers/Cheki/Refactor/CanvasImage";
import { useSelector } from "~/domains";
import { selectors } from "~/domains/cheki";
import { getImageSizeByDirection } from "~/utils/cheki";

export const ChekiCanvasLayerImage: React.FC = () => {
  const direction = useSelector(selectors.imageDirection);
  const filter = useSelector(selectors.imageFilter);
  const { height, width } = getImageSizeByDirection(direction);

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
      <ChekiCanvasImage filter={filter} />
    </svg>
  );
};
