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

const LastTwoHrsData = createSlice({
  name: "LastTwoHrsData",
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
  fetchLastTwoHrsDataSuccess,
  fetchLastTwoHrsDataFailure,
} = LastTwoHrsData.actions;

export const {
  fetchLastThreeHrsAvgStart,
  fetchLastThreeHrsAvgSuccess,
  fetchLastThreeHrsAvgFailure,
} = LastThreeHrsAvg.actions;

export const LastTwoHrsDataReducer = LastTwoHrsData.reducer;

export const LastThreeHrsAvgReducer = LastThreeHrsAvg.reducer;
