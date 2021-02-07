/* Internal */

const CHARACTER_IMAGE_HEIGHT = 48;
const CHARACTER_IMAGE_WIDTH = 24;
const BACKGROUND_IMAGE_MAX_HEIGHT = 534;
const BACKGROUND_IMAGE_MAX_WIDTH = 3466;
const BACKGROUND_IMAGE_MAX_HEIGHT_WHEN_RESTRICTED = 534;
const BACKGROUND_IMAGE_MAX_WIDTH_WHEN_RESTRICTED = 1499;
const FLOOR_HEIGHT = 36;

/* Externals */

/** 背景画像やキャラクターの画像を Step 毎に何 px 動かすかを指定する */
export const EXHIBITION_2D_MOVING_DISTANCE_PER_STEP = 4;

// Animation

export const EXHIBITION_2D_ZOOM_ANIMATION_STEP = 417;
export const EXHIBITION_2D_ZOOM_ANIMATION_DELAY = 0.4;
export const EXHIBITION_2D_ZOOM_ANIMATION_DURATION = 0.8;
export const EXHIBITION_2D_FADEIN_ANIMATION_DELAY =
  EXHIBITION_2D_ZOOM_ANIMATION_DELAY +
  EXHIBITION_2D_ZOOM_ANIMATION_DURATION +
  0.6;
export const EXHIBITION_2D_FADE_ANIMATION_DURATION = 0.8;
export const EXHIBITION_2D_ZOOM_OUT_ANIMATION_DURATION = 2.56;

// Canvas

export const EXHIBITION_2D_CANVAS_HEIGHT = 300;
export const EXHIBITION_2D_CANVAS_WIDTH = 400;

const BACKGROUND_IMAGE_MAX_WIDTH_FIT_CANVAS =
  (EXHIBITION_2D_CANVAS_HEIGHT / BACKGROUND_IMAGE_MAX_HEIGHT) *
  BACKGROUND_IMAGE_MAX_WIDTH;
const BACKGROUND_IMAGE_MAX_WIDTH_FIT_CANVAS_WHEN_RESTRICTED =
  (EXHIBITION_2D_CANVAS_HEIGHT / BACKGROUND_IMAGE_MAX_HEIGHT_WHEN_RESTRICTED) *
  BACKGROUND_IMAGE_MAX_WIDTH_WHEN_RESTRICTED;

// Character (Animation)

export const EXHIBITION_2D_CHARACTER_FRAME_PER_ANIMATION = 4;
export const EXHIBITION_2D_CHARACTER_WALKING_ANIMATION_IMAGES = [
  "/exhibition/character/0.png",
  "/exhibition/character/1.png",
  "/exhibition/character/2.png",
  "/exhibition/character/3.png",
];

// Character (Direction)

export const EXHIBITION_2D_CHARACTER_DEFAULT_DIRECTION = "right";

// Character (Size)

export const EXHIBITION_2D_CHARACTER_HEIGHT = 146;
export const EXHIBITION_2D_CHARACTER_WIDTH =
  Math.floor(EXHIBITION_2D_CHARACTER_HEIGHT / CHARACTER_IMAGE_HEIGHT) *
  CHARACTER_IMAGE_WIDTH;

// Character (Position)

export const EXHIBITION_2D_CHARACTER_CENTER_X = Math.floor(
  (EXHIBITION_2D_CANVAS_WIDTH - EXHIBITION_2D_CHARACTER_WIDTH) / 2
);
export const EXHIBITION_2D_CHARACTER_CENTER_Y =
  EXHIBITION_2D_CANVAS_HEIGHT - EXHIBITION_2D_CHARACTER_HEIGHT - FLOOR_HEIGHT;

// Character (Step)

export const EXHIBITION_2D_CHARACTER_HORIZONTAL_MARGIN_IN_STEP = Math.floor(
  EXHIBITION_2D_CHARACTER_CENTER_X / EXHIBITION_2D_MOVING_DISTANCE_PER_STEP
);
export const EXHIBITION_2D_CHARACTER_MAX_STEP = Math.floor(
  (BACKGROUND_IMAGE_MAX_WIDTH_FIT_CANVAS - EXHIBITION_2D_CHARACTER_WIDTH) /
    EXHIBITION_2D_MOVING_DISTANCE_PER_STEP
);
export const EXHIBITION_2D_CHARACTER_MAX_STEP_WHEN_RESTRICTED = Math.floor(
  (BACKGROUND_IMAGE_MAX_WIDTH_FIT_CANVAS_WHEN_RESTRICTED -
    EXHIBITION_2D_CHARACTER_WIDTH) /
    EXHIBITION_2D_MOVING_DISTANCE_PER_STEP
);

// Background (Step)

/** (Canvas の縦幅に合わせて縮小した背景画像の横幅 - Canvas の横幅) / EXHIBITION_2D_MOVING_DISTANCE_PER_STEP + 背景画像はキャラクターが画面中央に移動するまで固定して表示する必要があるため、キャラクターが画面中央に移動までに必要となる Step 数 */
export const EXHIBITION_2D_BACKGROUND_MAX_STEP =
  Math.floor(
    (BACKGROUND_IMAGE_MAX_WIDTH_FIT_CANVAS - EXHIBITION_2D_CANVAS_WIDTH) /
      EXHIBITION_2D_MOVING_DISTANCE_PER_STEP
  ) + EXHIBITION_2D_CHARACTER_HORIZONTAL_MARGIN_IN_STEP;
export const EXHIBITION_2D_BACKGROUND_MAX_STEP_WHEN_RESTRICTED =
  Math.floor(
    (BACKGROUND_IMAGE_MAX_WIDTH_FIT_CANVAS_WHEN_RESTRICTED -
      EXHIBITION_2D_CANVAS_WIDTH) /
      EXHIBITION_2D_MOVING_DISTANCE_PER_STEP
  ) + EXHIBITION_2D_CHARACTER_HORIZONTAL_MARGIN_IN_STEP;
