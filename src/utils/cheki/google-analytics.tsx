import { CharacterTag, ChekiFilter } from "~/constants/cheki";
import { ChekiDirection } from "~/domains/cheki/models";
import { sendEvent } from "~/utils/google-analytics";

const sendChekiEvent = (
  action: string,
  {
    label,
    value,
  }: {
    label?: string;
    value?: string;
  }
) =>
  sendEvent(action, {
    category: "cheki",
    label,
    value,
  });

export const addImage = (direction: ChekiDirection) =>
  sendChekiEvent("add_image", {
    label: direction,
  });

export const removeImage = () => sendChekiEvent("remove_image", {});

export const changeFilter = (filter: ChekiFilter | "none") =>
  sendChekiEvent("change_filter", {
    label: filter,
  });

export const changeFrame = (name: string) =>
  sendChekiEvent("change_frame", {
    label: name,
  });

export const takeAPhoto = (index: number) =>
  sendChekiEvent("take_a_photo", {
    label: index.toString(),
  });

export const takeAPhotoAgain = () => sendChekiEvent("take_a_photo_again", {});

export const transform = () => sendChekiEvent("transform", {});

export const share = () => sendChekiEvent("share", {});

export const startTutorial = (url: string) =>
  sendChekiEvent("start_tutorial", {
    label: url,
  });

export const stopTutorial = (url: string) =>
  sendChekiEvent("stop_tutorial", {
    label: url,
  });

export const completeTutorial = (url: string) =>
  sendChekiEvent("complete_tutorial", {
    label: url,
  });

export const changeCharacterFilter = (characterTags: CharacterTag[]) =>
  sendChekiEvent("filter_by_character_tag", {
    label: characterTags.sort().join(","),
  });

export const addDecoration = (decorationId: string) =>
  sendChekiEvent("add_decoration", {
    label: decorationId,
  });

export const removeDecoration = (decorationId: string) =>
  sendChekiEvent("remove_decoration", {
    label: decorationId,
  });
