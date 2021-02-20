import React, { useCallback, useState } from "react";
import { Exhibition2dResizeObserver } from "./ResizeObserver";
import { EXHIBITION_2D_CANVAS_WIDTH } from "~/constants/exhibition";

export const Exhibition2dCanvasContainer: React.FC<{
  onChangeDisplayMagnification?: ({
    displayMagnification,
    x,
    y,
  }: {
    displayMagnification: number;
    x: number;
    y: number;
  }) => void;
}> = ({ children, onChangeDisplayMagnification }) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleResize = useCallback(
    ({ height, width, x, y }) => {
      setHeight(height);
      setWidth(width);
      setX(x);
      setY(y);

      onChangeDisplayMagnification?.({
        displayMagnification: EXHIBITION_2D_CANVAS_WIDTH / width,
        x,
        y,
      });
    },
    [onChangeDisplayMagnification]
  );

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
