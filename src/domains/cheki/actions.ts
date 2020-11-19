import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  convertUrlToImage,
  createThumbnailImage,
  resizeFrameImage,
  resizeImage,
} from "./utils";
import { ChekiFilter, CHEKI_FRAME_IMAGE_URLS } from "~/constants/cheki";
import { CursorPosition } from "~/utils/cheki";

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

export const removeImage = createAction("CHEKI/REMOVE_IMAGE");

export const startImageDragging = createAction<{
  cursorPositions: CursorPosition[];
}>("CHEKI/START_IMAGE_DRAGGING");

export const tick = createAction<{ cursorPositions: CursorPosition[] }>(
  "CHEKI/TICK"
);

//

export const changeFilter = createAction<{ filter: ChekiFilter | null }>(
  "CHEKI/CHANGE_FILTER"
);

export const changeFrame = createAsyncThunk<
  { dataUrl: string; index: number },
  { index: number }
>("CHEKI/ADD_FRAME", async ({ index }) => ({
  dataUrl: resizeFrameImage(
    await convertUrlToImage(CHEKI_FRAME_IMAGE_URLS[index].url)
  ),
  index,
}));

export const complete = createAction("CHEKI/COMPLETE");

export const ready = createAction<{ ready: boolean }>("CHEKI/READY");

export const splashed = createAction("CHEKI/SPLASHED");

export const updateDisplayable = createAction<{
  height: number;
  width: number;
  x: number;
  y: number;
}>("CHEKI/UPDATE_DISPLAYABLE");
