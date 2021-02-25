const KEY = "metaneno.art-shared";

export const set = () => localStorage.setItem(KEY, "true");

export const get = () => !!localStorage.getItem(KEY);

export const remove = () => localStorage.removeItem(KEY);
