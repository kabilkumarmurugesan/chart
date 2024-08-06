import {
  fetchLastThreeHrsAvgSuccess,
  fetchLastThreeHrsAvgFailure,
  fetchLastThreeHrsAvgStart,
} from "../Slicer/SingleShiftHrs.js";
import {
  fetchCurrentHrsSuccess,
  fetchCurrentHrsFailure,
  fetchCurrentHrsStart,
} from "../Slicer/CurrentHrsSilce.js";
import { socket } from "../utilities/socket.js";

export const fetchLastThreeHrsAvgHrs = (payload) => async (dispatch) => {
  dispatch(fetchLastThreeHrsAvgStart());
  try {
    socket.on("LastThreeHourdata", (data) => {
      dispatch(fetchLastThreeHrsAvgSuccess(data));
    });
  } catch (error) {
    dispatch(fetchLastThreeHrsAvgFailure(error.message));
  }
};

export const fetchCurrentHrs = (payload) => async (dispatch) => {
  dispatch(fetchCurrentHrsStart());
  try {
    socket.send(JSON.stringify(payload));
    socket.on("getCurrentHour", (data) => {
      dispatch(fetchCurrentHrsSuccess(data));
    });
  } catch (error) {
    dispatch(fetchCurrentHrsFailure(error.message));
  }
};
