import {
  EXHIBITION_2D_BACKGROUND_MAX_STEP,
  EXHIBITION_2D_CHARACTER_HORIZONTAL_MARGIN_IN_STEP,
  EXHIBITION_2D_CANVAS_HEIGHT,
  EXHIBITION_2D_MOVING_DISTANCE_PER_STEP,
  EXHIBITION_2D_BACKGROUND_MAX_STEP_WHEN_RESTRICTED,
} from "~/constants/exhibition";

const getObjectX = (restricted: boolean, step: number) => {
  // キャラクターが画面中央に存在しないとき、スクロールしない
  if (step < EXHIBITION_2D_CHARACTER_HORIZONTAL_MARGIN_IN_STEP) {
    return 0;
  }

  const MAX_STEP = restricted
    ? EXHIBITION_2D_BACKGROUND_MAX_STEP_WHEN_RESTRICTED
    : EXHIBITION_2D_BACKGROUND_MAX_STEP;

  // step が背景のスクロール量の最大値を越えるとき、最大値で固定する
  if (step > MAX_STEP) {
    return (
      (MAX_STEP - EXHIBITION_2D_CHARACTER_HORIZONTAL_MARGIN_IN_STEP) *
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

export const Exhibition2dObject: React.FC<{
  onClick?: () => void;
  restricted: boolean;
  speed?: number;
  step: number;
  url: string;
  x?: number;
}> = ({ children, onClick, restricted, speed, step, url, x }) => (
  <g
    className={onClick ? "cursor-pointer" : undefined}
    onClick={onClick}
    transform={`translate(${
      getObjectX(restricted, step) * (speed || 1) + (x || 0)
    } 0)`}
  >
    <image
      height={EXHIBITION_2D_CANVAS_HEIGHT}
      style={{
        imageRendering: "pixelated",
      }}
      xlinkHref={url}
    />
    {children}
  </g>
);
