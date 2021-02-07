import React from "react";
import {
  EXHIBITION_2D_CHARACTER_WALKING_ANIMATION_IMAGES,
  EXHIBITION_2D_CHARACTER_HEIGHT,
  EXHIBITION_2D_CHARACTER_FRAME_PER_ANIMATION,
  EXHIBITION_2D_CHARACTER_WIDTH,
  EXHIBITION_2D_CHARACTER_CENTER_Y,
  EXHIBITION_2D_CHARACTER_HORIZONTAL_MARGIN_IN_STEP,
  EXHIBITION_2D_MOVING_DISTANCE_PER_STEP,
  EXHIBITION_2D_CHARACTER_CENTER_X,
  EXHIBITION_2D_BACKGROUND_MAX_STEP,
  EXHIBITION_2D_BACKGROUND_MAX_STEP_WHEN_RESTRICTED,
} from "~/constants/exhibition";

const getCharacterX = (restricted: boolean, step: number) => {
  if (step < EXHIBITION_2D_CHARACTER_HORIZONTAL_MARGIN_IN_STEP) {
    return step * EXHIBITION_2D_MOVING_DISTANCE_PER_STEP;
  }

  const MAX_STEP = restricted
    ? EXHIBITION_2D_BACKGROUND_MAX_STEP_WHEN_RESTRICTED
    : EXHIBITION_2D_BACKGROUND_MAX_STEP;

  if (step > MAX_STEP) {
    return (
      (step - MAX_STEP) * EXHIBITION_2D_MOVING_DISTANCE_PER_STEP +
      EXHIBITION_2D_CHARACTER_CENTER_X
    );
  }

  return EXHIBITION_2D_CHARACTER_CENTER_X;
};

export const Exhibition2dCharacter = React.memo<{
  creamsoda: "blue" | "flower" | null;
  direction: "left" | "right";
  restricted: boolean;
  step: number;
}>(({ creamsoda, direction, restricted, step }) => (
  <svg x={getCharacterX(restricted, step)} y={EXHIBITION_2D_CHARACTER_CENTER_Y}>
    <image
      height={EXHIBITION_2D_CHARACTER_HEIGHT}
      style={{ imageRendering: "pixelated" }}
      transform={
        direction === "left"
          ? `scale(-1 1) translate(-${EXHIBITION_2D_CHARACTER_WIDTH} 0)`
          : ""
      }
      width={EXHIBITION_2D_CHARACTER_WIDTH}
      xlinkHref={
        creamsoda
          ? `/exhibition/character/${creamsoda}.png`
          : EXHIBITION_2D_CHARACTER_WALKING_ANIMATION_IMAGES[
              Math.floor(
                (step %
                  (EXHIBITION_2D_CHARACTER_WALKING_ANIMATION_IMAGES.length *
                    EXHIBITION_2D_CHARACTER_FRAME_PER_ANIMATION)) /
                  EXHIBITION_2D_CHARACTER_FRAME_PER_ANIMATION
              )
            ]
      }
    />
  </svg>
));
