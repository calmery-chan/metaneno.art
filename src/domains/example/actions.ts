import * as types from "./types";

export const updateMessage = (message: string) => ({
  payload: { message },
  type: types.UPDATE_MESSAGE,
});

export const actions = {
  updateMessage,
};

export type Actions = ReturnType<typeof actions[keyof typeof actions]>;
