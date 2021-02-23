import { css, keyframes } from "@emotion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { ControllerKeys, defaultControllerKeys } from "../3d/Controller";
import { Exhibition2dCanvasContainer } from "./CanvasContainer";
import {
  EXHIBITION_2D_CANVAS_HEIGHT,
  EXHIBITION_2D_CANVAS_WIDTH,
  EXHIBITION_2D_FADE_ANIMATION_DURATION,
  EXHIBITION_2D_ZOOM_ANIMATION_DELAY,
  EXHIBITION_2D_ZOOM_ANIMATION_DURATION,
  EXHIBITION_2D_ZOOM_OUT_ANIMATION_DURATION,
} from "~/constants/exhibition";
import { fadeIn, fadeOut } from "~/styles/animations";
import { Mixin } from "~/styles/mixin";
import {
  convertEventToCursorPositions,
  MouseRelatedEvent,
  TouchRelatedEvent,
} from "~/utils/cheki";

const mobileContainer = css`
  background: rgba(255, 255, 255, 0.24);
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 100%;
  bottom: 64px;
  height: 48px;
  left: 64px;
  width: 48px;
`;

const mobileCursor = css`
  background: rgba(255, 255, 255, 0.24);
  border: 1px solid rgba(255, 255, 255, 0.24);
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

const zoomCommonTransform = css`
  transform: translate(-50%, -36%) scale(2);
`;

const zoomInKeyframes = keyframes`
  0% {
    transform: none;
  }

  100% {
    ${zoomCommonTransform};
  }
`;

const zoomIn = css`
  ${Mixin.animation};
  animation-delay: ${EXHIBITION_2D_ZOOM_ANIMATION_DELAY}s;
  animation-duration: ${EXHIBITION_2D_ZOOM_ANIMATION_DURATION}s;
  animation-name: ${zoomInKeyframes};
  animation-timing-function: ease-out;
`;

const zoomOutKeyframes = keyframes`
  // 0.8s で移動する
  31.25% {
    transform: translateY(-20%) scale(1.6);
  }

  // 0.16s でフェードアウトする
  93.75% {
    filter: url(#glitch);
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateY(-20%) scale(1.6);
  }
`;

const zoomOut = css`
  ${Mixin.animation};
  animation-delay: ${EXHIBITION_2D_FADE_ANIMATION_DURATION}s;
  animation-duration: ${EXHIBITION_2D_ZOOM_OUT_ANIMATION_DURATION}s;
  animation-name: ${zoomOutKeyframes};
  animation-timing-function: ease-out;
  ${zoomCommonTransform};
`;

export const Exhibition2dCanvas: React.FC<{
  creamsoda: string | null;
  onComplete: () => void;
  onMove: (direction: "left" | "right") => void;
  onMoveEnd: () => void;
  walked: boolean;
}> = ({ children, creamsoda, onComplete, onMove, onMoveEnd, walked }) => {
  useEffect(() => {
    setTimeout(() => {
      onComplete();
    }, (EXHIBITION_2D_FADE_ANIMATION_DURATION + EXHIBITION_2D_ZOOM_OUT_ANIMATION_DURATION) * 1000);
  }, [creamsoda]);

  const handleChangeKeys = useCallback(
    ({ left, right }: ControllerKeys) => {
      if (left) {
        onMove("left");
        return;
      }

      if (right) {
        onMove("right");
        return;
      }

      onMoveEnd();
    },
    [onMove, onMoveEnd]
  );

  return (
    <>
      <Exhibition2dCanvasContainer>
        <svg
          css={walked ? (creamsoda ? zoomOut : zoomIn) : undefined}
          viewBox={`0 0 ${EXHIBITION_2D_CANVAS_WIDTH} ${EXHIBITION_2D_CANVAS_HEIGHT}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glitch" x="0" y="0">
              <feColorMatrix
                in="SourceGraphic"
                mode="matrix"
                values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                result="r"
              />
              <feOffset in="r" result="r" dx="-5">
                <animate
                  attributeName="dx"
                  attributeType="XML"
                  values="0; -5; 0; -18; -2; -4; 0 ;-3; 0"
                  dur="0.2s"
                  repeatCount="indefinite"
                />
              </feOffset>
              <feColorMatrix
                in="SourceGraphic"
                mode="matrix"
                values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
                result="g"
              />
              <feOffset in="g" result="g" dx="-5" dy="1">
                <animate
                  attributeName="dx"
                  attributeType="XML"
                  values="0; 0; 0; -3; 0; 8; 0 ;-1; 0"
                  dur="0.15s"
                  repeatCount="indefinite"
                />
              </feOffset>
              <feColorMatrix
                in="SourceGraphic"
                mode="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
                result="b"
              />
              <feOffset in="b" result="b" dx="5" dy="2">
                <animate
                  attributeName="dx"
                  attributeType="XML"
                  values="0; 3; -1; 4; 0; 2; 0 ;18; 0"
                  dur="0.35s"
                  repeatCount="indefinite"
                />
              </feOffset>
              <feBlend in="r" in2="g" mode="screen" result="blend" />
              <feBlend in="blend" in2="b" mode="screen" result="blend" />
            </filter>
          </defs>
          {children}
        </svg>
      </Exhibition2dCanvasContainer>
      {!walked && isMobile && <Mobile onChange={handleChangeKeys} />}
    </>
  );
};
