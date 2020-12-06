import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { getDirection, random, updateFrame, updateTrim } from "./utils";
import { ChekiFilter } from "~/constants/cheki";
import { ChekiDirection } from "~/types/ChekiDirection";
import { ChekiRectangle } from "~/types/ChekiRectangle";
import { getImageSizeByDirection } from "~/utils/cheki";
import * as GA from "~/utils/cheki/google-analytics";

export type State = {
  character: {
    dataUrl: string;
    height: number;
    rotate: number;
    scale: number;
    width: number;
    x: number;
    y: number;
  } | null;
  decoration: number | null;
  frame: {
    dataUrl: string;
    index: number;
    ready: boolean;
  };
  image: ChekiRectangle & {
    direction: ChekiDirection;
    filter: ChekiFilter | null;
    dataUrl: string;
  };
  layout: {
    displayable: ChekiRectangle;
    frame: ChekiRectangle & {
      viewBoxHeight: number;
      viewBoxWidth: number;
    };
    trim: ChekiRectangle & {
      displayMagnification: number;
      viewBoxHeight: number;
      viewBoxWidth: number;
    };
  };
  ready: boolean;
  splashed: boolean;
  temporaries: {
    cursorOffsetX: number;
    cursorOffsetY: number;
    isImageDragging: boolean;
  };
};

const initialState: State = {
  character: null,
  decoration: 0,
  frame: {
    dataUrl: "",
    index: 0,
    ready: false,
  },
  image: {
    direction: "horizontal",
    filter: null,
    height: 0,
    dataUrl: "",
    width: 0,
    x: 0,
    y: 0,
  },
  layout: {
    displayable: {
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    },
    frame: {
      height: 0,
      viewBoxHeight: 0,
      viewBoxWidth: 0,
      width: 0,
      x: 0,
      y: 0,
    },
    trim: {
      displayMagnification: 1,
      height: 0,
      viewBoxHeight: 0,
      viewBoxWidth: 0,
      width: 0,
      x: 0,
      y: 0,
    },
  },
  ready: false,
  splashed: false,
  temporaries: {
    cursorOffsetX: 0,
    cursorOffsetY: 0,
    isImageDragging: false,
  },
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.addImage.fulfilled, (state, action) => {
      const { dataUrl, height, width } = action.payload;
      const { layout } = state;

      const direction = getDirection(height, width);

      GA.addImage(direction);

      return {
        ...state,
        image: {
          ...initialState.image,
          dataUrl,
          direction,
          height,
          width,
        },
        layout: {
          ...layout,
          ...updateFrame(layout.displayable, direction),
        },
        temporaries: initialState.temporaries,
      };
    })
    .addCase(actions.changeDecoration, (state, action) => ({
      ...state,
      ...action.payload,
    }))
    .addCase(actions.changeFilter, (state, action) => {
      GA.changeFilter(action.payload.filter || "none");

      return {
        ...state,
        image: {
          ...state.image,
          ...action.payload,
        },
      };
    })
    .addCase(actions.changeFrame.fulfilled, (state, action) => {
      return {
        ...state,
        frame: {
          ...state.frame,
          ...action.payload,
          ready: true,
        },
      };
    })
    .addCase(actions.complete, (state) => {
      GA.transform();

      return {
        ...state,
        temporaries: initialState.temporaries,
      };
    })
    .addCase(actions.ready, (state, action) => ({
      ...state,
      ...action.payload,
    }))
    .addCase(actions.removeImage, () => {
      GA.removeImage();

      return {
        ...initialState,
        splashed: true,
      };
    })
    .addCase(actions.splashed, (state) => ({
      ...state,
      splashed: true,
    }))
    .addCase(actions.startImageDragging, (state, action) => {
      const { cursorPositions } = action.payload;
      const { image, layout } = state;
      const { trim } = layout;

      const [{ x, y }] = cursorPositions;

      const cursorOffsetX = (x - trim.x) * trim.displayMagnification - image.x;
      const cursorOffsetY = (y - trim.y) * trim.displayMagnification - image.y;

      return {
        ...state,
        temporaries: {
          ...state.temporaries,
          cursorOffsetX,
          cursorOffsetY,
          isImageDragging: true,
        },
      };
    })
    .addCase(actions.take.fulfilled, (state, action) => {
      const { character } = action.payload;
      const { image } = state;
      const { height, width } = getImageSizeByDirection(image.direction);

      let x = random(0, width - character.width);
      let y = random(0, height - character.height);

      if (character.fixed.bottom) {
        y = height - character.height;
      } else if (character.fixed.top) {
        y = 0;
      }

      if (character.fixed.right) {
        x = width - character.width;
      } else if (character.fixed.left) {
        x = 0;
      }

      return {
        ...state,
        character: {
          dataUrl: character.url,
          height: character.height,
          rotate: random(character.rotate.min, character.rotate.max),
          scale:
            random(character.scale.min * 10, character.scale.max * 10) / 10,
          width: character.width,
          x,
          y,
        },
      };
    })
    .addCase(actions.tick, (state, action) => {
      const { cursorPositions } = action.payload;
      const { image, layout, temporaries } = state;
      const { trim } = layout;

      const [{ x, y }] = cursorPositions;

      if (temporaries.isImageDragging) {
        const cursorX = (x - trim.x) * trim.displayMagnification;
        const cursorY = (y - trim.y) * trim.displayMagnification;

        let nextX = cursorX - temporaries.cursorOffsetX;
        let nextY = cursorY - temporaries.cursorOffsetY;

        if (nextX > 0) {
          nextX = 0;
        }

        if (nextY > 0) {
          nextY = 0;
        }

        const { width, height } = getImageSizeByDirection(image.direction);

        if (width - image.width > nextX) {
          nextX = width - image.width;
        }

        if (height - image.height > nextY) {
          nextY = height - image.height;
        }

        return {
          ...state,
          image: {
            ...image,
            x: nextX,
            y: nextY,
          },
        };
      }

      return state;
    })
    .addCase(actions.updateDisplayable, (state, action) => {
      const { payload: displayable } = action;
      const {
        image: { direction },
      } = state;

      return {
        ...state,
        layout: {
          ...state.layout,
          ...updateFrame(displayable, direction),
          ...updateTrim(displayable, direction),
          displayable,
        },
      };
    });
});
