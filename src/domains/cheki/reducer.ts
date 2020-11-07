import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { getDirection, getSizeByDirection } from "./utils";
import {
  CHEKI_FRAME_MARGIN_LEFT,
  CHEKI_FRAME_MARGIN_TOP,
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
  layout: {
    displayable: {
      height: number;
      width: number;
      x: number;
      y: number;
    };
    displayMagnification: number;
    frame: {
      height: number;
      viewBoxHeight: number;
      viewBoxWidth: number;
      width: number;
      x: number;
      y: number;
    };
  };
  temporaries: {
    cursorOffsetX: number;
    cursorOffsetY: number;
    isImageDragging: boolean;
  };
};

const initialState: State = {
  direction: "horizontal",
  imageHeight: 0,
  imagePositionX: 0,
  imagePositionY: 0,
  imageUrl: "",
  imageWidth: 0,
  layout: {
    displayable: {
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    },
    displayMagnification: 1,
    frame: {
      height: 0,
      viewBoxHeight: 0,
      viewBoxWidth: 0,
      width: 0,
      x: 0,
      y: 0,
    },
  },
  temporaries: {
    cursorOffsetX: 0,
    cursorOffsetY: 0,
    isImageDragging: false,
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
        imagePositionX: 0,
        imagePositionY: 0,
        imageUrl: url,
        imageWidth: width,
        layout: {
          ...state.layout,
          ...updateFrame(state.layout.displayable, direction),
        },
        temporaries: initialState.temporaries,
      };
    })
    .addCase(actions.complete, (state) => ({
      ...state,
      temporaries: initialState.temporaries,
    }))
    .addCase(actions.startImageDragging, (state, action) => {
      const { cursorPositions } = action.payload;
      const { layout, imagePositionX, imagePositionY } = state;

      const [{ x, y }] = cursorPositions;

      const cursorOffsetX =
        (x - layout.frame.x) * layout.displayMagnification -
        CHEKI_FRAME_MARGIN_LEFT -
        imagePositionX;
      const cursorOffsetY =
        (y - layout.frame.y) * layout.displayMagnification -
        CHEKI_FRAME_MARGIN_TOP -
        imagePositionY;

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
      const { direction, layout, temporaries, imageHeight, imageWidth } = state;
      const [{ x, y }] = cursorPositions;

      if (temporaries.isImageDragging) {
        const cursorX =
          (x - layout.frame.x) * layout.displayMagnification -
          CHEKI_FRAME_MARGIN_LEFT;
        const cursorY =
          (y - layout.frame.y) * layout.displayMagnification -
          CHEKI_FRAME_MARGIN_TOP;

        let nextImagePositionX = cursorX - temporaries.cursorOffsetX;
        let nextImagePositionY = cursorY - temporaries.cursorOffsetY;

        if (nextImagePositionX > 0) {
          nextImagePositionX = 0;
        }

        if (nextImagePositionY > 0) {
          nextImagePositionY = 0;
        }

        const { width, height } = getSizeByDirection(direction);

        if (width - imageWidth > nextImagePositionX) {
          nextImagePositionX = width - imageWidth;
        }

        if (height - imageHeight > nextImagePositionY) {
          nextImagePositionY = height - imageHeight;
        }

        return {
          ...state,
          imagePositionX: nextImagePositionX,
          imagePositionY: nextImagePositionY,
        };
      }

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
      const displayable = action.payload;
      const frame = updateFrame(action.payload, direction).frame;

      return {
        ...state,
        layout: {
          ...state.layout,
          displayable,
          displayMagnification: frame.viewBoxWidth / frame.width,
          frame,
        },
      };
    });
});
