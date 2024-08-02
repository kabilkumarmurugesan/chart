import {
  fetchProductionDataStart,
  fetchProductionDataSuccess,
  fetchProductionDataFailure,
} from "../Slicer/ProductionDataSilce.js";
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
