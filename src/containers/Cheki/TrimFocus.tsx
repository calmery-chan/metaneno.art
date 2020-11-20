import React from "react";
import { CHEKI_FOCUS_SIZE } from "~/constants/cheki";
import { selectors, useSelector } from "~/domains";

export const ChekiTrimFocus: React.FC = () => {
  const { focus, layout } = useSelector(selectors.cheki);
  const { displayable, trim } = layout;

  if (!focus) {
    return null;
  }

  const half = CHEKI_FOCUS_SIZE / 2;
  const centerX = focus.x - half;
  const centerY = focus.y - half;

  return (
    <svg
      height={trim.height}
      viewBox={`0 0 ${trim.viewBoxWidth} ${trim.viewBoxHeight}`}
      width={trim.width}
      x={trim.x - displayable.x}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={trim.y - displayable.y}
    >
      <rect
        x={centerX}
        y={centerY}
        height="96"
        width="96"
        stroke="#FFD74B"
        fillOpacity="0"
      />

      <rect
        x={focus.x}
        y={centerY}
        height="8"
        width="1"
        stroke="#FFD74B"
        fillOpacity="0"
      />

      <rect
        x={focus.x}
        y={focus.y + 48 - 8}
        height="8"
        width="1"
        stroke="#FFD74B"
        fillOpacity="0"
      />

      <rect
        x={centerX}
        y={focus.y}
        height="1"
        width="8"
        stroke="#FFD74B"
        fillOpacity="0"
      />

      <rect
        x={focus.x + 48 - 8}
        y={focus.y}
        height="1"
        width="8"
        stroke="#FFD74B"
        fillOpacity="0"
      />
    </svg>
  );
};
