import React from "react";
import {
  EXHIBITION_2D_CHARACTER_ANIMATION_FRAME_COUNT,
  EXHIBITION_2D_CHARACTER_HEIGHT,
  EXHIBITION_2D_CHARACTER_BOTTOM_OFFSET,
  EXHIBITION_2D_HEIGHT,
} from "~/constants/exhibition";

export const Exhibition2dCharacter: React.FC<{
  direction: "left" | "right";
  step: number;
}> = React.memo(({ direction, step }) => (
  <image
    height={EXHIBITION_2D_CHARACTER_HEIGHT}
    style={{ imageRendering: "pixelated" }}
    xlinkHref={`/exhibition/character/${Math.floor(
      step % EXHIBITION_2D_CHARACTER_ANIMATION_FRAME_COUNT
    )}.png`}
    y={
      EXHIBITION_2D_HEIGHT -
      EXHIBITION_2D_CHARACTER_HEIGHT -
      EXHIBITION_2D_CHARACTER_BOTTOM_OFFSET
    }
  />
));
