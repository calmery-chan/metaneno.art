import { Actions } from "./actions";
import * as types from "./types";

export type State = {
  message: string;
};

const initialState: State = {
  message: "Hello World",
};

export const reducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case types.UPDATE_MESSAGE: {
      const { message } = action.payload;

      return { message };
    }
  }

  return state;
};
