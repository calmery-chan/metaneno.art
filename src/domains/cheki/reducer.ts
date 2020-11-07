import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { getDirection } from "./utils";
import { ChekiDirection } from "~/types/ChekiDirection";

export type State = {
  direction: ChekiDirection;
  imageHeight: number;
  imagePositionX: number;
  imagePositionY: number;
  imageUrl: string;
  imageWidth: number;
  isImageDragging: boolean;
};

const initialState: State = {
  direction: "horizontal",
  imageHeight: 0,
  imagePositionX: 0,
  imagePositionY: 0,
  imageUrl: "",
  imageWidth: 0,
  isImageDragging: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.addImage.fulfilled, (state, action) => {
      const { height, url, width } = action.payload;

      return {
        ...state,
        direction: getDirection(height, width),
        imageHeight: height,
        imageUrl: url,
        imageWidth: width,
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
    }));
});
