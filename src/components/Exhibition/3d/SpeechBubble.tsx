import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Exhibition3dSpeechBubbleCanvasContainer } from "./SpeechBubble/CanvasContainer";
import { bounceIn } from "~/styles/animations";

// Constants

const EXHIBITION_3D_CANVAS_HEIGHT = 300;
const EXHIBITION_3D_CANVAS_WIDTH = 400;

const MARGIN = 8;

/* --- Background --- */

const BACKGROUND_ORIGINAL_HEIGHT = 214;
const BACKGROUND_ORIGINAL_WIDTH = 1152;

const BACKGROUND_WIDTH = EXHIBITION_3D_CANVAS_WIDTH - MARGIN * 2;
const BACKGROUND_HEIGHT =
  (BACKGROUND_ORIGINAL_HEIGHT * BACKGROUND_WIDTH) / BACKGROUND_ORIGINAL_WIDTH;

const BACKGROUND_X = MARGIN;
const BACKGROUND_Y = EXHIBITION_3D_CANVAS_HEIGHT - BACKGROUND_HEIGHT - MARGIN;

const Background: React.FC = () => (
  <image
    height={BACKGROUND_HEIGHT}
    width={BACKGROUND_WIDTH}
    x={BACKGROUND_X}
    xlinkHref="/exhibition/3d/bubble/background.png"
    y={BACKGROUND_Y}
  />
);

/* --- Text --- */

const TEXT_FONT_SIZE = 10;

const Text: React.FC = ({ children }) => (
  <text
    dominantBaseline="hanging"
    fill="#7E395B"
    fontFamily="Uzura"
    fontSize={TEXT_FONT_SIZE}
  >
    {children}
  </text>
);

/* --- Name --- */

const NAME_ORIGINAL_HEIGHT = 83;
const NAME_ORIGINAL_WIDTH = 192;

const NAME_WIDTH = 64;
const NAME_HEIGHT = (NAME_ORIGINAL_HEIGHT * NAME_WIDTH) / NAME_ORIGINAL_WIDTH;

const NAME_X = MARGIN * 3;
const NAME_Y = BACKGROUND_Y - NAME_HEIGHT / 2;

const NAME_OFFSET_Y = 1.5;
const NAME_TEXT_OFFSET_X = 5;

const Name = React.memo<{ children: string }>(({ children }) => {
  const x = useMemo(() => {
    if (children.length > 5) {
      return 0;
    }

    return NAME_TEXT_OFFSET_X + (TEXT_FONT_SIZE / 2) * (5 - children.length);
  }, [children]);

  const y = useMemo(() => {
    return (NAME_HEIGHT - TEXT_FONT_SIZE) / 2 + NAME_OFFSET_Y;
  }, []);

  return (
    <g transform={`translate(${NAME_X}, ${NAME_Y})`}>
      <image
        height={NAME_HEIGHT}
        width={NAME_WIDTH}
        xlinkHref="/exhibition/3d/bubble/name.png"
      />
      <g transform={`translate(${x}, ${y})`}>
        <Text>{children}</Text>
      </g>
    </g>
  );
});

/* --- Message --- */

const MESSAGE_X = BACKGROUND_X + MARGIN * 5;
const MESSAGE_Y = BACKGROUND_Y + MARGIN * 3;

const Message = React.memo<{ children: string }>(({ children }) => {
  return (
    <>
      <g transform={`translate(${MESSAGE_X}, ${MESSAGE_Y})`}>
        <Text>{children.slice(0, 30)}</Text>
      </g>
      <g
        transform={`translate(${MESSAGE_X}, ${
          MESSAGE_Y + TEXT_FONT_SIZE + MARGIN / 2
        })`}
      >
        <Text>{children.slice(30, 60)}</Text>
      </g>
    </>
  );
});

/* --- Types --- */

type Scenario = {
  animation?: string;
  branches?: [
    {
      message: string;
      scenarios: Scenario[];
    }
  ];
  message: string;
};

export const Exhibition3dSpeechBubble: React.FC<{
  scenarios: Scenario[];
  onChangeAnimation: (animation: string) => void;
  onComplete: () => void;
}> = ({ scenarios, onChangeAnimation, onComplete }) => {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [characterTimer, setCharacterTimer] = useState<number | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const scenario = scenarios[scenarioIndex]!;

  useEffect(() => {
    const scenario = scenarios[scenarioIndex];

    if (scenario && scenario.animation) {
      onChangeAnimation(scenario.animation);
    }
  }, [onChangeAnimation, scenarioIndex]);

  useEffect(() => {
    if (characterCount >= scenario.message.length) {
      return;
    }

    setCharacterTimer(
      window.setTimeout(() => {
        setCharacterCount(characterCount + 1);
      }, 80)
    );
  }, [characterCount, scenario]);

  // Events

  const handleOnClickSpeechBubble = useCallback(() => {
    if (characterCount >= scenario.message.length) {
      const nextScenarioIndex = scenarioIndex + 1;
      const scenario = scenarios[nextScenarioIndex];

      if (!scenario) {
        onComplete();
      } else {
        setScenarioIndex(nextScenarioIndex);
        setCharacterCount(0);
      }

      return;
    }

    if (characterTimer) {
      clearTimeout(characterTimer);
    }

    setCharacterCount(scenario.message.length);
  }, [
    scenarioIndex,
    characterCount,
    scenarios.length,
    scenario.message,
    characterTimer,
  ]);

  // Render

  return (
    <div className="bottom-0 cursor-pointer fixed h-full left-0 right-0 select-none top-0 w-full">
      <Exhibition3dSpeechBubbleCanvasContainer>
        <svg
          css={bounceIn}
          onClick={handleOnClickSpeechBubble}
          viewBox={`0 0 ${EXHIBITION_3D_CANVAS_WIDTH} ${EXHIBITION_3D_CANVAS_HEIGHT}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <Background />
          <Name>ノネメちあ</Name>
          <Message>{scenario.message.slice(0, characterCount)}</Message>
        </svg>
      </Exhibition3dSpeechBubbleCanvasContainer>
    </div>
  );
};
