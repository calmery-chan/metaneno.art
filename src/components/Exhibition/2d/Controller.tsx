import { css } from "@emotion/react";
import React, { useCallback, useEffect, useState } from "react";
import { convertEventToCursorPositions } from "~/utils/cheki";

const cursorLeft = css`
  cursor: w-resize;
`;

const cursorRight = css`
  cursor: e-resize;
`;

export const Exhibition2dController = React.memo<{
  onMove: (direction: "left" | "right") => void;
  screenWidth: number;
}>(({ onMove, screenWidth }) => {
  const [isMoving, setIsMoving] = useState(false);
  const [movingDirection, setMovingDirection] = useState<"left" | "right">(
    "right"
  );

  const handleEnd = useCallback(() => {
    setIsMoving(false);
  }, []);

  const handleStart = useCallback(() => {
    setIsMoving(true);
  }, []);

  const handleTick = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const [{ x }] = convertEventToCursorPositions(event);
      const nextMovingDirection = x < screenWidth / 2 ? "left" : "right";

      if (movingDirection !== nextMovingDirection) {
        setMovingDirection(nextMovingDirection);
      }
    },
    [movingDirection]
  );

  useEffect(() => {
    if (!isMoving) {
      return;
    }

    const timer = setTimeout(() => {
      onMove(movingDirection);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [isMoving, onMove, movingDirection]);

  return (
    <svg
      onMouseDown={handleStart}
      onMouseMove={handleTick}
      onMouseUp={handleEnd}
      onTouchEnd={handleEnd}
      onTouchMove={handleTick}
      onTouchStart={handleStart}
    >
      <rect css={cursorLeft} fillOpacity="0" height="100%" width="50%" />
      <rect
        css={cursorRight}
        fillOpacity="0"
        height="100%"
        width="50%"
        x="50%"
      />
    </svg>
  );
});
