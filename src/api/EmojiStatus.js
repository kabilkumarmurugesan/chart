import {
  fetchEmojiStatusSuccess,
  fetchEmojiStatusFailure,
  fetchEmojiStatusStart,
} from "../Slicer/EmojiStatusSlice.js";
import ENV from "../utilities/ENV.js";

export const fetchEmojiStatus = (payload) => async (dispatch) => {
  dispatch(fetchEmojiStatusStart());
  try {
    const response = await ENV.get(
      `/getEmoji?isShift=${payload.isShift}&dataCount=${payload.dataCount}`
    );
    dispatch(fetchEmojiStatusSuccess(response.data.data));
    return response.data.data;
  } catch (error) {
    dispatch(fetchEmojiStatusFailure(error.message));
  }
};
