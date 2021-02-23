import { css, keyframes } from "@emotion/react";
import React, { useCallback, useEffect, useState } from "react";
import { Exhibition2dBackground } from "~/components/Exhibition/2d/Background";
import { Exhibition2dCanvas } from "~/components/Exhibition/2d/Canvas";
import { Exhibition2dCanvasContainer } from "~/components/Exhibition/2d/CanvasContainer";
import { Exhibition2dCharacter } from "~/components/Exhibition/2d/Character";
import { Exhibition2dForeground } from "~/components/Exhibition/2d/Foreground";
import { Exhibition2DItemsKey } from "~/components/Exhibition/2d/Items/Key";
import { Exhibition2dSpeechBubble } from "~/components/Exhibition/2d/SpeechBubble";
import {
  EXHIBITION_2D_CHARACTER_CENTER_X,
  EXHIBITION_2D_CHARACTER_DEFAULT_DIRECTION,
  EXHIBITION_2D_CHARACTER_HEIGHT,
  EXHIBITION_2D_CHARACTER_MAX_STEP,
  EXHIBITION_2D_CHARACTER_MAX_STEP_WHEN_RESTRICTED,
  EXHIBITION_2D_FADEIN_ANIMATION_DELAY,
  EXHIBITION_2D_FADE_ANIMATION_DURATION,
  EXHIBITION_2D_KEY_SCENARIO,
  EXHIBITION_2D_MOVING_DISTANCE_PER_STEP,
  EXHIBITION_2D_SELECT_ICE_CREAMSODA_SCENARIO,
  EXHIBITION_2D_ZOOM_ANIMATION_STEP,
} from "~/constants/exhibition";
import { useKeydown, useKeyup } from "~/hooks/useKeyboard";
import { fadeOut, Mixin } from "~/styles/mixin";

// Components

const clickable = css`
  cursor: pointer;
  transition: ${Mixin.ANIMATION_DURATION.seconds}s ease;

  &:hover {
    transform: scale(1.04);
  }
`;

const fadeInKeyframes = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeIn = css`
  animation-name: ${fadeInKeyframes};
`;

const Exhibition2dWakeupCaharcter: React.FC<{ onComplete: () => void }> = ({
  onComplete,
}) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    setTimeout(
      () => {
        if (frame > 2) {
          onComplete();
          return;
        }

        setFrame(frame + 1);
      },
      frame === 0 ? 2400 : frame === 2 ? 2400 : 800
    );
  }, [frame, onComplete]);

  return (
    <image
      height={EXHIBITION_2D_CHARACTER_HEIGHT}
      style={{ imageRendering: "pixelated" }}
      x={105}
      y={117}
      xlinkHref={`/exhibition/2d/night/character/wakeup/${frame}.png`}
    />
  );
};

//

const creamsoda = css`
  image-rendering: pixelated;
`;

const fadeInImage = css`
  ${Mixin.animation};
  ${fadeIn};
  animation-delay: ${EXHIBITION_2D_FADEIN_ANIMATION_DELAY}s;
  animation-duration: ${EXHIBITION_2D_FADE_ANIMATION_DURATION}s;
`;

// ToDo: fadeIn, fadeOut の animation で display none する
const fadeOutImage = css`
  ${Mixin.animation};
  ${fadeOut};
  animation-duration: ${EXHIBITION_2D_FADE_ANIMATION_DURATION}s;
`;

export const Exhibition2dNight: React.FC<{
  onComplete: (creansoda: "flower" | "water") => void;
}> = ({ onComplete }) => {
  const [restricted, setRestricted] = useState(true);
  const [direction, setDirection] = useState<"left" | "right">(
    EXHIBITION_2D_CHARACTER_DEFAULT_DIRECTION
  );
  const [selectedCreamSoda, setSelectedCreamSoda] = useState<
    "flower" | "water" | null
  >(null);
  const [step, setStep] = useState(
    EXHIBITION_2D_CHARACTER_CENTER_X / EXHIBITION_2D_MOVING_DISTANCE_PER_STEP
  );
  const [walked, setWalked] = useState(false);
  const [wakeup, setWakeup] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isReadScenario, setReadScenario] = useState(false);
  const [isReadSelectScenario, setReadSelectScenario] = useState(false);

  const handleClickWaterIceCreamSoda = useCallback(() => {
    if (selectedCreamSoda) {
      return;
    }

    setSelectedCreamSoda("water");
  }, [selectedCreamSoda]);

  const handleClickFlowerIceCreamSoda = useCallback(() => {
    if (selectedCreamSoda) {
      return;
    }

    setSelectedCreamSoda("flower");
  }, [selectedCreamSoda]);

  const handleClickKey = useCallback(() => setRestricted(false), []);

  const handleMove = useCallback(() => {
    if (!wakeup || walked || (!restricted && !isReadScenario)) {
      return;
    }

    let difference = 0;
    if (direction === "left") difference = difference - 1;
    if (direction === "right") difference = difference + 1;
    if (difference === 0) return;

    const nextStep = step + difference;

    if (
      nextStep < 0 ||
      nextStep >
        (restricted
          ? EXHIBITION_2D_CHARACTER_MAX_STEP_WHEN_RESTRICTED
          : EXHIBITION_2D_CHARACTER_MAX_STEP)
    ) {
      return;
    }

    setStep(nextStep);

    const nextWalked = nextStep >= EXHIBITION_2D_ZOOM_ANIMATION_STEP;

    if (nextWalked) {
      setWalked(true);
      setTimeout(() => {
        setZoom(true);
      }, EXHIBITION_2D_FADEIN_ANIMATION_DELAY * 1000);
    }
  }, [direction, isReadScenario, restricted, step, wakeup, walked]);

  useEffect(() => {
    if (isMoving) {
      setTimeout(() => {
        handleMove();
      }, 35);
    }
  }, [isMoving, handleMove]);

  const handleKeydown = useCallback(
    ({ key }: KeyboardEvent) => {
      if (!restricted && !isReadScenario) {
        return;
      }

      const isLeft = key === "a" || key === "ArrowLeft";
      const isRight = key === "d" || key === "ArrowRight";

      if (isLeft) setDirection("left");
      if (isRight) setDirection("right");

      setIsMoving(isLeft || isRight);
    },
    [isReadScenario, restricted]
  );

  const handleKeyup = useCallback(({ key }: KeyboardEvent) => {
    if (
      key === "a" ||
      key === "ArrowLeft" ||
      key === "d" ||
      key === "ArrowRight"
    ) {
      setIsMoving(false);
    }
  }, []);

  const handleWakeup = useCallback(() => {
    setWakeup(true);
  }, []);

  useKeydown(handleKeydown);
  useKeyup(handleKeyup);

  const handleReadScenario = useCallback(() => {
    setReadScenario(true);
  }, []);

  const handleReadSelectScenario = useCallback(() => {
    setReadSelectScenario(true);
  }, []);

  const handleTouchMove = useCallback((direction) => {
    setDirection(direction);
    setIsMoving(true);
  }, []);

  const handleTouchMoveEnd = useCallback(() => {
    setIsMoving(false);
  }, []);

  const handleComplete = useCallback(() => {
    if (selectedCreamSoda) {
      onComplete(selectedCreamSoda);
    }
  }, [onComplete, selectedCreamSoda]);

  // Render

  return (
    <div className="bg-black h-full w-full">
      <div className="absolute h-full w-full" css={fadeIn}>
        <Exhibition2dCanvas
          creamsoda={selectedCreamSoda}
          onComplete={handleComplete}
          onMove={handleTouchMove}
          onMoveEnd={handleTouchMoveEnd}
          walked={walked}
        >
          <Exhibition2dBackground
            restricted={restricted}
            wakeup={wakeup}
            step={step}
          />
          <Exhibition2DItemsKey
            onClick={handleClickKey}
            restricted={restricted}
            step={step}
            x={520}
          />
          {wakeup && (
            <Exhibition2dCharacter
              creamsoda={selectedCreamSoda}
              direction={direction}
              restricted={restricted}
              step={step}
            />
          )}
          {!wakeup && <Exhibition2dWakeupCaharcter onComplete={handleWakeup} />}
          <Exhibition2dForeground
            creamsoda={selectedCreamSoda}
            restricted={restricted}
            step={step}
          />
        </Exhibition2dCanvas>
        <div
          className="absolute bg-black h-full opacity-0 top-0 w-full"
          css={
            walked
              ? selectedCreamSoda
                ? fadeOutImage
                : fadeInImage
              : undefined
          }
          style={{
            display: walked && !selectedCreamSoda ? "block" : "none",
          }}
        >
          <Exhibition2dCanvasContainer>
            <img
              className="h-full object-contain w-full"
              css={creamsoda}
              src="/exhibition/2d/night/creamsoda/background.png"
              style={{ imageRendering: "pixelated" }}
            />
            <div className="absolute cursor-pointer flex h-full top-0 w-full">
              <div className="w-full" onClick={handleClickWaterIceCreamSoda}>
                <img
                  className="h-full object-contain w-full"
                  css={clickable}
                  src="/exhibition/2d/night/creamsoda/water.png"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
              <div className="w-full" onClick={handleClickFlowerIceCreamSoda}>
                <img
                  className="h-full object-contain w-full"
                  css={clickable}
                  src="/exhibition/2d/night/creamsoda/flower.png"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
            </div>
          </Exhibition2dCanvasContainer>
        </div>
        {!restricted && !isReadScenario && (
          <Exhibition2dSpeechBubble
            scenarios={EXHIBITION_2D_KEY_SCENARIO}
            onComplete={handleReadScenario}
          />
        )}
        {!restricted && walked && zoom && !isReadSelectScenario && (
          <Exhibition2dSpeechBubble
            scenarios={EXHIBITION_2D_SELECT_ICE_CREAMSODA_SCENARIO}
            onComplete={handleReadSelectScenario}
          />
        )}
      </div>
    </div>
  );
};
