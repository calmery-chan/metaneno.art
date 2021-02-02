import React, { useCallback, useState } from "react";
import { Exhibition2dBackground } from "~/components/Exhibition/2d/Background";
import { Exhibition2dCanvas } from "~/components/Exhibition/2d/Canvas";
import { Exhibition2dCharacter } from "~/components/Exhibition/2d/Character";
import { Exhibition2dForeground } from "~/components/Exhibition/2d/Foreground";
import { Exhibition2dItems } from "~/components/Exhibition/2d/Items";
import {
  EXHIBITION_2D_CHARACTER_CENTER_X,
  EXHIBITION_2D_CHARACTER_DEFAULT_DIRECTION,
  EXHIBITION_2D_CHARACTER_MAX_STEP,
  EXHIBITION_2D_CHARACTER_MAX_STEP_WHEN_RESTRICTED,
  EXHIBITION_2D_MOVING_DISTANCE_PER_STEP,
} from "~/constants/exhibition";
import { useKeydown } from "~/hooks/useKeydown";

const ExhibitionIndex: React.FC = () => {
  const [restricted, setRestricted] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">(
    EXHIBITION_2D_CHARACTER_DEFAULT_DIRECTION
  );
  const [step, setStep] = useState(
    EXHIBITION_2D_CHARACTER_CENTER_X / EXHIBITION_2D_MOVING_DISTANCE_PER_STEP
  );

  const handleKeydown = useCallback(
    ({ key }: KeyboardEvent) => {
      let difference = 0;

      if (key === "a" || key === "ArrowLeft") difference = difference - 1;
      if (key === "d" || key === "ArrowRight") difference = difference + 1;
      if (difference === 0) return;

      const nextStep = step + difference;
      console.log(nextStep);

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
    },
    [restricted, step]
  );

  useKeydown(handleKeydown);

  // Render

  return (
    <div className="bg-black h-full w-full">
      <Exhibition2dCanvas>
        <Exhibition2dBackground restricted={restricted} step={step} />
        <Exhibition2dItems restricted={restricted} step={step} />
        <Exhibition2dCharacter
          direction={direction}
          restricted={restricted}
          step={step}
        />
        <Exhibition2dForeground restricted={restricted} step={step} />
      </Exhibition2dCanvas>
    </div>
  );
};

export default ExhibitionIndex;
