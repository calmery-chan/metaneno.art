/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React from "react";
import { ChekiFilter } from "~/constants/cheki";
import { useSelector } from "~/domains";
import { selectors } from "~/domains/cheki";

// Helper Functions

export const getFilterId = (name: string) =>
  `metaneno.art-cheki-filter-${name}`;

export const getGradientId = (id: string) =>
  `metaneno.art-cheki-gradient-${id}`;

// Helper Components
// Reference: https://www.w3.org/TR/filter-effects-1/

const Brightness: React.FC<{ amount: number }> = ({ amount }) => (
  <feComponentTransfer>
    <feFuncR type="linear" slope={amount} />
    <feFuncG type="linear" slope={amount} />
    <feFuncB type="linear" slope={amount} />
  </feComponentTransfer>
);

const Contrast: React.FC<{ amount: number }> = ({ amount }) => (
  <feComponentTransfer>
    <feFuncR type="linear" slope={amount} intercept={-(0.5 * amount) + 0.5} />
    <feFuncG type="linear" slope={amount} intercept={-(0.5 * amount) + 0.5} />
    <feFuncB type="linear" slope={amount} intercept={-(0.5 * amount) + 0.5} />
  </feComponentTransfer>
);

const Filter: React.FC<{ id: string }> = ({ children, id }) => (
  <filter
    filterUnits="objectBoundingBox"
    id={getFilterId(id)}
    colorInterpolationFilters="sRGB"
  >
    {children}
  </filter>
);

const Grayscale: React.FC<{ amount: number }> = ({ amount }) => (
  <feColorMatrix
    type="matrix"
    values={[
      `${0.2126 + 0.7874 * (1 - amount)} ${0.7152 - 0.7152 * (1 - amount)} ${
        0.0722 - 0.0722 * (1 - amount)
      } 0 0`,
      `${0.2126 - 0.2126 * (1 - amount)} ${0.7152 + 0.2848 * (1 - amount)} ${
        0.0722 - 0.0722 * (1 - amount)
      } 0 0`,
      `${0.2126 - 0.2126 * (1 - amount)} ${0.7152 - 0.7152 * (1 - amount)} ${
        0.0722 + 0.9278 * (1 - amount)
      } 0 0`,
      `0 0 0 1 0`,
    ].join(" ")}
  />
);

const HueRotate: React.FC<{ amount: number }> = ({ amount }) => (
  <feColorMatrix type="hueRotate" values={`${amount}`} />
);

const LinearGradient: React.FC<
  React.SVGProps<SVGLinearGradientElement> & { id: string }
> = (props) => <linearGradient {...props} id={getGradientId(props.id)} />;

const RadialGradient: React.FC<
  React.SVGProps<SVGRadialGradientElement> & { id: string }
> = (props) => <radialGradient {...props} id={getGradientId(props.id)} />;

// Types

type ChekiFilterProps = {
  noImage: boolean;
};

// Components

export const Character: React.FC = () => {
  const characterReady = useSelector(selectors.characterReady);
  const { x, y } = useSelector(selectors.image);
  const ready = useSelector(selectors.ready);

  if (!characterReady || !ready) {
    return null;
  }

  const character = useSelector(selectors.character);
  const characterDataUrl = useSelector(selectors.characterDataUrl)!;

  return (
    <svg
      height={character.height}
      overflow="visible"
      viewBox={`0 0 ${character.width} ${character.height}`}
      width={character.width}
      x={Math.abs(x) + character.x}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={Math.abs(y) + character.y}
    >
      <g
        transform={`rotate(${character.rotate} ${character.width / 2} ${
          character.height / 2
        })`}
      >
        <image
          height={character.height * character.scale}
          width={character.width * character.scale}
          x={((character.width * character.scale - character.width) / 2) * -1}
          xlinkHref={characterDataUrl}
          y={((character.height * character.scale - character.height) / 2) * -1}
        />
      </g>
    </svg>
  );
};

export const InternalImage: React.FC<React.SVGProps<SVGGElement>> = (props) => {
  const dataUrl = useSelector(selectors.imageDataUrl);

  return (
    <g {...props}>
      <image height="100%" width="100%" xlinkHref={dataUrl} />
      <Character />
    </g>
  );
};

const Rect: React.FC<React.SVGProps<SVGRectElement>> = (props) => (
  <rect {...props} height="100%" width="100%" />
);

export const C1: React.FC<ChekiFilterProps> = ({ noImage }) => (
  <>
    <defs>
      <LinearGradient id="c1" x1="0%" y1="0%" x2="0%" y2="110%">
        <stop offset="0%" stopColor="#d5aeae" />
        <stop offset="33.3%" stopColor="#8f8f8f" />
        <stop offset="66.6%" stopColor="#c99d93" />
        <stop offset="100%" stopColor="#185d62" />
      </LinearGradient>

      <Filter id="c1">
        <Grayscale amount={0.06} />
        <Contrast amount={1.3} />
      </Filter>
    </defs>

    <Rect fill={`url(#${getGradientId("c1")})`} />
    {!noImage && (
      <InternalImage
        filter={`url(#${getFilterId("c1")})`}
        style={{ mixBlendMode: "hard-light" }}
      />
    )}
    <Rect fill="#58747b" style={{ mixBlendMode: "overlay" }} />
  </>
);

export const F2: React.FC<ChekiFilterProps> = ({ noImage }) => (
  <>
    <defs>
      <LinearGradient id="f2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#b8dfdc" />
        <stop offset="100%" stopColor="#aaa" />
      </LinearGradient>

      <LinearGradient id="f2-after" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="43%" stopColor="#aebab6" />
        <stop offset="100%" stopColor="#4a5580" />
      </LinearGradient>

      <Filter id="f2">
        <Contrast amount={1.5} />
      </Filter>
    </defs>

    <Rect fill={`url(#${getGradientId("f2")})`} />
    {!noImage && (
      <InternalImage filter={`url(#${getFilterId("f2")})`} opacity="0.85" />
    )}
    <rect
      fill={`url(#${getGradientId("f2-after")})`}
      style={{ mixBlendMode: "soft-light" }}
    />
  </>
);

export const G3: React.FC<ChekiFilterProps> = ({ noImage }) => (
  <>
    <defs>
      <LinearGradient id="g3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#485c6e" />
        <stop offset="15%" stopColor="#b9b9b0" />
        <stop offset="100%" stopColor="#4b6974" />
      </LinearGradient>

      <Filter id="g3">
        <Contrast amount={1.3} />
      </Filter>
    </defs>

    <Rect fill={`url(#${getGradientId("g3")})`} />
    {!noImage && (
      <InternalImage
        filter={`url(#${getFilterId("g3")})`}
        style={{ mixBlendMode: "hard-light" }}
      />
    )}
  </>
);

export const P5: React.FC<ChekiFilterProps> = ({ noImage }) => (
  <>
    <defs>
      <LinearGradient id="p5-after" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#9ec1b3" />
        <stop offset="33.3%" stopColor="#8c78a0" />
        <stop offset="66.6%" stopColor="#646983" />
        <stop offset="100%" stopColor="#252c37" />
      </LinearGradient>

      <Filter id="p5">
        <Contrast amount={1.5} />
        <Grayscale amount={0.15} />
      </Filter>
    </defs>
    <Rect fill="#8facaf" />
    {!noImage && (
      <InternalImage filter={`url(#${getFilterId("p5")})`} opacity="0.8" />
    )}
    <rect
      fill={`url(#${getGradientId("p5-after")})`}
      style={{ mixBlendMode: "overlay" }}
    />
  </>
);

export const HB1: React.FC<ChekiFilterProps> = ({ noImage }) => (
  <>
    <defs>
      <LinearGradient id="hb1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="30%" stopColor="#8e8d9a" />
        <stop offset="48%" stopColor="#a6939f" />
        <stop offset="65%" stopColor="#6c7c95" />
        <stop offset="58%" stopColor="#6a7b95" />
        <stop offset="86%" stopColor="#c5cdd7" />
        <stop offset="100%" stopColor="#303743" />
      </LinearGradient>

      <Filter id="hb1">
        <Grayscale amount={0.2} />
        <Contrast amount={1.3} />
      </Filter>
    </defs>
    <Rect fill={`url(#${getGradientId("hb1")})`} />
    {!noImage && (
      <InternalImage
        filter={`url(#${getFilterId("hb1")})`}
        style={{ mixBlendMode: "hard-light" }}
      />
    )}
    <Rect fill="#294459" opacity="0.5" style={{ mixBlendMode: "lighten" }} />
  </>
);

export const HB2: React.FC<ChekiFilterProps> = ({ noImage }) => (
  <>
    <defs>
      <LinearGradient id="hb2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="31%" stopColor="#8e8d9a" />
        <stop offset="49%" stopColor="#a69893" />
        <stop offset="58%" stopColor="#4c4644" />
        <stop offset="88%" stopColor="#c5cdd7" />
        <stop offset="100%" stopColor="#303743" />
      </LinearGradient>

      <Filter id="hb2">
        <Grayscale amount={0.2} />
        <Contrast amount={1.3} />
      </Filter>
    </defs>
    <Rect fill={`url(#${getGradientId("hb2")})`} />
    {!noImage && (
      <InternalImage
        filter={`url(#${getFilterId("hb2")})`}
        style={{ mixBlendMode: "hard-light" }}
      />
    )}
    <Rect fill="#315764" opacity="0.25" style={{ mixBlendMode: "overlay" }} />
  </>
);

export const ACG: React.FC<ChekiFilterProps> = ({ noImage }) => (
  <>
    <defs>
      <LinearGradient id="acg-after" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="30%" stopColor="#77766f" />
        <stop offset="60%" stopColor="#6a6f68" />
        <stop offset="100%" stopColor="#45353e" />
      </LinearGradient>

      <Filter id="acg">
        <Grayscale amount={0.4} />
        <Contrast amount={1.6} />
        <Brightness amount={0.85} />
        <HueRotate amount={-5} />
      </Filter>
    </defs>
    <Rect fill="#eceedf" />
    {!noImage && (
      <InternalImage
        filter={`url(#${getFilterId("acg")})`}
        opacity="0.85"
        style={{ mixBlendMode: "darken" }}
      />
    )}
    <rect
      fill={`url(#${getGradientId("acg-after")})`}
      style={{ mixBlendMode: "overlay" }}
    />
  </>
);

export const LV3: React.FC<ChekiFilterProps> = ({ noImage }) => (
  <>
    <defs>
      <LinearGradient id="lv3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#a48a7a" />
        <stop offset="37%" stopColor="#927f77" />
        <stop offset="49%" stopColor="#ac8577" />
        <stop offset="100%" stopColor="#574d47" />
      </LinearGradient>

      <Filter id="lv3">
        <Grayscale amount={0.2} />
        <Contrast amount={1.3} />
      </Filter>
    </defs>
    <Rect fill={`url(#${getGradientId("lv3")})`} />
    {!noImage && (
      <InternalImage
        filter={`url(#${getFilterId("lv3")})`}
        style={{ mixBlendMode: "hard-light" }}
      />
    )}
  </>
);

export const M5: React.FC<ChekiFilterProps> = ({ noImage }) => (
  <>
    <defs>
      <RadialGradient id="m5" r="0.7">
        <stop offset="0%" stopColor="#c09f81" />
        <stop offset="100%" stopColor="#816c5f" />
      </RadialGradient>

      <LinearGradient id="m5-after" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="50%" stopColor="#bbccce" />
        <stop offset="100%" stopColor="#000000" />
      </LinearGradient>

      <Filter id="m5">
        <Grayscale amount={0.4} />
        <Contrast amount={1.1} />
      </Filter>
    </defs>
    <Rect fill={`url(#${getGradientId("m5")})`} />
    {!noImage && (
      <InternalImage
        filter={`url(#${getFilterId("m5")})`}
        style={{ mixBlendMode: "hard-light" }}
      />
    )}
    <rect
      fill={`url(#${getGradientId("m5-after")})`}
      opacity="0.5"
      style={{ mixBlendMode: "soft-light" }}
    />
  </>
);

export const A6: React.FC<ChekiFilterProps> = ({ noImage }) => (
  <>
    <defs>
      <Filter id="a6">
        <Grayscale amount={0.3} />
        <Contrast amount={1.4} />
        <HueRotate amount={-1} />
      </Filter>
    </defs>
    <Rect fill="#a9a499" />
    {!noImage && (
      <InternalImage
        filter={`url(#${getFilterId("a6")})`}
        style={{ mixBlendMode: "hard-light" }}
      />
    )}
    <Rect fill="#eaeae9" style={{ mixBlendMode: "multiply" }} />
  </>
);

export const KK2: React.FC<ChekiFilterProps> = ({ noImage }) => (
  <>
    <defs>
      <LinearGradient id="kk2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="29%" stopColor="#b1957d" />
        <stop offset="57%" stopColor="#7d7b73" />
        <stop offset="100%" stopColor="#ce9778" />
      </LinearGradient>

      <Filter id="kk2">
        <Grayscale amount={0.3} />
        <Contrast amount={1.7} />
      </Filter>
    </defs>

    <Rect fill={`url(#${getGradientId("kk2")})`} />
    {!noImage && (
      <InternalImage
        filter={`url(#${getFilterId("kk2")})`}
        opacity="0.8"
        style={{ mixBlendMode: "hard-light" }}
      />
    )}
    <Rect fill="#dab66d" opacity="0.15" style={{ mixBlendMode: "darken" }} />
  </>
);

export const M3: React.FC<ChekiFilterProps> = ({ noImage }) => (
  <>
    <defs>
      <Filter id="m3">
        <Grayscale amount={0.3} />
        <Contrast amount={1.55} />
      </Filter>
    </defs>
    <Rect fill="#817e72" />
    {!noImage && (
      <InternalImage
        filter={`url(#${getFilterId("m3")})`}
        opacity="0.75"
        style={{ mixBlendMode: "hard-light" }}
      />
    )}
    <Rect fill="#cce7de" opacity="0.35" style={{ mixBlendMode: "multiply" }} />
  </>
);

export const T1: React.FC<ChekiFilterProps> = ({ noImage }) => (
  <>
    <defs>
      <Filter id="t1">
        <Grayscale amount={0.2} />
        <Contrast amount={1.4} />
      </Filter>
    </defs>
    <Rect fill="#9d9990" />
    {!noImage && (
      <InternalImage
        filter={`url(#${getFilterId("t1")})`}
        style={{ mixBlendMode: "hard-light" }}
      />
    )}
    <Rect fill="#878787" opacity="0.5" style={{ mixBlendMode: "lighten" }} />
  </>
);

export const B5: React.FC<ChekiFilterProps> = ({ noImage }) => (
  <>
    <defs>
      <Filter id="b5">
        <Grayscale amount={1} />
        <Contrast amount={1.8} />
        <Brightness amount={0.95} />
      </Filter>
    </defs>
    <Rect fill="#000000" />
    {!noImage && (
      <InternalImage filter={`url(#${getFilterId("b5")})`} opacity="0.9" />
    )}
  </>
);

export const X1: React.FC<ChekiFilterProps> = ({ noImage }) => (
  <>
    <defs>
      <Filter id="x1">
        <Grayscale amount={1} />
        <Contrast amount={1.9} />
        <Brightness amount={1.1} />
      </Filter>
    </defs>

    <Rect fill="#444444" />
    {!noImage && (
      <InternalImage filter={`url(#${getFilterId("x1")})`} opacity="0.75" />
    )}
    <Rect fill="#333333" style={{ mixBlendMode: "lighten" }} />
  </>
);

export const ChekiCanvasImage: React.FC<{
  filter: ChekiFilter | null;
  noImage?: boolean;
}> = ({ filter, noImage }) => {
  const { height, width, x, y } = useSelector(selectors.image);
  const props = { noImage: !!noImage };

  return (
    <svg
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      x={x}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={y}
    >
      {(() => {
        switch (filter) {
          case "c1":
            return <C1 {...props} />;
          case "f2":
            return <F2 {...props} />;
          case "g3":
            return <G3 {...props} />;
          case "p5":
            return <P5 {...props} />;
          case "hb1":
            return <HB1 {...props} />;
          case "hb2":
            return <HB2 {...props} />;
          case "acg":
            return <ACG {...props} />;
          case "lv3":
            return <LV3 {...props} />;
          case "m5":
            return <M5 {...props} />;
          case "a6":
            return <A6 {...props} />;
          case "kk2":
            return <KK2 {...props} />;
          case "m3":
            return <M3 {...props} />;
          case "t1":
            return <T1 {...props} />;
          case "b5":
            return <B5 {...props} />;
          case "x1":
            return <X1 {...props} />;
          case null:
            return noImage ? null : <InternalImage />;
        }
      })()}
    </svg>
  );
};
