import { createSlice } from "@reduxjs/toolkit";

const LastThreeHrsAvgHrsAvg = createSlice({
  name: "LastThreeHrsAvg",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchLastThreeHrsAvgStart: (state) => {
      state.loading = true;
    },
    fetchLastThreeHrsAvgSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchLastThreeHrsAvgFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchLastThreeHrsAvgStart,
  fetchLastThreeHrsAvgSuccess,
  fetchLastThreeHrsAvgFailure,
} = LastThreeHrsAvgHrsAvg.actions;

export const LastThreeHrsAvgReducer = LastThreeHrsAvgHrsAvg.reducer;
