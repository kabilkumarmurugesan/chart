import { createSlice } from "@reduxjs/toolkit";

const ProductionDataSilce = createSlice({
  name: "productionData",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchProductionDataStart: (state) => {
      state.loading = true;
    },
    fetchProductionDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchProductionDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductionDataStart,
  fetchProductionDataSuccess,
  fetchProductionDataFailure,
} = ProductionDataSilce.actions;

export const ProductionDataReducer = ProductionDataSilce.reducer;
