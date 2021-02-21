import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Exhibition3dSpeechBubbleCanvasContainer } from "./SpeechBubble/CanvasContainer";
import { bounceIn, bounceOut, fadeIn, fadeOut } from "~/styles/animations";
import { Mixin } from "~/styles/mixin";
import { Scenario } from "~/types/exhibition";

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

const Text: React.FC<{ center?: boolean; size?: number }> = ({
  center = false,
  children,
  size,
}) => (
  <text
    dominantBaseline="central"
    fill="#7E395B"
    fontFamily="Uzura"
    fontSize={size || TEXT_FONT_SIZE}
    textAnchor={center ? "middle" : "start"}
    x={center ? "50%" : undefined}
    y="50%"
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

const Name = React.memo<{ children: string }>(({ children }) => (
  <svg height={NAME_HEIGHT} width={NAME_WIDTH} x={NAME_X} y={NAME_Y}>
    <image
      height="100%"
      width="100%"
      xlinkHref="/exhibition/3d/bubble/name.png"
    />
    <Text center>{children}</Text>
  </svg>
));

/* --- Message --- */

const MESSAGE_X = BACKGROUND_X + MARGIN * 5;
const MESSAGE_Y = BACKGROUND_Y + MARGIN * 3;

const Message = React.memo<{ children: string; size?: number }>(
  ({ children }) => {
    return (
      <>
        <svg
          x={MESSAGE_X}
          y={MESSAGE_Y}
          height={TEXT_FONT_SIZE}
          width={TEXT_FONT_SIZE * 30}
        >
          <Text>{children.slice(0, 30)}</Text>
        </svg>
        <svg
          x={MESSAGE_X}
          y={MESSAGE_Y + TEXT_FONT_SIZE + MARGIN / 2}
          height={TEXT_FONT_SIZE}
          width={TEXT_FONT_SIZE * 30}
        >
          <Text>{children.slice(30, 60)}</Text>
        </svg>
      </>
    );
  }
);

/* --- Choice --- */

const CHOICE_ORIGINAL_HEIGHT = 71;
const CHOICE_ORIGINAL_WIDTH = 384;
const CHOICE_MAXIMUM_WIDTH = 128;

const Choices = React.memo<{
  messages: string[];
  onClick: (index: number) => void;
}>(({ messages, onClick }) => {
  const [chose, setChose] = useState<number | null>(null);

  const width = useMemo(() => {
    const maximumWidth =
      EXHIBITION_3D_CANVAS_WIDTH - MARGIN * messages.length - MARGIN * 2;
    const currentChoiceWidth = maximumWidth / messages.length;

    if (currentChoiceWidth < CHOICE_MAXIMUM_WIDTH) {
      return currentChoiceWidth;
    }

    return CHOICE_MAXIMUM_WIDTH;
  }, [messages.length]);

  const height = useMemo(() => {
    return CHOICE_ORIGINAL_HEIGHT * (width / CHOICE_ORIGINAL_WIDTH);
  }, [width]);

  const x = useMemo(() => {
    return (
      (EXHIBITION_3D_CANVAS_WIDTH -
        width * messages.length -
        MARGIN * (messages.length - 1)) /
      2
    );
  }, [messages.length, width]);

  const y = useMemo(() => {
    return NAME_Y - height - MARGIN;
  }, [height]);

  const handleClickMessage = useCallback(
    (event: React.MouseEvent, index: number) => {
      event.preventDefault();
      event.stopPropagation();
      setChose(index);
    },
    [onClick]
  );

  useEffect(() => {
    if (chose !== null) {
      setTimeout(() => {
        setChose(null);
        onClick(chose);
      }, Mixin.ANIMATION_DURATION.milliseconds);
    }
  }, [chose, onClick]);

  return (
    <>
      {messages.map((message, index) => (
        <svg
          className="cursor-pointer"
          css={chose !== null ? fadeOut : fadeIn}
          key={index}
          height={height}
          onClick={(event) => handleClickMessage(event, index)}
          width={width}
          x={x + (width + MARGIN) * index}
          y={y}
        >
          <image
            height="100%"
            width="100%"
            xlinkHref="/exhibition/3d/bubble/choice.png"
          />
          <Text center size={6}>
            {message}
          </Text>
        </svg>
      ))}
    </>
  );
});

// Components

export const Exhibition3dSpeechBubble: React.FC<{
  onChangeActions: (actions: string[]) => void;
  onChangeAnimations: (animations: string[][]) => void;
  onComplete: () => void;
  scenarios: Scenario[];
}> = ({
  onChangeActions,
  onChangeAnimations,
  onComplete,
  scenarios: _scenarios,
}) => {
  const [characterCount, setCharacterCount] = useState(0);
  const [characterTimer, setCharacterTimer] = useState<number | null>(null);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [isChoosing, setIsChoosing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>(_scenarios);

  const scenario: Scenario | undefined = scenarios[currentScenarioIndex];

  // Side Effects

  useEffect(() => {
    setScenarios(_scenarios);
  }, [_scenarios]);

  useEffect(() => {
    if (characterTimer) {
      window.clearTimeout(characterTimer);
    }

    setCharacterCount(0);
    setCharacterTimer(null);
    setCurrentScenarioIndex(0);
    setIsChoosing(!!scenarios[0]?.branches);

    if (!scenarios.length) {
      setIsCompleted(true);
    }
  }, [scenarios]);

  useEffect(() => {
    if (isCompleted) {
      setTimeout(onComplete, Mixin.ANIMATION_DURATION.milliseconds);
    }
  }, [isCompleted, onComplete]);

  useEffect(() => {
    if (scenario && scenario.animations) {
      console.log("Change Animations:", JSON.stringify(scenario.animations));
      onChangeAnimations(scenario.animations);
    }

    if (scenario && scenario.actions) {
      console.log("Change Actions:", JSON.stringify(scenario.actions));
      onChangeActions(scenario.actions);
    }

    if (scenario && scenario.name !== undefined) {
      setName(scenario.name);
    }
  }, [onChangeActions, onChangeAnimations, scenario]);

  useEffect(() => {
    if (!scenario || characterCount >= scenario.message.length) {
      return;
    }

    const timer = window.setTimeout(() => {
      setCharacterCount(characterCount + 1);
    }, 80);

    setCharacterTimer(timer);

    return () => {
      window.clearTimeout(timer);
    };
  }, [characterCount, scenario]);

  // Events

  const handleClick = useCallback(() => {
    if (!scenario) {
      return;
    }

    if (characterCount < scenario.message.length) {
      if (characterTimer) {
        clearTimeout(characterTimer);
      }

      setCharacterCount(scenario.message.length);
      return;
    }

    // 選択肢のある画面ではクリックでメッセージの遷移を行わない
    if (isChoosing) {
      return;
    }

    const nextScenarioIndex = currentScenarioIndex + 1;
    const nextScenario = scenarios[nextScenarioIndex];

    if (!nextScenario) {
      setIsCompleted(true);
      return;
    }

    setCharacterCount(0);
    setCurrentScenarioIndex(nextScenarioIndex);
    setIsChoosing(!!nextScenario.branches);
  }, [
    characterCount,
    characterTimer,
    currentScenarioIndex,
    isChoosing,
    scenario,
    scenarios,
  ]);

  const handleChoice = useCallback(
    (index: number) => {
      if (!scenario) {
        return;
      }

      const { scenarios } = scenario.branches![index];
      setScenarios(scenarios);
    },
    [scenario]
  );

  // Render

  if (!scenario) {
    return null;
  }

  return (
    <div
      className={
        "bottom-0 fixed h-full left-0 right-0 select-none top-0 w-full " +
        (isChoosing ? "cursor-default" : "cursor-pointer")
      }
    >
      <Exhibition3dSpeechBubbleCanvasContainer>
        <svg
          css={isCompleted ? bounceOut : bounceIn}
          onClick={handleClick}
          overflow="visible"
          viewBox={`0 0 ${EXHIBITION_3D_CANVAS_WIDTH} ${EXHIBITION_3D_CANVAS_HEIGHT}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <Background />
          {name && <Name>{name}</Name>}
          <Message>{scenario.message.slice(0, characterCount)}</Message>
          {isChoosing && scenario.branches && (
            <Choices
              messages={scenario.branches!.map(({ message }) => message)}
              onClick={handleChoice}
            />
          )}
        </svg>
      </Exhibition3dSpeechBubbleCanvasContainer>
    </div>
  );
};
