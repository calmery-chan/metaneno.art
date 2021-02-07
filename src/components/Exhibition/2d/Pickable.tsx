import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import {
  EXHIBITION_2D_PICKABLE_MAX_FRAME_COUNT,
  EXHIBITION_2D_PICKABLE_ANIMATION_DURATION,
  EXHIBITION_2D_PICKABLE_HEIGHT,
  EXHIBITION_2D_PICKABLE_WIDTH,
} from "~/constants/exhibition";

const pickable = css`
  image-rendering: pixelated;
`;

export const Exhibition2DPickable = React.memo<{ x: number; y: number }>(
  ({ x, y }) => {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => {
        const nextFrame = frame + 1;

        setFrame(
          nextFrame < EXHIBITION_2D_PICKABLE_MAX_FRAME_COUNT ? nextFrame : 0
        );
      }, EXHIBITION_2D_PICKABLE_ANIMATION_DURATION);

      return () => {
        clearTimeout(timer);
      };
    }, [frame]);

    return (
      <image
        css={pickable}
        height={EXHIBITION_2D_PICKABLE_HEIGHT}
        width={EXHIBITION_2D_PICKABLE_WIDTH}
        x={x}
        xlinkHref={`/exhibition/pickable/${frame}.png`}
        y={y}
      />
    );
  }
);
