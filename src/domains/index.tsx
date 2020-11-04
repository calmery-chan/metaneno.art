import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import example, { ExampleState } from "./example";

export type State = {
  example: ExampleState;
};

export const store = createStore(
  combineReducers({ example }),
  undefined,
  composeWithDevTools(applyMiddleware(reduxThunk))
);
