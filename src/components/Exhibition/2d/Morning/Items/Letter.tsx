import React, { useEffect, useState } from "react";
import { Exhibition2DPickable } from "../../Pickable";
import { Exhibition2dMorningObject } from "../Object";
import {
  EXHIBITION_2D_CANVAS_HEIGHT,
  EXHIBITION_2D_MOVING_DISTANCE_PER_STEP,
  EXHIBITION_2D_PICKABLE_STEP_RANGE,
  EXHIBITION_2D_PICKABLE_WIDTH,
} from "~/constants/exhibition";

const KEY_IMAGE_HEIGHT = 533;
const KEY_IMAGE_WIDTH = 44;
const KEY_HEIGHT = EXHIBITION_2D_CANVAS_HEIGHT;
const KEY_WIDTH = (KEY_IMAGE_WIDTH * KEY_HEIGHT) / KEY_IMAGE_HEIGHT;
const X = 748;

const STEP = X / EXHIBITION_2D_MOVING_DISTANCE_PER_STEP;
const MIN_STEP = STEP - EXHIBITION_2D_PICKABLE_STEP_RANGE
const MAX_STEP = STEP + EXHIBITION_2D_PICKABLE_STEP_RANGE;

export const Exhibition2dItemsLetter = React.memo<{
  isInteracting: boolean
  onClick: () => void;
  step: number;
}>(({ isInteracting, onClick, step: currentStep }) => {
  const isPickable = MIN_STEP <= currentStep && currentStep <= MAX_STEP;

  return (
    <Exhibition2dMorningObject
      height={EXHIBITION_2D_CANVAS_HEIGHT}
      onClick={isPickable ? onClick : undefined}
      step={currentStep}
      url="/exhibition/2d/morning/items/letter.png"
      x={X}
      y={0.8}
    >
      {!isInteracting && isPickable && <Exhibition2DPickable
          x={(KEY_WIDTH - EXHIBITION_2D_PICKABLE_WIDTH) / 2}
          y={210}
        />}
    </Exhibition2dMorningObject>
  );
});
