import { css } from "@emotion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { useKeyboard } from "~/hooks/exhibition/useKeyboard";
import { fadeIn, fadeOut } from "~/styles/animations";
import {
  convertEventToCursorPositions,
  MouseRelatedEvent,
  TouchRelatedEvent,
} from "~/utils/cheki";

export type ControllerKeys = {
  down: boolean;
  left: boolean;
  right: boolean;
  up: boolean;
};

export const defaultControllerKeys = {
  down: false,
  left: false,
  right: false,
  up: false,
};

const mobileContainer = css`
  background: rgba(0, 0, 0, 0.24);
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-radius: 100%;
  bottom: 64px;
  height: 48px;
  left: 64px;
  width: 48px;
`;

const mobileCursor = css`
  background: rgba(0, 0, 0, 0.24);
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-radius: 100%;
  height: 24px;
  width: 24px;
`;

const Mobile = React.memo<{ onChange: (keys: ControllerKeys) => void }>(
  ({ onChange }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [baseX, setBaseX] = useState<number | null>(null);
    const [baseY, setBaseY] = useState<number | null>(null);
    const [currentX, setCurrentX] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    const [timer, setTimer] = useState<number | null>(null);

    // Events

    const handleResetTimer = useCallback(() => setTimer(null), []);
    const handleTouchEnd = useCallback(() => {
      setIsMoving(false);
      onChange(defaultControllerKeys);
    }, [onChange]);
    const handleTouchStart = useCallback(() => setIsMoving(true), []);

    const handleTouchMove = useCallback(
      (event: MouseRelatedEvent | TouchRelatedEvent) => {
        event.preventDefault();
        event.stopPropagation();

        const [{ x, y }] = convertEventToCursorPositions(event);

        setCurrentX(x);
        setCurrentY(y);

        if (!isMoving || timer || !baseX || !baseY) {
          return;
        }

        setTimer(window.setTimeout(handleResetTimer, 80));

        const angle = Math.atan2(y - baseY, x - baseX) * (180 / Math.PI);

        /* -180 ~ 180 の間を 8 分割する */

        let down = false;
        let left = false;
        let right = false;
        let up = false;

        if (67.5 < angle && angle < 112.5) {
          down = true;
        } else if (
          (157.5 < angle && angle < 180) ||
          (-180 < angle && angle < -157.5)
        ) {
          left = true;
        } else if (-22.5 < angle && angle < 22.5) {
          right = true;
        } else if (-112.5 < angle && angle < -67.5) {
          up = true;
        } else if (112.5 <= angle && angle <= 157.5) {
          down = true;
          left = true;
        } else if (22.5 <= angle && angle <= 67.5) {
          down = true;
          right = true;
        } else if (-157.5 <= angle && angle <= -112.5) {
          left = true;
          up = true;
        } else if (-67.5 <= angle && angle <= -22.5) {
          right = true;
          up = true;
        }

        onChange({ down, left, right, up });
      },
      [baseX, baseY, isMoving, onChange, timer]
    );

    const handleResize = useCallback(() => {
      const e = ref.current;

      if (!e) {
        return;
      }

      const { height, width, x, y } = e.getBoundingClientRect();
      setBaseX(x + width / 2);
      setBaseY(y + height / 2);
    }, [ref]);

    // Side Effects

    useEffect(() => {
      const e = ref.current;

      if (!e) {
        return;
      }

      handleResize();

      e.addEventListener("touchmove", handleTouchMove, { passive: false });
      addEventListener("resize", handleResize);

      return () => {
        e.removeEventListener("touchmove", handleTouchMove);
        removeEventListener("resize", handleResize);
      };
    }, [handleTouchMove, ref]);

    // Render

    return (
      <>
        <div
          className="fixed"
          css={css`
            ${mobileContainer};
            ${isMoving ? fadeOut : fadeIn}
          `}
          onTouchEnd={handleTouchEnd}
          onTouchStart={handleTouchStart}
          ref={ref}
        />
        {isMoving && (
          <div
            className="absolute"
            css={mobileCursor}
            style={{
              left: `${currentX - 12}px`,
              top: `${currentY - 12}px`,
            }}
          />
        )}
      </>
    );
  }
);

const PC = React.memo<{ onChange: (keys: ControllerKeys) => void }>(
  ({ onChange }) => {
    const keys = useKeyboard();

    useEffect(() => {
      onChange(keys);
    }, [keys]);

    return null;
  }
);

export const Exhibition3dController = React.memo<{
  onChange: (keys: ControllerKeys) => void;
}>(({ onChange }) => {
  if (!isMobile) {
    return <PC onChange={onChange} />;
  }

  return <Mobile onChange={onChange} />;
});
