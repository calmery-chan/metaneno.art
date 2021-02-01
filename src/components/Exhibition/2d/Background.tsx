import React from "react";
import { EXHIBITION_2D_HEIGHT } from "~/constants/exhibition";

const defaultProps: Partial<React.SVGProps<SVGImageElement>> = {
  height: EXHIBITION_2D_HEIGHT,
  style: {
    imageRendering: "pixelated",
  },
};

export const Exhibition2dBackground: React.FC<{ step: number }> = React.memo(
  ({ step }) => {
    const position = step * 2;

    return (
      <>
        <image
          {...defaultProps}
          transform={`translate(-${position < 0 ? 0 : position * 0.9} 0)`}
          xlinkHref="/exhibition/background/0.png"
        />
        <image
          {...defaultProps}
          transform={`translate(-${position < 0 ? 0 : position} 0)`}
          xlinkHref="/exhibition/background/1.png"
        />
      </>
    );
  }
);
