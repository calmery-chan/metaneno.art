import React, { useCallback, useState } from "react";
import {
  Exhibition3dSpeechBubbleResizeObserver,
  EXHIBITION_3D_CANVAS_WIDTH,
} from "./ResizeObserver";

export const Exhibition3dSpeechBubbleCanvasContainer: React.FC<{
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
        displayMagnification: EXHIBITION_3D_CANVAS_WIDTH / width,
        x,
        y,
      });
    },
    [onChangeDisplayMagnification]
  );

  return (
    <>
      <Exhibition3dSpeechBubbleResizeObserver onResize={handleResize} />
      <div
        className="absolute"
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
