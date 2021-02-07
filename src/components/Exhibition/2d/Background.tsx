import React from "react";
import { Exhibition2DEffectsTwinkle } from "./Effects/Twinkle";
import { Exhibition2dObject } from "./Object";

export const Exhibition2dBackground: React.FC<{
  restricted: boolean;
  step: number;
}> = React.memo((props) => (
  <>
    <Exhibition2dObject {...props} url="/exhibition/full.png" />
    <Exhibition2dObject {...props} url="/exhibition/background/0.png" />
    <Exhibition2dObject {...props} url="/exhibition/background/1.png" />
    <Exhibition2dObject
      {...props}
      url="/exhibition/background/door.png"
      x={842}
    />
    <Exhibition2dObject {...props} x={1755} y={185}>
      <Exhibition2DEffectsTwinkle />
    </Exhibition2dObject>
  </>
));
