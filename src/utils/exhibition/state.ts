const KEY = "metaneno.art-state";

type ExhibitionState = {
  accessory: "fried_egg" | "pancake" | null;
};

export const get = (): ExhibitionState => {
  const string = localStorage.getItem(KEY);

  if (!string) {
    return {};
  }

  try {
    return JSON.parse(string);
  } catch (_) {
    return {};
  }
};

export const set = (props: Partial<ExhibitionState>) => {
  const state: ExhibitionState = {
    accessory: null,
    ...get(),
    ...props,
  };

  localStorage.setItem(KEY, JSON.stringify(state));
};

export const reset = () => {
  localStorage.removeItem(KEY);
};
