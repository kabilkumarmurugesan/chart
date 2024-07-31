import { combineReducers } from "redux";
import { ShiftTargetReducer } from "../Slicer/shiftTargetSlice";
import { EmojiStatusReducer } from "../Slicer/EmojiStatusSlice";
import { CurrentHrsReducer } from "../Slicer/CurrentHrsSilcer";

const rootReducer = combineReducers({
  shiftTarget: ShiftTargetReducer,
  emojiStatus: EmojiStatusReducer,
  currentHrs: CurrentHrsReducer,
});

export default rootReducer;
