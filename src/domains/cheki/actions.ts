import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { convertUrlToImage, resizeImage } from "./utils";
import { CursorPosition } from "~/utils/cheki";

export const addImage = createAsyncThunk<
  { height: number; url: string; width: number },
  { url: string }
>("CHEKI/ADD_IMAGE", async ({ url }) =>
  resizeImage(await convertUrlToImage(url))
);

export const complete = createAction("CHEKI/COMPLETE");

export const startImageDragging = createAction<{
  cursorPositions: CursorPosition[];
}>("CHEKI/START_IMAGE_DRAGGING");

export const tick = createAction<{ cursorPositions: CursorPosition[] }>(
  "CHEKI/TICK"
);

export const updateDisplayable = createAction<{
  height: number;
  width: number;
  x: number;
  y: number;
}>("CHEKI/UPDATE_DISPLAYABLE");
