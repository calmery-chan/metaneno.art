import { css, keyframes } from "@emotion/react";
import React, { useCallback, useState } from "react";
import { Exhibition2dResizeObserver } from "./ResizeObserver";
import { Exhibition2dSpeechBubble } from "./SpeechBubble";
import {
  EXHIBITION_2D_CANVAS_HEIGHT,
  EXHIBITION_2D_CANVAS_WIDTH,
  EXHIBITION_2D_FADE_ANIMATION_DURATION,
  EXHIBITION_2D_KEY_SCENARIO,
  EXHIBITION_2D_SELECT_ICE_CREAMSODA_SCENARIO,
  EXHIBITION_2D_ZOOM_OUT_ANIMATION_DURATION,
} from "~/constants/exhibition";
import { Mixin } from "~/styles/mixin";

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
  animation-delay: 0.4s;
  animation-duration: 0.8s;
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
  onZoom: () => void;
  restricted: boolean;
  walked: boolean;
}> = ({ children, creamsoda, onMove, onZoom, restricted, walked }) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [isReadScenario, setReadScenario] = useState(false);
  const [isReadSelectScenario, setReadSelectScenario] = useState(false);

  const handleReadScenario = useCallback(() => {
    setReadScenario(true);
  }, []);

  const handleReadSelectScenario = useCallback(() => {
    setReadSelectScenario(true);
    onZoom();
  }, [onZoom]);

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
        <svg
          css={
            walked && isReadSelectScenario
              ? creamsoda
                ? zoomOut
                : zoomIn
              : undefined
          }
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
          {/* <Exhibition2dController onMove={onMove} screenWidth={width} /> */}
          {!restricted && !isReadScenario && (
            <Exhibition2dSpeechBubble
              scenarios={EXHIBITION_2D_KEY_SCENARIO}
              onComplete={handleReadScenario}
            />
          )}
          {!restricted && walked && !isReadSelectScenario && (
            <Exhibition2dSpeechBubble
              scenarios={EXHIBITION_2D_SELECT_ICE_CREAMSODA_SCENARIO}
              onComplete={handleReadSelectScenario}
            />
          )}
        </svg>
      </div>
    </>
  );
};

/*
    transform: translate(-50%, -50%) scale(2);
*/
