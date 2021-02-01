import React, { createRef, useCallback, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";
import {
  EXHIBITION_2D_HEIGHT,
  EXHIBITION_2D_WIDTH,
} from "~/constants/exhibition";

// Constants

const ASPECT_RATIO = EXHIBITION_2D_WIDTH / EXHIBITION_2D_HEIGHT;

// Main Component

export const Exhibition2dResizeObserver: React.FC<{
  onResize: (props: {
    height: number;
    width: number;
    x: number;
    y: number;
  }) => void;
}> = React.memo(
  ({ onResize }) => {
    const containerRef = createRef<HTMLDivElement>();

    // Events

    const handleResize = useCallback(({ height, width }: DOMRect) => {
      if (height * ASPECT_RATIO < width) {
        const nextWidth = height * ASPECT_RATIO;

        onResize({
          height,
          width: nextWidth,
          x: (width - nextWidth) / 2,
          y: 0,
        });
      } else {
        const nextHeight = width * (1 / ASPECT_RATIO);

        onResize({
          height: nextHeight,
          width,
          x: 0,
          y: (height - nextHeight) / 2,
        });
      }
    }, []);

    // Side Effects

    useEffect(() => {
      const e = containerRef.current;

      if (!e) {
        return;
      }

      const resizeObserver = new ResizeObserver(() =>
        handleResize(e.getBoundingClientRect())
      );

      resizeObserver.observe(e);

      return () => resizeObserver.disconnect();
    }, [containerRef, handleResize]);

    // Render

    return <div className="absolute h-full w-full" ref={containerRef} />;
  },
  (previous, next) => previous.onResize === next.onResize
);
