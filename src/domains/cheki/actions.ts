import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  convertUrlToDataUrl,
  convertUrlToImage,
  resizeFrameImage,
  resizeImage,
} from "./utils";
import {
  Character,
  CharacterTag,
  ChekiFilter,
  CHEKI_FRAME_IMAGE_URLS,
} from "~/constants/cheki";
import { CursorPosition, getCharactersWithTags } from "~/utils/cheki";
import * as GA from "~/utils/cheki/google-analytics";

export const addImage = createAsyncThunk<
  {
    height: number;
    dataUrl: string;
    width: number;
  },
  { url: string }
>("CHEKI/ADD_IMAGE", async ({ url }) =>
  resizeImage(await convertUrlToImage(url))
);

export const changeCharacterTags = createAction<{ tag: CharacterTag }>(
  "CHEKI/CHANGE_CHARACTER_TAG"
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

export const resetCharacterTags = createAction("CHEKI/RESET_CHARACTER_TAGS");

export const splashed = createAction("CHEKI/SPLASHED");

export const startImageDragging = createAction<{
  cursorPositions: CursorPosition[];
}>("CHEKI/START_IMAGE_DRAGGING");

export const take = createAsyncThunk<
  { character: Character },
  { characterTags: CharacterTag[] }
>("CHEKI/TAKE", async ({ characterTags }) => {
  const characters = getCharactersWithTags(characterTags.concat());
  const index = Math.floor(Math.random() * characters.length);
  const character = characters[index];
  character.url = await convertUrlToDataUrl(character.url);

  GA.takeAPhoto(index);

  return { character };
});

export const tick = createAction<{ cursorPositions: CursorPosition[] }>(
  "CHEKI/TICK"
);

export const updateDisplayable = createAction<{
  height: number;
  width: number;
  x: number;
  y: number;
}>("CHEKI/UPDATE_DISPLAYABLE");
