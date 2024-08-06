import {
  fetchProductionDataStart,
  fetchProductionDataSuccess,
  fetchProductionDataFailure,
} from "../Slicer/ProductionDataSilce.js";
import {
  fetchLastTwoHrsDataStart,
  fetchLastTwoHrsDataSuccess,
  fetchLastTwoHrsDataFailure,
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
    dispatch(fetchProductionDataSuccess(response.data.data));
    return response.data.data;
  } catch (error) {
    dispatch(fetchProductionDataFailure(error.message));
  }
};

export const fetchLastTwoHour = (payload) => async (dispatch) => {
  dispatch(fetchLastTwoHrsDataStart());
  try {
    const response = await ENV.get(`getLastThreeHour?line=${payload.Line}`);
    dispatch(fetchLastTwoHrsDataSuccess(response.data.data));
    return response.data.data;
  } catch (error) {
    dispatch(fetchLastTwoHrsDataFailure(error.message));
  }
};
