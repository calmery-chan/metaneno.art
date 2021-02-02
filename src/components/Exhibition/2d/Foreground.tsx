import React from "react";
import { Exhibition2dObject } from "./Object";

export const Exhibition2dForeground: React.FC<{
  restricted: boolean;
  step: number;
}> = React.memo((props) => (
  <>
    <Exhibition2dObject
      {...props}
      speed={1.2}
      url="/exhibition/foreground/garbage.png"
      x={96}
    />
    <Exhibition2dObject
      {...props}
      speed={1.1}
      url="/exhibition/foreground/bag.png"
      x={435}
    />
    <Exhibition2dObject
      {...props}
      speed={1.25}
      url="/exhibition/foreground/book.png"
      x={520}
    />
    <Exhibition2dObject
      {...props}
      url="/exhibition/foreground/door.png"
      x={822}
    />
  </>
));
