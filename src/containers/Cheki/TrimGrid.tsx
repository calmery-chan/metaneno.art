import React from "react";
import { selectors, useSelector } from "~/domains";

export const ChekiTrimGrid: React.FC = () => {
  const cheki = useSelector(selectors.cheki);
  const { displayable, trim } = cheki.layout;

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
        fill="#fff"
        fillOpacity="0.48"
        height="100%"
        width={1 * trim.displayMagnification}
        x={trim.viewBoxWidth / 3}
        y="0"
      />

      <rect
        fill="#fff"
        fillOpacity="0.48"
        height="100%"
        width={1 * trim.displayMagnification}
        x={(trim.viewBoxWidth / 3) * 2}
        y="0"
      />

      <rect
        fill="#fff"
        fillOpacity="0.48"
        height={1 * trim.displayMagnification}
        width="100%"
        x="0"
        y={trim.viewBoxHeight / 3}
      />

      <rect
        fill="#fff"
        fillOpacity="0.48"
        height={1 * trim.displayMagnification}
        width="100%"
        x="0"
        y={(trim.viewBoxHeight / 3) * 2}
      />

      {/* Border */}

      <rect
        fill="#fff"
        fillOpacity="0.48"
        height={1 * trim.displayMagnification}
        width="100%"
        x="0"
        y="0"
      />

      <rect
        fill="#fff"
        fillOpacity="0.48"
        height={1 * trim.displayMagnification}
        width="100%"
        x="0"
        y={trim.viewBoxHeight - 1 * trim.displayMagnification}
      />

      <rect
        fill="#fff"
        fillOpacity="0.48"
        height="100%"
        width={1 * trim.displayMagnification}
        x="0"
        y="0"
      />

      <rect
        fill="#fff"
        fillOpacity="0.48"
        height="100%"
        width={1 * trim.displayMagnification}
        x={trim.viewBoxWidth - 1 * trim.displayMagnification}
        y="0"
      />

      {/* Top - Left */}

      <rect
        fill="#fff"
        height={2 * trim.displayMagnification}
        width={16 * trim.displayMagnification}
        x="0"
        y="0"
      />
      <rect
        fill="#fff"
        height={16 * trim.displayMagnification}
        width={2 * trim.displayMagnification}
        x="0"
        y="0"
      />

      {/* Top - Right */}

      <rect
        fill="#fff"
        height={2 * trim.displayMagnification}
        width={16 * trim.displayMagnification}
        x={trim.viewBoxWidth - 16 * trim.displayMagnification}
        y="0"
      />
      <rect
        fill="#fff"
        height={16 * trim.displayMagnification}
        width={2 * trim.displayMagnification}
        x={trim.viewBoxWidth - 2 * trim.displayMagnification}
        y="0"
      />

      {/* Bottom - Left */}

      <rect
        fill="#fff"
        height={2 * trim.displayMagnification}
        width={16 * trim.displayMagnification}
        x="0"
        y={trim.viewBoxHeight - 2 * trim.displayMagnification}
      />
      <rect
        fill="#fff"
        height={16 * trim.displayMagnification}
        width={2 * trim.displayMagnification}
        x="0"
        y={trim.viewBoxHeight - 16 * trim.displayMagnification}
      />

      {/* Bottom - Right */}

      <rect
        fill="#fff"
        height={2 * trim.displayMagnification}
        width={16 * trim.displayMagnification}
        x={trim.viewBoxWidth - 16 * trim.displayMagnification}
        y={trim.viewBoxHeight - 2 * trim.displayMagnification}
      />
      <rect
        fill="#fff"
        height={16 * trim.displayMagnification}
        width={2 * trim.displayMagnification}
        x={trim.viewBoxWidth - 2 * trim.displayMagnification}
        y={trim.viewBoxHeight - 16 * trim.displayMagnification}
      />
    </svg>
  );
};
