const CHARACTER_IMAGE_HEIGHT = 48;
const CHARACTER_IMAGE_WIDTH = 24;

export const EXHIBITION_2D_MAX_STEP = 386;
export const EXHIBITION_2D_HEIGHT = 300;
export const EXHIBITION_2D_WIDTH = 400;
export const EXHIBITION_2D_CHARACTER_ANIMATION_FRAME_COUNT = 4;
export const EXHIBITION_2D_CHARACTER_ANIMATION_PER_FRAME = 4;
export const EXHIBITION_2D_CHARACTER_HEIGHT = 128;
export const EXHIBITION_2D_CHARACTER_WIDTH =
  (EXHIBITION_2D_CHARACTER_HEIGHT / CHARACTER_IMAGE_HEIGHT) *
  CHARACTER_IMAGE_WIDTH;
export const EXHIBITION_2D_CHARACTER_X =
  (EXHIBITION_2D_WIDTH - EXHIBITION_2D_CHARACTER_WIDTH) / 2;
export const EXHIBITION_2D_CHARACTER_Y =
  EXHIBITION_2D_HEIGHT - EXHIBITION_2D_CHARACTER_HEIGHT - 37;
