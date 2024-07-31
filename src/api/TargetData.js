import {
  fetchShiftTargetStart,
  fetchShiftTargetSuccess,
  fetchShiftTargetFailure,
} from "../Slicer/shiftTargetSlice.js";
import ENV from "../utilities/ENV.js";

export const fetchShiftTarget = (payload) => async (dispatch) => {
  dispatch(fetchShiftTargetStart());
  try {
    const response = await ENV.get(
      `/getTarget?isSystem=${payload.isSystem}&date=${payload.date}`
    );
    dispatch(fetchShiftTargetSuccess(response.data.data));
    return response.data.data;
  } catch (error) {
    dispatch(fetchShiftTargetFailure(error.message));
  }
};
