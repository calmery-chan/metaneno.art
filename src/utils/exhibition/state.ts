const KEY = "metaneno.art-state";

const defaultState: ExhibitionState = {
  accessory: null,
  area: null,
  creamsoda: null,
  location: "2d-night",
};

type ExhibitionState = {
  accessory: "fried_egg" | "pancake" | null;
  area: "cloud" | "meadow" | "sea" | null;
  creamsoda: "flower" | "water" | null;
  location: "2d-morning" | "2d-night" | "3d";
};

export const exists = () => {
  return !!localStorage.getItem(KEY);
};

export const get = (): ExhibitionState => {
  const string = localStorage.getItem(KEY);

  if (!string) {
    return defaultState;
  }

  try {
    return JSON.parse(string);
  } catch (_) {
    return defaultState;
  }
};

export const set = (props: Partial<ExhibitionState>) => {
  const state: ExhibitionState = {
    ...defaultState,
    ...get(),
    ...props,
  };

  localStorage.setItem(KEY, JSON.stringify(state));
};

export const reset = () => {
  localStorage.removeItem(KEY);
};
