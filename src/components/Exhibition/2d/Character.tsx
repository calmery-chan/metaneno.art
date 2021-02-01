import React from "react";
import {
  EXHIBITION_2D_CHARACTER_ANIMATION_FRAME_COUNT,
  EXHIBITION_2D_CHARACTER_HEIGHT,
  EXHIBITION_2D_CHARACTER_ANIMATION_PER_FRAME,
  EXHIBITION_2D_CHARACTER_WIDTH,
  EXHIBITION_2D_CHARACTER_Y,
  EXHIBITION_2D_CHARACTER_X,
} from "~/constants/exhibition";

export const Exhibition2dCharacter = React.memo<{
  direction: "left" | "right";
  step: number;
}>(({ direction, step }) => (
  <svg x={EXHIBITION_2D_CHARACTER_X} y={EXHIBITION_2D_CHARACTER_Y}>
    <image
      height={EXHIBITION_2D_CHARACTER_HEIGHT}
      style={{ imageRendering: "pixelated" }}
      transform={
        direction === "left"
          ? `scale(-1 1) translate(-${EXHIBITION_2D_CHARACTER_WIDTH} 0)`
          : ""
      }
      width={EXHIBITION_2D_CHARACTER_WIDTH}
      xlinkHref={`/exhibition/character/${Math.floor(
        (step %
          (EXHIBITION_2D_CHARACTER_ANIMATION_FRAME_COUNT *
            EXHIBITION_2D_CHARACTER_ANIMATION_PER_FRAME)) /
          EXHIBITION_2D_CHARACTER_ANIMATION_PER_FRAME
      )}.png`}
    />
  </svg>
));
