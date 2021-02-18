import { css, keyframes } from "@emotion/react";
import React, { useCallback, useEffect, useState } from "react";
import { Exhibition2dBackground } from "~/components/Exhibition/2d/Background";
import { Exhibition2dCanvas } from "~/components/Exhibition/2d/Canvas";
import { Exhibition2dCharacter } from "~/components/Exhibition/2d/Character";
import { Exhibition2dForeground } from "~/components/Exhibition/2d/Foreground";
import { Exhibition2DItemsKey } from "~/components/Exhibition/2d/Items/Key";
import {
  EXHIBITION_2D_CHARACTER_CENTER_X,
  EXHIBITION_2D_CHARACTER_DEFAULT_DIRECTION,
  EXHIBITION_2D_CHARACTER_HEIGHT,
  EXHIBITION_2D_CHARACTER_MAX_STEP,
  EXHIBITION_2D_CHARACTER_MAX_STEP_WHEN_RESTRICTED,
  EXHIBITION_2D_FADEIN_ANIMATION_DELAY,
  EXHIBITION_2D_FADE_ANIMATION_DURATION,
  EXHIBITION_2D_MOVING_DISTANCE_PER_STEP,
  EXHIBITION_2D_ZOOM_ANIMATION_STEP,
} from "~/constants/exhibition";
import { useKeydown } from "~/hooks/useKeydown";
import { fadeOut, Mixin } from "~/styles/mixin";

// Components

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
      x={146}
      y={117}
      xlinkHref={`/exhibition/wakeup/${frame}.png`}
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

const ExhibitionIndex: React.FC = () => {
  const [restricted, setRestricted] = useState(true);
  const [direction, setDirection] = useState<"left" | "right">(
    EXHIBITION_2D_CHARACTER_DEFAULT_DIRECTION
  );
  const [selectedCreamSoda, setSelectedCreamSoda] = useState<
    "blue" | "flower" | null
  >(null);
  const [step, setStep] = useState(
    EXHIBITION_2D_CHARACTER_CENTER_X / EXHIBITION_2D_MOVING_DISTANCE_PER_STEP
  );
  const [walked, setWalked] = useState(false);
  const [wakeup, setWakeup] = useState(false);
  const [zoom, setZoom] = useState(false);

  const handleClickBlueIceCreamSoda = useCallback(() => {
    if (selectedCreamSoda) {
      return;
    }

    setSelectedCreamSoda("blue");
  }, [selectedCreamSoda]);

  const handleClickFlowerIceCreamSoda = useCallback(() => {
    if (selectedCreamSoda) {
      return;
    }

    setSelectedCreamSoda("flower");
  }, [selectedCreamSoda]);

  const handleClickKey = useCallback(() => setRestricted(false), []);

  const handleMove = useCallback(
    (direction: "left" | "right") => {
      if (walked) {
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
      )
        return;

      setDirection(difference < 0 ? "left" : "right");
      setStep(nextStep);
      setWalked(nextStep >= EXHIBITION_2D_ZOOM_ANIMATION_STEP);
    },
    [restricted, step, walked]
  );

  const handleKeydown = useCallback(
    ({ key }: KeyboardEvent) => {
      if (!wakeup || walked) {
        return;
      }

      let difference = 0;

      if (key === "a" || key === "ArrowLeft") difference = difference - 1;
      if (key === "d" || key === "ArrowRight") difference = difference + 1;
      if (difference === 0) return;

      const nextStep = step + difference;

      if (
        nextStep < 0 ||
        nextStep >
          (restricted
            ? EXHIBITION_2D_CHARACTER_MAX_STEP_WHEN_RESTRICTED
            : EXHIBITION_2D_CHARACTER_MAX_STEP)
      )
        return;

      setDirection(difference < 0 ? "left" : "right");
      setStep(nextStep);
      setWalked(nextStep >= EXHIBITION_2D_ZOOM_ANIMATION_STEP);
    },
    [restricted, step, wakeup, walked]
  );

  const handleWakeup = useCallback(() => {
    setWakeup(true);
  }, []);

  const handleZoom = useCallback(() => {
    setZoom(true);
  }, []);

  useKeydown(handleKeydown);

  // Render

  return (
    <div className="bg-black h-full w-full">
      <div className="absolute h-full w-full" css={fadeIn}>
        <Exhibition2dCanvas
          creamsoda={selectedCreamSoda}
          onMove={handleMove}
          onZoom={handleZoom}
          restricted={restricted}
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
            walked && zoom
              ? selectedCreamSoda
                ? fadeOutImage
                : fadeInImage
              : undefined
          }
          style={{
            display: walked && zoom && !selectedCreamSoda ? "block" : "none",
          }}
        >
          <img
            className="h-full object-contain w-full"
            css={creamsoda}
            src="/exhibition/creamsoda.png"
          />
          <div className="absolute cursor-pointer flex h-full top-0 w-full">
            <div className="w-full" onClick={handleClickBlueIceCreamSoda} />
            <div className="w-full" onClick={handleClickFlowerIceCreamSoda} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionIndex;
