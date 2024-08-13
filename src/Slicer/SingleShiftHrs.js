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

const LastHrsData = createSlice({
  name: "LastHrsData",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchLastHrsDataStart: (state) => {
      state.loading = true;
    },
    fetchLastHrsDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchLastHrsDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const CurrentHrsData = createSlice({
  name: "CurrentHrsData",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchCurrentHrsDataStart: (state) => {
      state.loading = true;
    },
    fetchCurrentHrsDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchCurrentHrsDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCurrentHrsDataStart,
  fetchCurrentHrsDataSuccess,
  fetchCurrentHrsDataFailure,
} = CurrentHrsData.actions;

export const {
  fetchLastHrsDataStart,
  fetchLastHrsDataSuccess,
  fetchLastHrsDataFailure,
} = LastHrsData.actions;

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

export const CurrentHrsDataReducer = CurrentHrsData.reducer;

export const LastHrsDataReducer = LastHrsData.reducer;

export const LastTwoHrsDataReducer = LastTwoHrsData.reducer;

export const LastThreeHrsAvgReducer = LastThreeHrsAvg.reducer;
