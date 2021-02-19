import React from "react";
import { Exhibition2dMorningObject } from "./Object";

export const Exhibition2dMorningBackground: React.FC<{
  step: number;
}> = React.memo((props) => (
  <>
    <Exhibition2dMorningObject
      {...props}
      url="/exhibition/2d/morning/background/0.png"
    />
    <Exhibition2dMorningObject
      {...props}
      url="/exhibition/2d/morning/background/base.png"
    />
  </>
));
