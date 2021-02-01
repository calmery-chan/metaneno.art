import React from "react";
import { EXHIBITION_2D_HEIGHT } from "~/constants/exhibition";

const Image: React.FC<{ speed?: number; step: number; url: string }> = ({
  speed,
  step,
  url,
}) => (
  <image
    height={EXHIBITION_2D_HEIGHT}
    style={{
      imageRendering: "pixelated",
    }}
    transform={`translate(-${step * 4 * (speed || 1)} 0)`}
    xlinkHref={url}
  />
);

export const Exhibition2dBackground: React.FC<{ step: number }> = React.memo(
  ({ step }) => (
    <>
      <Image speed={0.9} step={step} url="/exhibition/background/0.png" />
      <Image step={step} url="/exhibition/background/1.png" />
    </>
  )
);
