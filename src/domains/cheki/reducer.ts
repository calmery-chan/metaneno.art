import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { ChekiDirection } from "~/types/ChekiDirection";

export type State = {
  direction: ChekiDirection;
  isImageDragging: boolean;
  isImageRotating: boolean;
  isImageScaling: boolean;
};

const initialState: State = {
  direction: "horizontal",
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
    })
    .addCase(actions.updateDirection, (state, action) => ({
      ...state,
      ...action.payload,
    }));
});
