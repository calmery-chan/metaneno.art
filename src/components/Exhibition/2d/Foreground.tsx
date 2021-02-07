import React from "react";
import { Exhibition2DEffectsTwinkle } from "./Effects/Twinkle";
import { Exhibition2dObject } from "./Object";

export const Exhibition2dForeground: React.FC<{
  creamsoda: "blue" | "flower" | null;
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
      url="/exhibition/foreground/door.jpg"
      x={822}
    />
    <Exhibition2dObject
      {...props}
      x={885}
      url="/exhibition/foreground/corridor.png"
    />
    {props.creamsoda ? (
      <Exhibition2dObject
        {...props}
        x={1758}
        url={`/exhibition/foreground/creamsoda/${props.creamsoda}.png`}
      />
    ) : (
      <Exhibition2dObject
        {...props}
        x={1758}
        url="/exhibition/foreground/creamsoda.png"
      />
    )}
    <Exhibition2dObject {...props} x={1755} y={185}>
      <Exhibition2DEffectsTwinkle />
    </Exhibition2dObject>
  </>
));
