import React from "react";
import { Exhibition2dObject } from "../Object";
import { Exhibition2DPickable } from "../Pickable";
import {
  EXHIBITION_2D_CANVAS_HEIGHT,
  EXHIBITION_2D_MOVING_DISTANCE_PER_STEP,
  EXHIBITION_2D_PICKABLE_STEP_RANGE,
  EXHIBITION_2D_PICKABLE_WIDTH,
} from "~/constants/exhibition";

const KEY_IMAGE_HEIGHT = 534;
const KEY_IMAGE_WIDTH = 184;
const KEY_HEIGHT = EXHIBITION_2D_CANVAS_HEIGHT;
const KEY_WIDTH = (KEY_IMAGE_WIDTH * KEY_HEIGHT) / KEY_IMAGE_HEIGHT;

export const Exhibition2DItemsKey = React.memo<{
  onClick: () => void;
  restricted: boolean;
  step: number;
  x: number;
}>(({ onClick, restricted, step: currentStep, x }) => {
  if (!restricted) {
    return null;
  }

  const step = x / EXHIBITION_2D_MOVING_DISTANCE_PER_STEP;
  const isPickable =
    step - EXHIBITION_2D_PICKABLE_STEP_RANGE <= currentStep &&
    currentStep <= step + EXHIBITION_2D_PICKABLE_STEP_RANGE;

  return (
    <Exhibition2dObject
      onClick={isPickable ? onClick : undefined}
      restricted={restricted}
      step={currentStep}
      url="/exhibition/2d/night/items/key.png"
      x={520}
    >
      {isPickable && (
        <Exhibition2DPickable
          x={(KEY_WIDTH - EXHIBITION_2D_PICKABLE_WIDTH) / 2}
          y={190}
        />
      )}
    </Exhibition2dObject>
  );
});
