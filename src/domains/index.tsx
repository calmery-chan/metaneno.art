import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch as _useDispatch, createSelectorHook } from "react-redux";
import { exampleReducer } from "./example";

const reducer = combineReducers({
  example: exampleReducer,
});

export const store = configureStore({ reducer });
export const useDispatch = () => _useDispatch<typeof store.dispatch>();
export const useSelector = createSelectorHook<
  ReturnType<typeof store.getState>
>();
