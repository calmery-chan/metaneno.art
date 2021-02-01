import { EXHIBITION_2D_HEIGHT } from "~/constants/exhibition";

export const Exhibition2dObject: React.FC<{
  speed?: number;
  step: number;
  url: string;
  x?: number;
}> = ({ speed, step, url, x }) => (
  <image
    height={EXHIBITION_2D_HEIGHT}
    style={{
      imageRendering: "pixelated",
    }}
    transform={`translate(${step * 4 * (speed || 1) * -1 + (x || 0)} 0)`}
    xlinkHref={url}
  />
);
