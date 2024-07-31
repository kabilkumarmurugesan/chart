import { createSlice } from "@reduxjs/toolkit";

const EmojiStatusSlice = createSlice({
  name: "emojiStatus",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchEmojiStatusStart: (state) => {
      state.loading = true;
    },
    fetchEmojiStatusSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchEmojiStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchEmojiStatusStart,
  fetchEmojiStatusSuccess,
  fetchEmojiStatusFailure,
} = EmojiStatusSlice.actions;

export const EmojiStatusReducer = EmojiStatusSlice.reducer;
