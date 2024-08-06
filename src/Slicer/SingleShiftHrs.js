import { createSlice } from "@reduxjs/toolkit";

const LastThreeHrsAvg = createSlice({
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

const LastThreeHrsData = createSlice({
  name: "LastThreeHrsData",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchLastTwoHrsDataStart: (state) => {
      state.loading = true;
    },
    fetchLastTwoHrsDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchLastTwoHrsDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchLastTwoHrsDataStart,
  fetchLastThreeHrsDataSuccess,
  fetchLastThreeHrsDataFailure,
} = LastThreeHrsData.actions;

export const {
  fetchLastThreeHrsAvgStart,
  fetchLastThreeHrsAvgSuccess,
  fetchLastThreeHrsAvgFailure,
} = LastThreeHrsAvg.actions;

export const LastThreeHrsDataReducer = LastThreeHrsData.reducer;

export const LastThreeHrsAvgReducer = LastThreeHrsAvg.reducer;
