import { css, keyframes } from "@emotion/react";
import React, { useCallback, useEffect, useState } from "react";
import { Exhibition2dMorningBackground } from "./Morning/Background";
import { Exhibition2dItemsPc } from "./Morning/Items/PC";
import { Exhibition2dCanvas } from "~/components/Exhibition/2d/Canvas";
import { Exhibition2dCharacter, getCharacterX } from "~/components/Exhibition/2d/Character";
import {
  EXHIBITION_2D_CHARACTER_CENTER_X,
  EXHIBITION_2D_CHARACTER_DEFAULT_DIRECTION,
  EXHIBITION_2D_CHARACTER_HEIGHT,
  EXHIBITION_2D_CHARACTER_MAX_STEP,
  EXHIBITION_2D_CHARACTER_MAX_STEP_WHEN_MORNING,
  EXHIBITION_2D_MOVING_DISTANCE_PER_STEP,
} from "~/constants/exhibition";
import { useKeydown, useKeyup } from "~/hooks/useKeyboard";
import { Exhibition2dSpeechBubble } from "./SpeechBubble";
import { ChekiScenario } from "~/domains/cheki/models";
import { Exhibition2dItemsPoster } from "./Morning/Items/Poster";
import { Exhibition2dItemsLetter } from "./Morning/Items/Letter";
import { Exhibition2dItemsBag } from "./Morning/Items/Bag";
import { Exhibition2dItemsCheki } from "./Morning/Items/Cheki";
import { Exhibition2dItemsBed } from "./Morning/Items/Bed";

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

const Exhibition2dSleepCaharcter: React.FC<{ onComplete: () => void, step: number }> = ({
  onComplete,
  step
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
      800
    );
  }, [frame, onComplete]);

  return (
    <image
      height={EXHIBITION_2D_CHARACTER_HEIGHT}
      style={{ imageRendering: "pixelated" }}
      x={frame === 0 ? getCharacterX(false, step, true) : 109}
      y={116.5}
      xlinkHref={`/exhibition/2d/morning/character/sleep/${frame}.png`}
    />
  );
};

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
      frame === 0 || frame === 1 ? 2400 : 800
    );
  }, [frame, onComplete]);

  return (
    <image
      height={EXHIBITION_2D_CHARACTER_HEIGHT}
      style={{ imageRendering: "pixelated" }}
      x={320}
      y={116.5}
      xlinkHref={`/exhibition/2d/morning/character/wakeup/${frame}.png`}
    />
  );
};

// Main

export const Exhibition2dMorning: React.FC = () => {
  const [direction, setDirection] = useState<"left" | "right">(
    "left"
  );
  const [step, setStep] = useState(190);
  const [isMoving, setIsMoving] = useState(false);
  const [scenarios, setScenarios] = useState<ChekiScenario[] | null>(null);
  const [wokeUp, setWorkUp] = useState(false);
  const [sleep, setSleep] = useState(false);

  const handleKeydown = useCallback(({ key }: KeyboardEvent) => {
    const isLeft = key === "a" || key === "ArrowLeft";
    const isRight = key === "d" || key === "ArrowRight";

    if (isLeft) setDirection("left");
    if (isRight) setDirection("right");

    setIsMoving(isLeft || isRight);
  }, []);

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

  const handleMove = useCallback(() => {
    let difference = 0;
    if (direction === "left") difference = difference - 1;
    if (direction === "right") difference = difference + 1;
    if (difference === 0) return;

    const nextStep = step + difference;

    if (nextStep < 0 || nextStep > EXHIBITION_2D_CHARACTER_MAX_STEP_WHEN_MORNING) {
      return;
    }

    setStep(nextStep);
  }, [direction, step]);

  const handleTouchMove = useCallback((direction) => {
    setDirection(direction);
    setIsMoving(true);
  }, []);

  const handleTouchMoveEnd = useCallback(() => {
    setIsMoving(false);
  }, []);

  const handleCompleteScenarios = useCallback(() => {
    setScenarios(null);
  }, []);

  const handleWokeUp = useCallback(() => {
    setWorkUp(true);
  }, [])

  // Click

  const handleClickPc = useCallback(() => {
    setScenarios([
      {
        "message": "画面には可愛いサイトが開かれていて、グッズが紹介されている。イラスト本、アクリルキーホルダー、シール………などなど。"
      }
    ])
  }, []);

  const handleClickPoster = useCallback(() => {
    setScenarios([
      {
        "message": "ポスターだ。制服の女の子と天使の女の子が描いてある。"
      }
    ])
  }, []);

  const handleClickLetter = useCallback(() => {
    setScenarios([
      {
        message: "手紙だ。中身は”あなたにとって良い現実逃避の時間となりましたように。”…と書いてある。"
      }
    ])
  }, [])

  const handleClickBag = useCallback(() => {
    setScenarios([
      {
        message: "カバンに教科書を入れておこう…"
      }
    ])
  }, []);

  const handleClickCheki = useCallback(() => {
    setScenarios([
      {
        message: "チェキだ。天使の女の子が写っている。"
      }
    ])
  }, []);

  const handleClickBed = useCallback(() => {
    console.log("call")
  }, []);

  // Hooks

  useKeydown(handleKeydown);
  useKeyup(handleKeyup);

  // Side Effects

  useEffect(() => {
    if (isMoving) {
      setTimeout(() => {
        handleMove();
      }, 35);
    }
  }, [isMoving, handleMove]);

  // Render

  return (
    <div className="bg-black h-full w-full">
      <div className="absolute h-full w-full" css={fadeIn}>
        <Exhibition2dCanvas
          creamsoda={null}
          onComplete={() => {}}
          onMove={handleTouchMove}
          onMoveEnd={handleTouchMoveEnd}
          walked={false}
        >
          <Exhibition2dMorningBackground step={step} />
          <Exhibition2dItemsPc isInteracting={!!scenarios} onClick={handleClickPc} step={step} />
          <Exhibition2dItemsPoster isInteracting={!!scenarios} onClick={handleClickPoster} step={step} />
          <Exhibition2dItemsCheki isInteracting={!!scenarios} onClick={handleClickCheki} step={step} />
          <Exhibition2dItemsBed isInteracting={!!scenarios} onClick={handleClickBed} step={step} />
          {wokeUp && !sleep &&<Exhibition2dCharacter
            morning
            creamsoda={null}
            direction={direction}
            restricted={false}
            step={step}
          />}
          {!wokeUp && <Exhibition2dWakeupCaharcter onComplete={handleWokeUp} />}
          {sleep && <Exhibition2dSleepCaharcter onComplete={handleWokeUp} step={step} />}
          <Exhibition2dItemsLetter isInteracting={!wokeUp || !!scenarios} onClick={handleClickLetter} step={step} />
          <Exhibition2dItemsBag isInteracting={!!scenarios} onClick={handleClickBag} step={step} />
        </Exhibition2dCanvas>
        {scenarios && <Exhibition2dSpeechBubble
            scenarios={scenarios}
            onComplete={handleCompleteScenarios}
          />}
      </div>
    </div>
  );
};
