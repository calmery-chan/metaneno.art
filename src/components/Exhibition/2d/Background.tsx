import React from "react";
import { Exhibition2dObject } from "./Object";

export const Exhibition2dBackground: React.FC<{
  restricted: boolean;
  step: number;
  wakeup: boolean;
}> = React.memo((props) => (
  <>
    <Exhibition2dObject
      {...props}
      url="/exhibition/2d/night/background/0.png"
    />
    <Exhibition2dObject
      {...props}
      url="/exhibition/2d/night/background/1.png"
    />
    {props.wakeup && (
      <Exhibition2dObject
        {...props}
        x={128}
        url="/exhibition/2d/night/background/comforter.png"
      />
    )}
    <Exhibition2dObject
      {...props}
      x={885}
      url="/exhibition/2d/night/background/corridor.jpg"
    />
    <Exhibition2dObject
      {...props}
      url="/exhibition/2d/night/background/lights.png"
    />
    {!props.restricted && (
      <Exhibition2dObject
        {...props}
        url="/exhibition/2d/night/background/light.png"
        x={0}
      />
    )}
    <Exhibition2dObject
      {...props}
      url="/exhibition/2d/night/background/door.png"
      x={842}
    />
  </>
));
