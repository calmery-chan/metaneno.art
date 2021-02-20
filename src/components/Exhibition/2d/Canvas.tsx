import { css, keyframes } from "@emotion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Exhibition2dCanvasContainer } from "./CanvasContainer";
import {
  EXHIBITION_2D_CANVAS_HEIGHT,
  EXHIBITION_2D_CANVAS_WIDTH,
  EXHIBITION_2D_FADE_ANIMATION_DURATION,
  EXHIBITION_2D_ZOOM_ANIMATION_DELAY,
  EXHIBITION_2D_ZOOM_ANIMATION_DURATION,
  EXHIBITION_2D_ZOOM_OUT_ANIMATION_DURATION,
} from "~/constants/exhibition";
import { Mixin } from "~/styles/mixin";
import {
  convertEventToCursorPositions,
  MouseRelatedEvent,
  TouchRelatedEvent,
} from "~/utils/cheki";

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
  onMove: (direction: "left" | "right") => void;
  onMoveEnd: () => void;
  walked: boolean;
}> = ({ children, creamsoda, onMove, onMoveEnd, walked }) => {
  const ref = useRef<SVGSVGElement>(null);
  const [displayMagnification, setDisplayMagnification] = useState<number>(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [currentX, setCurrentX] = useState<number | null>(null);
  const [currentY, setCurrentY] = useState<number | null>(null);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);

  const handleChangeDisplayMagnification = useCallback(
    ({
      displayMagnification,
      x,
      y,
    }: {
      displayMagnification: number;
      x: number;
      y: number;
    }) => {
      setDisplayMagnification(displayMagnification);
      setOffsetX(x);
      setOffsetY(y);
    },
    []
  );

  const handleTouchEnd = useCallback(() => {
    setCurrentX(null);
    setCurrentY(null);
    setStartX(null);
    setStartY(null);
    onMoveEnd();
  }, [onMoveEnd]);

  const handleTouchMove = useCallback(
    (event: MouseRelatedEvent | TouchRelatedEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (!startX || !startY) {
        return;
      }

      const [{ x, y }] = convertEventToCursorPositions(event);

      const currentX = (x - offsetX) * displayMagnification;
      const currentY = (y - offsetY) * displayMagnification;

      setCurrentX(currentX);
      setCurrentY(currentY);

      onMove(currentX - startX > 0 ? "right" : "left");
    },
    [displayMagnification, offsetX, offsetY, onMove, startX, startY]
  );

  const handleTouchStart = useCallback(
    (event: MouseRelatedEvent | TouchRelatedEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const [{ x, y }] = convertEventToCursorPositions(event);

      const startX = (x - offsetX) * displayMagnification;
      const startY = (y - offsetY) * displayMagnification;

      setStartX(startX);
      setStartY(startY);
    },
    [displayMagnification, offsetX, offsetY]
  );

  useEffect(() => {
    const e = ref.current;

    if (!e || !handleTouchMove) return;

    e.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      e.removeEventListener("touchmove", handleTouchMove);
    };
  }, [ref, handleTouchMove]);

  return (
    <Exhibition2dCanvasContainer
      onChangeDisplayMagnification={handleChangeDisplayMagnification}
    >
      <svg
        css={walked ? (creamsoda ? zoomOut : zoomIn) : undefined}
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
        ref={ref}
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
        {startX && startY && (
          <svg height="48" width="48" overflow="visible" x={startX} y={startY}>
            <circle fill="#fff" fillOpacity="0.12" r={24} />
          </svg>
        )}
        {currentX && currentY && (
          <svg
            height="24"
            width="24"
            overflow="visible"
            x={currentX}
            y={currentY}
          >
            <circle
              fill="#fff"
              stroke="#fff"
              strokeWidth={2}
              strokeOpacity="0.12"
              fillOpacity="0"
              r={12}
            />
          </svg>
        )}
      </svg>
    </Exhibition2dCanvasContainer>
  );
};
