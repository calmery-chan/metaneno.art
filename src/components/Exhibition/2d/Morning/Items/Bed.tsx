import React from "react";
import { Exhibition2DPickable } from "../../Pickable";
import { Exhibition2dMorningObject } from "../Object";
import {
  EXHIBITION_2D_CANVAS_HEIGHT,
  EXHIBITION_2D_MOVING_DISTANCE_PER_STEP,
  EXHIBITION_2D_PICKABLE_STEP_RANGE,
  EXHIBITION_2D_PICKABLE_WIDTH,
} from "~/constants/exhibition";

const X = 100;
const STEP = X / EXHIBITION_2D_MOVING_DISTANCE_PER_STEP;
const MIN_STEP = STEP - EXHIBITION_2D_PICKABLE_STEP_RANGE + 10;
const MAX_STEP = STEP + EXHIBITION_2D_PICKABLE_STEP_RANGE + 10;

export const Exhibition2dItemsBed = React.memo<{
  isInteracting: boolean;
  onClick: () => void;
  step: number;
}>(({ isInteracting, onClick, step: currentStep }) => {
  const isPickable = MIN_STEP <= currentStep && currentStep <= MAX_STEP;

  return (
    <Exhibition2dMorningObject
      height={EXHIBITION_2D_CANVAS_HEIGHT}
      step={currentStep}
      x={X}
    >
      {!isInteracting && isPickable && (
        <Exhibition2DPickable
          x={(172 - EXHIBITION_2D_PICKABLE_WIDTH) / 2 + 8}
          y={170}
        />
      )}
      <rect
        className="cursor-pointer"
        width="172"
        height="100%"
        fillOpacity="0"
        onClick={isPickable && !isInteracting ? onClick : undefined}
      />
    </Exhibition2dMorningObject>
  );
});
