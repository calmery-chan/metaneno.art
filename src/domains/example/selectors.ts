import { createSelector } from "@reduxjs/toolkit";
import { State } from "./reducer";

export const messageSelector = createSelector<State, string, string>(
  (state) => state.message,
  (message) => message
);
