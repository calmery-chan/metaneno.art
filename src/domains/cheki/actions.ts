import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { convertUrlToImage, resizeImage } from "./utils";
import { ChekiDirection } from "~/types/ChekiDirection";
import { CursorPosition } from "~/utils/cheki";

export const addImage = createAsyncThunk<
  { height: number; url: string; width: number },
  { url: string }
>("CHEKI/ADD_IMAGE", async ({ url }) =>
  resizeImage(await convertUrlToImage(url))
);

export const complete = createAction("CHEKI/COMPLETE");

export const tick = createAction<{ cursorPositions: CursorPosition[] }>(
  "CHEKI/TICK"
);

export const updateDirection = createAction<{
  direction: ChekiDirection;
}>("CHEKI/UPDATE_DIRECTION");
