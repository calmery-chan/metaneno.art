import React from "react";
import { Exhibition2dObject } from "./Object";

export const Exhibition2dBackground: React.FC<{
  restricted: boolean;
  step: number;
}> = React.memo((props) => (
  <>
    <Exhibition2dObject {...props} url="/exhibition/background/0.png" />
    <Exhibition2dObject {...props} url="/exhibition/background/1.png" />
    <Exhibition2dObject
      {...props}
      x={128}
      url="/exhibition/background/comforter.png"
    />
    <Exhibition2dObject
      {...props}
      x={885}
      url="/exhibition/background/corridor.jpg"
    />
    <Exhibition2dObject {...props} url="/exhibition/background/lights.png" />
    {!props.restricted && (
      <Exhibition2dObject
        {...props}
        url="/exhibition/background/light.png"
        x={0}
      />
    )}
    <Exhibition2dObject
      {...props}
      url="/exhibition/background/door.png"
      x={842}
    />
  </>
));
