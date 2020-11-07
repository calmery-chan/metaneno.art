import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";

export type State = {
  displayableHeight: number;
  displayableWidth: number;
  displayableX: number;
  displayableY: number;
  isImageDragging: boolean;
  isImageRotating: boolean;
  isImageScaling: boolean;
};

const initialState: State = {
  displayableHeight: 0,
  displayableWidth: 0,
  displayableX: 0,
  displayableY: 0,
  isImageDragging: false,
  isImageRotating: false,
  isImageScaling: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
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
    });
});
