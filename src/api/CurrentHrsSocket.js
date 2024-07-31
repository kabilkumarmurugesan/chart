import {
  fetchCurrentHrsSuccess,
  fetchCurrentHrsFailure,
  fetchCurrentHrsStart,
} from "../Slicer/CurrentHrsSlice.js";
import ENV from "../utilities/ENV.js";
import { socket } from "../utilities/socket.js";

export const fetchCurrentHrs = (payload) => async (dispatch) => {
  dispatch(fetchCurrentHrsStart());
  try {
    socket.on("LastThreeHourdata", (data) => {
      dispatch(fetchCurrentHrsSuccess(data));
    });
    return response.data.data;
  } catch (error) {
    dispatch(fetchCurrentHrsFailure(error.message));
  }
};
