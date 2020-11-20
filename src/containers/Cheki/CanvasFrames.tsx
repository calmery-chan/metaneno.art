import React from "react";
import { ChekiCanvasFrameEffectLayer } from "./CanvasFrameEffectLayer";
import { ChekiCanvasFrameLayer } from "./CanvasFrameLayer";
import { ChekiCanvasImageLayer } from "./CanvasImageLayer";
import { selectors, useSelector } from "~/domains";
import { getFrameSizeByDirection } from "~/utils/cheki";

export const ChekiCanvasFrames: React.FC = () => {
  const {
    image: { direction },
    layout: { displayable, frame },
  } = useSelector(selectors.cheki);

  const { height, width } = getFrameSizeByDirection(direction);

  return (
    <svg
      height={frame.height}
      viewBox={`0 0 ${frame.viewBoxWidth} ${frame.viewBoxHeight}`}
      width={frame.width}
      x={frame.x - displayable.x}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={frame.y - displayable.y}
    >
      <ChekiCanvasFrameLayer />
      <ChekiCanvasImageLayer />
      <ChekiCanvasFrameEffectLayer />
    </svg>
  );
};
