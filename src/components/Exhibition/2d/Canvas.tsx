import { css, keyframes } from "@emotion/react";
import React, { useCallback, useState } from "react";
import { Exhibition2dResizeObserver } from "./ResizeObserver";
import {
  EXHIBITION_2D_CANVAS_HEIGHT,
  EXHIBITION_2D_CANVAS_WIDTH,
  EXHIBITION_2D_ZOOM_ANIMATION_STEP,
} from "~/constants/exhibition";
import { Mixin } from "~/styles/mixin";

const zoomInKeyframes = keyframes`
  0% {
    transform: none;
  }

  100% {
    transform: translate(-50%, -36%) scale(2);
  }
`;

const zoomIn = css`
  ${Mixin.animation};
  animation-delay: 0.4s;
  animation-duration: 0.8s;
  animation-name: ${zoomInKeyframes};
  animation-timing-function: ease-out;
`;

export const Exhibition2dCanvas: React.FC<{ step: number }> = ({
  children,
  step,
}) => {
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
      <div
        className="absolute overflow-hidden"
        style={{
          height: `${height}px`,
          left: `${x}px`,
          top: `${y}px`,
          width: `${width}px`,
        }}
      >
        <svg
          css={step >= EXHIBITION_2D_ZOOM_ANIMATION_STEP ? zoomIn : undefined}
          viewBox={`0 0 ${EXHIBITION_2D_CANVAS_WIDTH} ${EXHIBITION_2D_CANVAS_HEIGHT}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {children}
        </svg>
      </div>
    </div>
  );
};

/*
    transform: translate(-50%, -50%) scale(2);
*/
