import React, { useEffect, useState } from "react";
import { Exhibition2dMorningObject } from "./Object";
import { EXHIBITION_2D_CANVAS_HEIGHT } from "~/constants/exhibition";

export const Exhibition2dCurtainOpened = React.memo<{
  isInteracting: boolean;
  onClick: () => void;
  step: number;
}>(({ isInteracting, onClick, step }) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextFrame = frame + 1;

      setFrame(nextFrame < 3 ? nextFrame : frame);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [frame]);

  return (
    <>
      <Exhibition2dMorningObject
        height={EXHIBITION_2D_CANVAS_HEIGHT}
        onClick={onClick}
        step={step}
        url={`/exhibition/2d/morning/background/lights/${frame}.png`}
        x={0}
      />
      <Exhibition2dMorningObject
        height={100}
        onClick={!isInteracting ? onClick : undefined}
        step={step}
        url={`/exhibition/2d/morning/background/curtain/open/${frame}.png`}
        x={389}
        y={63}
      />
    </>
  );
});

export const Exhibition2dCurtainClosed = React.memo<{
  isInteracting: boolean;
  onClick: () => void;
  step: number;
}>(({ isInteracting, onClick, step }) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextFrame = frame + 1;

      setFrame(nextFrame < 2 ? nextFrame : 0);
    }, 600);

    return () => {
      clearTimeout(timer);
    };
  }, [frame]);

  return (
    <Exhibition2dMorningObject
      height={100}
      onClick={!isInteracting ? onClick : undefined}
      step={step}
      url={`/exhibition/2d/morning/background/curtain/close/${frame}.png`}
      x={385}
      y={63}
    />
  );
});
