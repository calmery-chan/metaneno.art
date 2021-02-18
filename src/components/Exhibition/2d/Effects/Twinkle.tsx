import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";

const EXHIBITION_2D_PICKABLE_ANIMATION_DURATION = 0.2 * 1000;
const EXHIBITION_2D_PICKABLE_IMAGE_HEIGHT = 20;
const EXHIBITION_2D_PICKABLE_IMAGE_WIDTH = 42;
const EXHIBITION_2D_PICKABLE_HEIGHT = EXHIBITION_2D_PICKABLE_IMAGE_HEIGHT * 2.5;
const EXHIBITION_2D_PICKABLE_MAX_FRAME_COUNT = 5;
const EXHIBITION_2D_PICKABLE_WIDTH = EXHIBITION_2D_PICKABLE_IMAGE_WIDTH * 2.5;

const pickable = css`
  image-rendering: pixelated;
`;

export const Exhibition2DEffectsTwinkle = React.memo(() => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const nextFrame = frame + 1;

      setFrame(
        nextFrame < EXHIBITION_2D_PICKABLE_MAX_FRAME_COUNT ? nextFrame : 0
      );
    }, EXHIBITION_2D_PICKABLE_ANIMATION_DURATION);
  }, [frame]);

  return (
    <image
      css={pickable}
      height={EXHIBITION_2D_PICKABLE_HEIGHT}
      width={EXHIBITION_2D_PICKABLE_WIDTH}
      xlinkHref={`/exhibition/2d/night/effects/twinkle/${frame}.png`}
    />
  );
});
