import React from "react";
import { Exhibition2dObject } from "./Object";

export const Exhibition2dForeground: React.FC<{ step: number }> = React.memo(
  ({ step }) => (
    <>
      <Exhibition2dObject
        speed={1.2}
        step={step}
        url="/exhibition/foreground/garbage.png"
        x={96}
      />
      <Exhibition2dObject
        speed={1.1}
        step={step}
        url="/exhibition/foreground/bag.png"
        x={435}
      />
      <Exhibition2dObject
        speed={1.25}
        step={step}
        url="/exhibition/foreground/book.png"
        x={520}
      />
      <Exhibition2dObject
        step={step}
        url="/exhibition/foreground/door.png"
        x={822}
      />
    </>
  )
);
