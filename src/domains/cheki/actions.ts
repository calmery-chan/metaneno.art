import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { wait } from "./utils";

export const updateMessage = createAction<{ message: string }>(
  "CHEKI/UPDATE_MESSAGE"
);

export const updateMessageAfterFiveSeconds = createAsyncThunk<
  { message: string }, // Payload Type
  { message: string } // Argument Type
>("CHEKI/UPDATE_MESSAGE_AFTER_FIVE_SECONDS", async ({ message }) => {
  await wait(5000);
  return { message };
});
