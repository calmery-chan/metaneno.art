import React from "react";
import {
  CHEKI_HORIZONTAL_FRAME_HEIGHT,
  CHEKI_HORIZONTAL_FRAME_WIDTH,
  CHEKI_VERTICAL_FRAME_HEIGHT,
  CHEKI_VERTICAL_FRAME_WIDTH,
} from "~/constants/cheki";
import { selectors, useSelector } from "~/domains";

const Horizontal: React.FC = () => (
  <rect
    fill="#fff"
    height={CHEKI_HORIZONTAL_FRAME_HEIGHT}
    width={CHEKI_HORIZONTAL_FRAME_WIDTH}
  />
);

const Vertical: React.FC = () => (
  <rect
    fill="#fff"
    height={CHEKI_VERTICAL_FRAME_HEIGHT}
    width={CHEKI_VERTICAL_FRAME_WIDTH}
  />
);

export const ChekiCanvasFrameLayer: React.FC = () => {
  const { direction } = useSelector(selectors.cheki);

  return (
    <>
      <mask id="cheki-canvas-frame-layer">
        {direction === "horizontal" && <Horizontal />}
        {direction === "vertical" && <Vertical />}
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
