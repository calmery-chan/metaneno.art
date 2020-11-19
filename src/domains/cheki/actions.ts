import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  convertUrlToImage,
  createThumbnailImage,
  resizeFrameImage,
  resizeImage,
} from "./utils";
import { ChekiFilter, CHEKI_FRAME_IMAGE_URLS } from "~/constants/cheki";
import { CursorPosition } from "~/utils/cheki";

export const addFrame = createAsyncThunk<
  { index: number; url: string },
  { index: number }
>("CHEKI/ADD_FRAME", async ({ index }) => ({
  ...resizeFrameImage(
    await convertUrlToImage(CHEKI_FRAME_IMAGE_URLS[index].url)
  ),
  index,
}));

export const addImage = createAsyncThunk<
  {
    height: number;
    thumbnailUrl: string;
    url: string;
    width: number;
  },
  { url: string }
>("CHEKI/ADD_IMAGE", async ({ url }) => {
  const image = await convertUrlToImage(url);
  const { height, url: imageUrl, width } = resizeImage(image);
  const { url: thumbnailUrl } = await createThumbnailImage(image);

  return { height, thumbnailUrl, url: imageUrl, width };
});

export const changeFilter = createAction<{ filter: ChekiFilter | null }>(
  "CHEKI/CHANGE_FILTER"
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

export const splashed = createAction("CHEKI/SPLASHED");

export const ready = createAction<{ ready: boolean }>("CHEKI/READY");
