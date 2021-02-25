import { AreaName } from "~/types/exhibition";
import { sendEvent } from "~/utils/google-analytics";

const sendExhibitionEvent = (
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
    category: "exhibition",
    label,
    value,
  });

export const talk = (character: string) =>
  sendExhibitionEvent("talk_with", {
    label: character,
  });

export const wear = (accessory: "pancake" | "fried_egg") =>
  sendExhibitionEvent("wear", { label: accessory });

export const trip = () => sendExhibitionEvent("trip", {});

export const tripTo = (area: AreaName) =>
  sendExhibitionEvent("trip_to", {
    label: area,
  });

export const startMultiplay = () => sendExhibitionEvent("start_multiplay", {});

export const stopMultiplay = () => sendExhibitionEvent("stop_multiplay", {});

export const viewWork = (workId: string) =>
  sendExhibitionEvent("view", {
    label: workId,
  });

export const clickItem = (item: string) =>
  sendExhibitionEvent("click", {
    label: item,
  });
