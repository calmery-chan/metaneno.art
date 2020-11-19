import React from "react";
import { ChekiCanvasFrameLayer } from "./CanvasFrameLayer";
import { ChekiCanvasImageLayer } from "./CanvasImageLayer";
import { selectors, useSelector } from "~/domains";

export const ChekiCanvasFrames: React.FC = () => {
  const {
    layout: { displayable, frame },
  } = useSelector(selectors.cheki);

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
    </svg>
  );
};
