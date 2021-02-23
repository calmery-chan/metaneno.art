import {
  EXHIBITION_2D_MORNING_BACKGROUND_MAX_STEP,
  EXHIBITION_2D_CHARACTER_HORIZONTAL_MARGIN_IN_STEP,
  EXHIBITION_2D_CANVAS_HEIGHT,
  EXHIBITION_2D_MOVING_DISTANCE_PER_STEP,
} from "~/constants/exhibition";

const getObjectX = (step: number) => {
  // キャラクターが画面中央に存在しないとき、スクロールしない
  if (step < EXHIBITION_2D_CHARACTER_HORIZONTAL_MARGIN_IN_STEP) {
    return 0;
  }

  // step が背景のスクロール量の最大値を越えるとき、最大値で固定する
  if (step > EXHIBITION_2D_MORNING_BACKGROUND_MAX_STEP) {
    return (
      (EXHIBITION_2D_MORNING_BACKGROUND_MAX_STEP -
        EXHIBITION_2D_CHARACTER_HORIZONTAL_MARGIN_IN_STEP) *
      EXHIBITION_2D_MOVING_DISTANCE_PER_STEP *
      -1
    );
  }

  return (
    (step - EXHIBITION_2D_CHARACTER_HORIZONTAL_MARGIN_IN_STEP) *
    EXHIBITION_2D_MOVING_DISTANCE_PER_STEP *
    -1
  );
};

export const Exhibition2dMorningObject: React.FC<{
  height?: number;
  onClick?: () => void;
  speed?: number;
  step: number;
  url?: string;
  x?: number;
  y?: number;
}> = ({ children, height, onClick, speed, step, url, x, y }) => (
  <g
    className={onClick ? "cursor-pointer" : undefined}
    onClick={onClick}
    transform={`translate(${getObjectX(step) * (speed || 1) + (x || 0)} ${
      y ? y : 0
    })`}
  >
    {url && (
      <image
        height={height || EXHIBITION_2D_CANVAS_HEIGHT}
        style={{
          imageRendering: "pixelated",
        }}
        xlinkHref={url}
      />
    )}
    {children}
  </g>
);
