import React from "react";
import { Exhibition2dObject } from "./Object";

export const Exhibition2dBackground: React.FC<{ step: number }> = React.memo(
  ({ step }) => (
    <>
      <Exhibition2dObject step={step} url="/exhibition/full.png" />
      <Exhibition2dObject step={step} url="/exhibition/background/0.png" />
      <Exhibition2dObject step={step} url="/exhibition/background/1.png" />
      <Exhibition2dObject
        step={step}
        url="/exhibition/background/door.png"
        x={842}
      />
    </>
  )
);
