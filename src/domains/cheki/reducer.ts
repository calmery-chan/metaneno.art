import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { getDirection } from "./utils";
import {
  CHEKI_HORIZONTAL_FRAME_HEIGHT,
  CHEKI_HORIZONTAL_FRAME_WIDTH,
  CHEKI_VERTICAL_FRAME_HEIGHT,
  CHEKI_VERTICAL_FRAME_WIDTH,
} from "~/constants/cheki";
import { ChekiDirection } from "~/types/ChekiDirection";
import { calculateCanvasPositionAndSize } from "~/utils/cheki";

export type State = {
  direction: ChekiDirection;
  imageHeight: number;
  imagePositionX: number;
  imagePositionY: number;
  imageUrl: string;
  imageWidth: number;
  isImageDragging: boolean;
  layout: {
    displayable: {
      height: number;
      width: number;
      x: number;
      y: number;
    };
    frame: {
      height: number;
      viewBoxHeight: number;
      viewBoxWidth: number;
      width: number;
      x: number;
      y: number;
    };
  };
};

const initialState: State = {
  direction: "horizontal",
  imageHeight: 0,
  imagePositionX: 0,
  imagePositionY: 0,
  imageUrl: "",
  imageWidth: 0,
  isImageDragging: false,
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
  },
};

const updateFrame = (
  displayable: {
    height: number;
    width: number;
    x: number;
    y: number;
  },
  direction: ChekiDirection
) => {
  const nextFrameViewBox = {
    height:
      direction === "horizontal"
        ? CHEKI_HORIZONTAL_FRAME_HEIGHT
        : CHEKI_VERTICAL_FRAME_HEIGHT,
    width:
      direction === "horizontal"
        ? CHEKI_HORIZONTAL_FRAME_WIDTH
        : CHEKI_VERTICAL_FRAME_WIDTH,
  };

  return {
    frame: {
      ...calculateCanvasPositionAndSize(displayable, nextFrameViewBox),
      viewBoxHeight: nextFrameViewBox.height,
      viewBoxWidth: nextFrameViewBox.width,
    },
  };
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.addImage.fulfilled, (state, action) => {
      const { height, url, width } = action.payload;
      const direction = getDirection(height, width);

      return {
        ...state,
        direction,
        imageHeight: height,
        imageUrl: url,
        imageWidth: width,
        layout: {
          ...state.layout,
          ...updateFrame(state.layout.displayable, direction),
        },
      };
    })
    .addCase(actions.complete, (state) => ({
      ...state,
      isImageDragging: false,
      isImageRotating: false,
      isImageScaling: false,
    }))
    .addCase(actions.tick, (state, action) => {
      const { cursorPositions } = action.payload;
      console.log(cursorPositions);
      return state;
    })
    .addCase(actions.updateDirection, (state, action) => ({
      ...state,
      ...action.payload,
      layout: {
        ...state.layout,
        ...updateFrame(state.layout.displayable, state.direction),
      },
    }))
    .addCase(actions.updateDisplayable, (state, action) => {
      const { direction } = state;

      return {
        ...state,
        layout: {
          ...state.layout,
          ...updateFrame(action.payload, direction),
          displayable: action.payload,
        },
      };
    });
});
