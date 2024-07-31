import { createSlice } from "@reduxjs/toolkit";

const CurrentHrsSlice = createSlice({
  name: "currentHrs",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchCurrentHrsStart: (state) => {
      state.loading = true;
    },
    fetchCurrentHrsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchCurrentHrsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCurrentHrsStart,
  fetchCurrentHrsSuccess,
  fetchCurrentHrsFailure,
} = CurrentHrsSlice.actions;

export const CurrentHrsReducer = CurrentHrsSlice.reducer;
