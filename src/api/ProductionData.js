import {
  fetchProductionDataStart,
  fetchProductionDataSuccess,
  fetchProductionDataFailure,
} from "../Slicer/ProductionDataSilce.js";
import {
  fetchLastTwoHrsDataStart,
  fetchLastTwoHrsDataSuccess,
  fetchLastTwoHrsDataFailure,
  fetchLastHrsDataStart,
  fetchLastHrsDataSuccess,
  fetchLastHrsDataFailure,
} from "../Slicer/SingleShiftHrs.js";
import CommonService from "../utilities/CommonService.js";
import ENV from "../utilities/ENV.js";

export const fetchProductionData = (payload) => async (dispatch) => {
  const date = CommonService.formatDates(payload.date);
  dispatch(fetchProductionDataStart());
  try {
    const response = await ENV.get(
      `productiondata?line=${payload.Line}${payload.temp}&date=${date}&target=${payload.targetOne}&isSystem=${payload.isSystem}`
    );
    const data = response.data.data;
    dispatch(fetchProductionDataSuccess(data));
    return data;
  } catch (error) {
    dispatch(fetchProductionDataFailure(error.message));
  }
};

export const fetchLastTwoHour = (payload) => async (dispatch) => {
  dispatch(fetchLastTwoHrsDataStart());
  try {
    const response = await ENV.get(`getLastThreeHour?line=${payload.Line}`);
    const data = response.data.data;
    dispatch(fetchLastTwoHrsDataSuccess(data));
    return data;
  } catch (error) {
    dispatch(fetchLastTwoHrsDataFailure(error.message));
  }
};

export const fetchLastHour = (payload) => async (dispatch) => {
  dispatch(fetchLastHrsDataStart());
  try {
    const response = await ENV.get(
      `getLastHour?duration=${payload.duration / 1000}`
    );
    const data = response.data.data;
    dispatch(fetchLastHrsDataSuccess(data));
    return data;
  } catch (error) {
    dispatch(fetchLastHrsDataFailure(error.message));
  }
};
