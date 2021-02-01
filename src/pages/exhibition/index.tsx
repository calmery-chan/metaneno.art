import React, { useCallback, useState } from "react";
import { Exhibition2dBackground } from "~/components/Exhibition/2d/Background";
import { Exhibition2dCanvas } from "~/components/Exhibition/2d/Canvas";
import { Exhibition2dCharacter } from "~/components/Exhibition/2d/Character";
import { Exhibition2dForeground } from "~/components/Exhibition/2d/Foreground";
import { EXHIBITION_2D_MAX_STEP } from "~/constants/exhibition";
import { useKeydown } from "~/hooks/useKeydown";

const ExhibitionIndex: React.FC = () => {
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [step, setStep] = useState(0);

  const handleKeydown = useCallback(
    ({ key }: KeyboardEvent) => {
      let difference = 0;

      if (key === "a" || key === "ArrowLeft") difference = difference - 1;
      if (key === "d" || key === "ArrowRight") difference = difference + 1;
      if (difference === 0) return;

      const nextStep = step + difference;

      if (nextStep < 0 || nextStep > EXHIBITION_2D_MAX_STEP) return;

      setDirection(difference < 0 ? "left" : "right");
      setStep(nextStep);
    },
    [step]
  );

  useKeydown(handleKeydown);

  // Render

  return (
    <Exhibition2dCanvas>
      <Exhibition2dBackground step={step} />
      <Exhibition2dCharacter direction={direction} step={step} />
      <Exhibition2dForeground step={step} />
    </Exhibition2dCanvas>
  );
};

export default ExhibitionIndex;
