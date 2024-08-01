import { combineReducers } from "redux";
import { ShiftTargetReducer } from "../Slicer/shiftTargetSlice";
import { EmojiStatusReducer } from "../Slicer/EmojiStatusSlice";
import { CurrentHrsReducer } from "../Slicer/CurrentHrsSilce";
import { LastThreeHrsAvgReducer } from "../Slicer/LastThreeHrsAvgSilcer";

const rootReducer = combineReducers({
  shiftTarget: ShiftTargetReducer,
  emojiStatus: EmojiStatusReducer,
  currentHrs: CurrentHrsReducer,
  LastThreeHrsAvg: LastThreeHrsAvgReducer,
});

export default rootReducer;
