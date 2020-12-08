import { createSelector } from "@reduxjs/toolkit";
import { State } from "./reducer";
import { getSelectableCharacterTags } from "~/utils/cheki";

const characterTagsSelector = (state: State) => state.characterTags;

export const selectableCharacterTagsSelector = createSelector(
  characterTagsSelector,
  (characterTags) => getSelectableCharacterTags(characterTags)
);
