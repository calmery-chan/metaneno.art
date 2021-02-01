import React, { useCallback, useState } from "react";
import { Exhibition2dResizeObserver } from "./ResizeObserver";
import {
  EXHIBITION_2D_HEIGHT,
  EXHIBITION_2D_WIDTH,
} from "~/constants/exhibition";

export const Exhibition2dCanvas: React.FC = ({ children }) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleResize = useCallback(({ height, width, x, y }) => {
    setHeight(height);
    setWidth(width);
    setX(x);
    setY(y);
  }, []);

  return (
    <div className="h-full relative w-full">
      <Exhibition2dResizeObserver onResize={handleResize} />
      <svg
        className="absolute"
        height={height}
        style={{ top: `${y}px`, left: `${x}px` }}
        viewBox={`0 0 ${EXHIBITION_2D_WIDTH} ${EXHIBITION_2D_HEIGHT}`}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </svg>
    </div>
  );
};
