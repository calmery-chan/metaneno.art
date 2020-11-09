import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  convertUrlToImage,
  createThumbnailImage,
  resizeFrameImage,
  resizeImage,
} from "./utils";
import { ChekiFilter } from "~/constants/cheki";
import { CursorPosition } from "~/utils/cheki";
import * as cocoSsd from "~/utils/coco-ssd";

export const addFrame = createAsyncThunk<{ url: string }, { url: string }>(
  "CHEKI/ADD_FRAME",
  async ({ url }) => resizeFrameImage(await convertUrlToImage(url))
);

export const addImage = createAsyncThunk<
  {
    detectedObjects: cocoSsd.DetectedObject[];
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
  const detectedObjects = await cocoSsd.detect(image);

  return { detectedObjects, height, thumbnailUrl, url: imageUrl, width };
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
