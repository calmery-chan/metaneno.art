import { createAction } from "@reduxjs/toolkit";
import { ChekiDirection } from "~/types/ChekiDirection";
import { CursorPosition } from "~/utils/cheki";

export const complete = createAction("CHEKI/COMPLETE");

export const tick = createAction<{ cursorPositions: CursorPosition[] }>(
  "CHEKI/TICK"
);

export const updateDirection = createAction<{
  direction: ChekiDirection;
}>("CHEKI/UPDATE_DIRECTION");
