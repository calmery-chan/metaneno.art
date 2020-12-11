import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Hex } from "./models";
import {
  convertUrlToDataUrl,
  convertUrlToImage,
  resizeFrameImage,
  resizeImage,
} from "./utils";
import {
  Character,
  ChekiFilter,
  CHEKI_FRAME_IMAGE_URLS,
  NONEME_IMAGES,
} from "~/constants/cheki";
import { CursorPosition } from "~/utils/cheki";
import * as GA from "~/utils/cheki/google-analytics";

export const addImage = createAsyncThunk<
  {
    createdDate: string;
    height: number;
    dataUrl: string;
    width: number;
  },
  { url: string; createdDate: string }
>("CHEKI/ADD_IMAGE", async ({ url, createdDate }) => ({
  ...resizeImage(await convertUrlToImage(url)),
  createdDate,
}));

export const changeDecorationColor = createAction<{ hex: Hex }>(
  "CHEKI/CHANGE_DECORATION_COLOR"
);

export const changeFilter = createAction<{ filter: ChekiFilter | null }>(
  "CHEKI/CHANGE_FILTER"
);

export const changeFrame = createAsyncThunk<
  { dataUrl: string; index: number },
  { index: number }
>("CHEKI/ADD_FRAME", async ({ index }) => {
  GA.changeFrame(CHEKI_FRAME_IMAGE_URLS[index].name);

  return {
    dataUrl: resizeFrameImage(
      await convertUrlToImage(CHEKI_FRAME_IMAGE_URLS[index].url)
    ),
    index,
  };
});

export const complete = createAction("CHEKI/COMPLETE");

export const ready = createAction<{ ready: boolean }>("CHEKI/READY");

export const removeImage = createAction("CHEKI/REMOVE_IMAGE");

export const splashed = createAction("CHEKI/SPLASHED");

export const startImageDragging = createAction<{
  cursorPositions: CursorPosition[];
}>("CHEKI/START_IMAGE_DRAGGING");

export const take = createAsyncThunk<{ character: Character }>(
  "CHEKI/TAKE",
  async () => {
    const index = Math.floor(Math.random() * NONEME_IMAGES.length);
    const character = NONEME_IMAGES[index];
    character.url = await convertUrlToDataUrl(character.url);

    GA.takeAPhoto(index);

    return { character };
  }
);

export const tick = createAction<{ cursorPositions: CursorPosition[] }>(
  "CHEKI/TICK"
);

export const updateDisplayable = createAction<{
  height: number;
  width: number;
  x: number;
  y: number;
}>("CHEKI/UPDATE_DISPLAYABLE");
