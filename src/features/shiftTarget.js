import { createSlice } from "@reduxjs/toolkit";

const ShiftTargetSlice = createSlice({
  name: "ShiftTarget",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchShiftTargetStart: (state) => {
      state.loading = true;
    },
    fetchShiftTargetSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchShiftTargetFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchShiftTargetStart,
  fetchShiftTargetSuccess,
  fetchShiftTargetFailure,
} = ShiftTargetSlice.actions;

export const ShiftTargetReducer = ShiftTargetSlice.reducer;
