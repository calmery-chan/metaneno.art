import { createAction } from "@reduxjs/toolkit";
import { CursorPosition } from "~/utils/cheki";

export const complete = createAction("CHEKI/COMPLETE");

export const tick = createAction<{ cursorPositions: CursorPosition[] }>(
  "CHEKI/TICK"
);

export const updateDisplayable = createAction<{
  height: number;
  width: number;
  x: number;
  y: number;
}>("CHEKI/UPDATE_DISPLAYABLE");
