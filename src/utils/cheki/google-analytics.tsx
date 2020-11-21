import { ChekiFilter } from "~/constants/cheki";
import { ChekiDirection } from "~/types/ChekiDirection";
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
