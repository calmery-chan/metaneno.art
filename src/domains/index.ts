import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch as _useDispatch, createSelectorHook } from "react-redux";
import * as cheki from "./cheki";
import * as example from "./example";

const reducer = combineReducers({
  cheki: cheki.reducer,
  example: example.reducer,
});

export const selectors = {
  cheki(state: State) {
    return state.cheki;
  },
  example(state: State) {
    return state.example;
  },
};
export const store = configureStore({ reducer });
export const useDispatch = () => _useDispatch<typeof store.dispatch>();
export const useSelector = createSelectorHook<State>();

export type State = ReturnType<typeof store.getState>;
