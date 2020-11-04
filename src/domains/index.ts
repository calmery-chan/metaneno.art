import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch as _useDispatch, createSelectorHook } from "react-redux";
import * as example from "./example";

const reducer = combineReducers({
  example: example.reducer,
});

export const store = configureStore({ reducer });
export const useDispatch = () => _useDispatch<typeof store.dispatch>();
export const useSelector = createSelectorHook<State>();
export const exampleSelector = (state: State) => state.example;

export type State = ReturnType<typeof store.getState>;
