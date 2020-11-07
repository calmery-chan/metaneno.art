import React from "react";
import {
  CHEKI_HORIZONTAL_FRAME_WIDTH,
  CHEKI_VERTICAL_FRAME_HEIGHT,
} from "~/constants/cheki";
import { selectors, useSelector } from "~/domains";
import { getFrameSizeByDirection } from "~/utils/cheki";

export const ChekiCanvasFrameLayer: React.FC = () => {
  const {
    image: { direction },
  } = useSelector(selectors.cheki);
  const { height, width } = getFrameSizeByDirection(direction);

  return (
    <>
      <mask id="cheki-canvas-frame-layer">
        <rect fill="#fff" height={height} width={width} />
      </mask>

      {/* Reference: https://www.vecteezy.com/vector-art/123466-cartoon-sweets-vector-pattern */}
      <image
        height={CHEKI_VERTICAL_FRAME_HEIGHT}
        width={CHEKI_HORIZONTAL_FRAME_WIDTH}
        xlinkHref="/cheki/frame.png"
        mask="url(#cheki-canvas-frame-layer)"
      />
    </>
  );
};
