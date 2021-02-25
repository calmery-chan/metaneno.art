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

export const multiplay = (state: "join" | "leave") =>
  sendExhibitionEvent("multiplay", {
    label: state,
  });

export const view = (workId: string) =>
  sendExhibitionEvent("view", {
    label: workId,
  });

export const click = (item: string) =>
  sendExhibitionEvent("click", {
    label: item,
  });

export const sleep = () =>
  sendExhibitionEvent("sleep", {
    label: "2d",
  });

export const wakeup = (location: "night" | "morning") =>
  sendExhibitionEvent("wakeup", {
    label: location,
  });

export const drink = (creamsoda: "flower" | "water") =>
  sendExhibitionEvent("drink", {
    label: creamsoda,
  });
