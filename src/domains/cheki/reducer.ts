import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { getDirection, updateFrame, updateTrim } from "./utils";
import { ChekiFilter } from "~/constants/cheki";
import { ChekiDirection } from "~/types/ChekiDirection";
import { ChekiRectangle } from "~/types/ChekiRectangle";
import { getImageSizeByDirection } from "~/utils/cheki";

export type State = {
  frame: {
    index: number;
    ready: boolean;
    url: string;
  };
  image: ChekiRectangle & {
    direction: ChekiDirection;
    filter: ChekiFilter | null;
    thumbnailUrl: string;
    url: string;
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
  shootingCondition: "in-preparation" | "trimming" | "complate";
  splashed: boolean;
  temporaries: {
    cursorOffsetX: number;
    cursorOffsetY: number;
    isImageDragging: boolean;
  };
};

const initialState: State = {
  frame: {
    index: 0,
    ready: false,
    url: "",
  },
  image: {
    direction: "horizontal",
    filter: null,
    height: 0,
    thumbnailUrl: "",
    url: "",
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
  shootingCondition: "in-preparation",
  splashed: false,
  temporaries: {
    cursorOffsetX: 0,
    cursorOffsetY: 0,
    isImageDragging: false,
  },
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.changeShootingCondition, (state, action) => ({
      ...state,
      ...action.payload,
    }))
    .addCase(actions.splashed, (state) => ({
      ...state,
      splashed: true,
    }))
    .addCase(actions.addFrame.fulfilled, (state, action) => {
      const { index, url } = action.payload;

      return {
        ...state,
        frame: {
          ...state.frame,
          index,
          ready: true,
          url,
        },
      };
    })
    .addCase(actions.addImage.fulfilled, (state, action) => {
      const { height, thumbnailUrl, url, width } = action.payload;
      const { layout } = state;

      const direction = getDirection(height, width);

      return {
        ...state,
        image: {
          ...initialState.image,
          direction,
          height,
          thumbnailUrl,
          url,
          width,
        },
        layout: {
          ...layout,
          ...updateFrame(layout.displayable, direction),
        },
        temporaries: initialState.temporaries,
      };
    })
    .addCase(actions.changeFilter, (state, action) => ({
      ...state,
      image: {
        ...state.image,
        filter: action.payload.filter,
      },
    }))
    .addCase(actions.complete, (state) => ({
      ...state,
      temporaries: initialState.temporaries,
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
          ...updateFrame(action.payload, direction),
          ...updateTrim(action.payload, direction),
          displayable,
        },
      };
    });
});
