import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import example, { ExampleState } from "./example";

export type State = {
  example: ExampleState;
};

export const store = createStore(
  combineReducers({ example }),
  undefined,
  composeWithDevTools()
);
