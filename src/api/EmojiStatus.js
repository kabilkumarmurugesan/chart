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
    const data = await response.json();
    dispatch(fetchEmojiStatusSuccess(data));
    return data;
  } catch (error) {
    dispatch(fetchEmojiStatusFailure(error.message));
  }
};
