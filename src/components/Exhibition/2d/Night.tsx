import { css } from "@emotion/react";
import classnames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { isMobileSafari } from "react-device-detect";
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
import { useScreenOrientation } from "~/hooks/exhibition/useScreenOrientation";
import { useKeydown, useKeyup } from "~/hooks/useKeyboard";
import { fadeIn, fadeOut } from "~/styles/animations";
import { Mixin } from "~/styles/mixin";
import * as GA from "~/utils/exhibition/google-analytics";
import * as state from "~/utils/exhibition/state";

const preload = () =>
  Promise.all(
    [
      "/background/0.png",
      "/background/1.png",
      "/background/comforter.png",
      "/background/corridor.jpg",
      "/background/door.png",
      "/background/light.png",
      "/background/lights.png",
      "/character/0.png",
      "/character/1.png",
      "/character/2.png",
      "/character/3.png",
      "/character/wakeup/0.png",
      "/character/wakeup/1.png",
      "/character/wakeup/2.png",
      "/character/wakeup/3.png",
      "/character/flower.png",
      "/character/water.png",
      "/creamsoda/background.png",
      "/creamsoda/flower.png",
      "/creamsoda/water.png",
      "/effects/twinkle/0.png",
      "/effects/twinkle/1.png",
      "/effects/twinkle/2.png",
      "/effects/twinkle/3.png",
      "/effects/twinkle/4.png",
      "/effects/twinkle/5.png",
      "/foreground/creamsoda/flower.png",
      "/foreground/creamsoda/water.png",
      "/foreground/bag.png",
      "/foreground/book.png",
      "/foreground/corridor.png",
      "/foreground/creamsoda.png",
      "/foreground/door.jpg",
      "/foreground/garbage.png",
      "/items/key.png",
    ]
      .map((url) => `/exhibition/2d/night${url}`)
      .concat([
        "/exhibition/2d/pickable/0.png",
        "/exhibition/2d/pickable/1.png",
        "/exhibition/2d/pickable/2.png",
        "/exhibition/2d/pickable/3.png",
        "/exhibition/2d/cherry.png",
      ])
      .map((url) => fetch(url))
  );

// Components

const clickable = css`
  cursor: pointer;
  transition: ${Mixin.ANIMATION_DURATION.seconds}s ease;

  &:hover {
    transform: scale(1.04);
  }
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
      href={`/exhibition/2d/night/character/wakeup/${frame}.png`}
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
  const { orientation } = useScreenOrientation();
  const [ready, setReady] = useState(false);
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

  const handleClickKey = useCallback(() => {
    GA.click("key");
    state.set({ hasKey: true });
    setRestricted(false);
  }, []);

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
    GA.wakeup("night");
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
      setTimeout(
        () => onComplete(selectedCreamSoda),
        Mixin.ANIMATION_DURATION.milliseconds
      );
    }
  }, [onComplete, selectedCreamSoda]);

  useEffect(() => {
    const { hasKey } = state.get();
    setRestricted(!hasKey);

    (async () => {
      try {
        await preload();
      } finally {
        setReady(true);
      }
    })();
  }, []);

  // Render

  return (
    <div
      className={classnames("bg-black h-full w-full", {
        "h-screen w-screen": isMobileSafari && orientation === "landscape",
      })}
    >
      {ready && (
        <div
          className={classnames("absolute h-full w-full", {
            "h-screen w-screen": isMobileSafari && orientation === "landscape",
          })}
          css={fadeIn}
        >
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
            {!wakeup && (
              <Exhibition2dWakeupCaharcter onComplete={handleWakeup} />
            )}
            <Exhibition2dForeground
              creamsoda={selectedCreamSoda}
              restricted={restricted}
              step={step}
            />
          </Exhibition2dCanvas>
          <div
            className="absolute top-0 w-full h-full bg-black opacity-0"
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
                className="object-contain w-full h-full"
                css={creamsoda}
                src="/exhibition/2d/night/creamsoda/background.png"
                style={{ imageRendering: "pixelated" }}
              />
              <div className="absolute top-0 flex w-full h-full cursor-pointer">
                <div className="w-full" onClick={handleClickWaterIceCreamSoda}>
                  <img
                    className="object-contain w-full h-full"
                    css={clickable}
                    src="/exhibition/2d/night/creamsoda/water.png"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
                <div className="w-full" onClick={handleClickFlowerIceCreamSoda}>
                  <img
                    className="object-contain w-full h-full"
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
      )}
    </div>
  );
};
