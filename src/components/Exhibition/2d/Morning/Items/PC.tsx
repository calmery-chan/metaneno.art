import React, { useEffect, useState } from "react";
import { Exhibition2DPickable } from "../../Pickable";
import { Exhibition2dMorningObject } from "../Object";
import {
  EXHIBITION_2D_CANVAS_HEIGHT,
  EXHIBITION_2D_PICKABLE_STEP_RANGE,
  EXHIBITION_2D_PICKABLE_WIDTH,
} from "~/constants/exhibition";

const KEY_IMAGE_HEIGHT = 345;
const KEY_IMAGE_WIDTH = 178;
const KEY_HEIGHT = EXHIBITION_2D_CANVAS_HEIGHT;
const KEY_WIDTH = (KEY_IMAGE_WIDTH * KEY_HEIGHT) / KEY_IMAGE_HEIGHT;

export const Exhibition2dItemsPc = React.memo<{
  onClick: () => void;
  step: number;
}>(({ onClick, step: currentStep }) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextFrame = frame + 1;

      setFrame(nextFrame < 2 ? nextFrame : 0);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [frame]);

  const isPickable = currentStep <= EXHIBITION_2D_PICKABLE_STEP_RANGE;

  return (
    <Exhibition2dMorningObject
      onClick={isPickable ? onClick : undefined}
      step={currentStep}
      url={`/exhibition/2d/morning/items/pc/${frame}.png`}
      x={0}
    >
      {isPickable && (
        <Exhibition2DPickable
          x={(KEY_WIDTH - EXHIBITION_2D_PICKABLE_WIDTH) / 2}
          y={190}
        />
      )}
    </Exhibition2dMorningObject>
  );
});
