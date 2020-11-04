import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";

export type State = {
  message: string;
};

const initialState: State = {
  message: "Hello World",
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.updateMessage, (_, action) => {
      const { message } = action.payload;
      return { message };
    })
    .addCase(actions.updateMessageAfterFiveSeconds.pending, () => {
      return { message: "Pending" };
    })
    .addCase(actions.updateMessageAfterFiveSeconds.fulfilled, (_, action) => {
      const { message } = action.payload;
      return { message };
    });
});
