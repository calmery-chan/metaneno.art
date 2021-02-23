import { css, keyframes } from "@emotion/react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Exhibition2dMorningBackground } from "./Morning/Background";
import {
  Exhibition2dCurtainClosed,
  Exhibition2dCurtainOpened,
} from "./Morning/Curtain";
import { Exhibition2dItemsBag } from "./Morning/Items/Bag";
import { Exhibition2dItemsBed } from "./Morning/Items/Bed";
import { Exhibition2dItemsCheki } from "./Morning/Items/Cheki";
import { Exhibition2dItemsLetter } from "./Morning/Items/Letter";
import { Exhibition2dItemsPc } from "./Morning/Items/PC";
import { Exhibition2dItemsPoster } from "./Morning/Items/Poster";
import { getObjectX } from "./Morning/Object";
import { Exhibition2dSpeechBubble } from "./SpeechBubble";
import { Exhibition2dCanvas } from "~/components/Exhibition/2d/Canvas";
import {
  Exhibition2dCharacter,
  getCharacterX,
} from "~/components/Exhibition/2d/Character";
import {
  EXHIBITION_2D_CHARACTER_HEIGHT,
  EXHIBITION_2D_CHARACTER_MAX_STEP_WHEN_MORNING,
} from "~/constants/exhibition";
import { ChekiScenario } from "~/domains/cheki/models";
import { useKeydown, useKeyup } from "~/hooks/useKeyboard";
import { fadeIn } from "~/styles/animations";

const preload = () =>
  Promise.all(
    [
      "/background/curtain/close/0.png",
      "/background/curtain/close/1.png",
      "/background/curtain/open/0.png",
      "/background/curtain/open/1.png",
      "/background/curtain/open/2.png",
      "/background/lights/0.png",
      "/background/lights/1.png",
      "/background/lights/2.png",
      "/background/0.png",
      "/background/furniture.png",
      "/character/0.png",
      "/character/1.png",
      "/character/2.png",
      "/character/3.png",
      "/character/sleep/0.png",
      "/character/sleep/1.png",
      "/character/sleep/2.png",
      "/character/sleep/3.png",
      "/character/wakeup/0.png",
      "/character/wakeup/1.png",
      "/character/wakeup/2.png",
      "/character/wakeup/3.png",
      "/items/pc/0.png",
      "/items/pc/1.png",
      "/items/bag.png",
      "/items/cheki.png",
      "/items/letter.png",
      "/items/poster.png",
    ]
      .map((url) => `/exhibition/2d/morning${url}`)
      .concat([
        "/exhibition/2d/pickable/0.png",
        "/exhibition/2d/pickable/1.png",
        "/exhibition/2d/pickable/2.png",
        "/exhibition/2d/pickable/3.png",
        "/exhibition/2d/cherry.png",
      ])
      .map((url) => fetch(url))
  );

const fadeOutKeyframes = keyframes`
  from {
    opacity: 1;
  }

  66% {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const SLEEP_ANIMATION_SPEED = 4800;

const fadeOut = css`
  animation: ${fadeOutKeyframes} 4.8s ease forwards;
`;

const Exhibition2dSleepCharacter: React.FC<{ step: number }> = ({ step }) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (frame > 2) {
        return;
      }

      setFrame(frame + 1);
    }, 800);
  }, [frame]);

  return (
    <image
      height={EXHIBITION_2D_CHARACTER_HEIGHT}
      style={{ imageRendering: "pixelated" }}
      x={
        frame === 0 ? getCharacterX(false, step, true) : getObjectX(step) + 109
      }
      y={116.5}
      href={`/exhibition/2d/morning/character/sleep/${frame}.png`}
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
      href={`/exhibition/2d/morning/character/wakeup/${frame}.png`}
    />
  );
};

// Main

export const Exhibition2dMorning: React.FC = () => {
  const { push } = useRouter();
  const [ready, setReady] = useState(false);
  const [isOpenedCurtain, setIsOpenedCurtain] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [step, setStep] = useState(190);
  const [isMoving, setIsMoving] = useState(false);
  const [scenarios, setScenarios] = useState<
    | (ChekiScenario & {
        confirm?: {
          enter: string;
          cancel: string;
        };
      })[]
    | null
  >(null);
  const [wokeUp, setWorkUp] = useState(false);
  const [sleep, setSleep] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await preload();
      } finally {
        setReady(true);
      }
    })();
  }, []);

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
    if (sleep || !wokeUp) {
      return;
    }

    let difference = 0;
    if (direction === "left") difference = difference - 1;
    if (direction === "right") difference = difference + 1;
    if (difference === 0) return;

    const nextStep = step + difference;

    if (
      nextStep < 0 ||
      nextStep > EXHIBITION_2D_CHARACTER_MAX_STEP_WHEN_MORNING
    ) {
      return;
    }

    setStep(nextStep);
  }, [direction, sleep, step, wokeUp]);

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
  }, []);

  // Click

  const handleClickPc = useCallback(() => {
    setScenarios([
      {
        message:
          "画面には可愛いサイトが開かれていて、グッズが紹介されている。イラスト本、アクリルキーホルダー、シール………などなど。",
      },
    ]);
  }, []);

  const handleClickPoster = useCallback(() => {
    setScenarios([
      {
        message: "ポスターだ。制服の女の子と天使の女の子が描いてある。",
      },
    ]);
  }, []);

  const handleClickLetter = useCallback(() => {
    setScenarios([
      {
        message:
          "手紙だ。中身は”あなたにとって良い現実逃避の時間となりましたように。”…と書いてある。",
      },
    ]);
  }, []);

  const handleClickBag = useCallback(() => {
    setScenarios([
      {
        message: "カバンに教科書を入れておこう…",
      },
    ]);
  }, []);

  const handleClickCheki = useCallback(() => {
    setScenarios([
      {
        message: "チェキだ。天使の女の子が写っている。",
      },
    ]);
  }, []);

  const handleClickBed = useCallback(() => {
    setScenarios([
      {
        confirm: {
          enter: "寝る",
          cancel: "寝ない",
        },
        message: "もうひと眠りしようかな…",
      },
    ]);
  }, []);

  const handleOnEnter = useCallback(() => {
    setSleep(true);

    setTimeout(() => {
      push("/");
    }, SLEEP_ANIMATION_SPEED);
  }, []);

  const handleClickCurtain = useCallback(() => {
    setIsOpenedCurtain(!isOpenedCurtain);
  }, [isOpenedCurtain]);

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

  const isInteracting = !wokeUp || !!scenarios || sleep;

  return (
    <div className="bg-black h-screen w-screen">
      {ready && (
        <div
          className="absolute h-screen w-screen"
          css={sleep ? fadeOut : fadeIn}
        >
          <Exhibition2dCanvas
            creamsoda={null}
            onComplete={() => undefined}
            onMove={handleTouchMove}
            onMoveEnd={handleTouchMoveEnd}
            walked={false}
          >
            <Exhibition2dMorningBackground step={step} />
            {!isOpenedCurtain && (
              <Exhibition2dCurtainClosed
                isInteracting={isInteracting}
                onClick={handleClickCurtain}
                step={step}
              />
            )}
            {isOpenedCurtain && (
              <Exhibition2dCurtainOpened
                isInteracting={isInteracting}
                onClick={handleClickCurtain}
                step={step}
              />
            )}
            <Exhibition2dItemsPc
              isInteracting={isInteracting}
              onClick={handleClickPc}
              step={step}
            />
            <Exhibition2dItemsPoster
              isInteracting={isInteracting}
              onClick={handleClickPoster}
              step={step}
            />
            <Exhibition2dItemsCheki
              isInteracting={isInteracting}
              onClick={handleClickCheki}
              step={step}
            />
            <Exhibition2dItemsBed
              isInteracting={isInteracting}
              onClick={handleClickBed}
              step={step}
            />
            {wokeUp && !sleep && (
              <Exhibition2dCharacter
                morning
                creamsoda={null}
                direction={direction}
                restricted={false}
                step={step}
              />
            )}
            {!wokeUp && (
              <Exhibition2dWakeupCaharcter onComplete={handleWokeUp} />
            )}
            {sleep && <Exhibition2dSleepCharacter step={step} />}
            <Exhibition2dItemsLetter
              isInteracting={isInteracting}
              onClick={handleClickLetter}
              step={step}
            />
            <Exhibition2dItemsBag
              isInteracting={isInteracting}
              onClick={handleClickBag}
              step={step}
            />
          </Exhibition2dCanvas>
          {!sleep && scenarios && (
            <Exhibition2dSpeechBubble
              scenarios={scenarios}
              onComplete={handleCompleteScenarios}
              onEnter={handleOnEnter}
            />
          )}
        </div>
      )}
    </div>
  );
};
