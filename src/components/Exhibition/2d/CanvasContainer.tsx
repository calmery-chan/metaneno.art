import React, { useCallback, useState } from "react";
import { Exhibition2dResizeObserver } from "./ResizeObserver";

export const Exhibition2dCanvasContainer: React.FC = ({ children }) => {
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
    <>
      <Exhibition2dResizeObserver onResize={handleResize} />
      <div
        className="absolute overflow-hidden"
        style={{
          height: `${height}px`,
          left: `${x}px`,
          top: `${y}px`,
          width: `${width}px`,
        }}
      >
        {children}
      </div>
    </>
  );
};
