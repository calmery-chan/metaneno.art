import { css, keyframes } from "@emotion/react";
import React, { useCallback, useState } from "react";
import { Exhibition2dResizeObserver } from "./ResizeObserver";
import {
  EXHIBITION_2D_CANVAS_HEIGHT,
  EXHIBITION_2D_CANVAS_WIDTH,
  EXHIBITION_2D_FADEIN_ANIMATION_DELAY,
  EXHIBITION_2D_FADEIN_ANIMATION_DURATION,
} from "~/constants/exhibition";
import { fadeIn, Mixin } from "~/styles/mixin";

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

const creamsoda = css`
  image-rendering: pixelated;
`;

const fadeInImage = css`
  ${Mixin.animation};
  ${fadeIn};
  animation-delay: ${EXHIBITION_2D_FADEIN_ANIMATION_DELAY}s;
  animation-duration: ${EXHIBITION_2D_FADEIN_ANIMATION_DURATION}s;
`;

export const Exhibition2dCanvas: React.FC<{ walked: boolean }> = ({
  children,
  walked,
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
    <div className="absolute h-full w-full">
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
          css={walked ? zoomIn : undefined}
          viewBox={`0 0 ${EXHIBITION_2D_CANVAS_WIDTH} ${EXHIBITION_2D_CANVAS_HEIGHT}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {children}
        </svg>
        <div
          className="absolute h-full opacity-0 top-0 w-full"
          css={walked ? fadeInImage : undefined}
          style={{ background: "#000" }}
        >
          <img
            className="h-full object-contain w-full"
            css={creamsoda}
            src="/exhibition/creamsoda.png"
          />
        </div>
      </div>
    </div>
  );
};

/*
    transform: translate(-50%, -50%) scale(2);
*/
