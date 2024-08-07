import { combineReducers } from "redux";
import { ShiftTargetReducer } from "../Slicer/shiftTargetSlice";
import { EmojiStatusReducer } from "../Slicer/EmojiStatusSlice";
import { CurrentHrsReducer } from "../Slicer/CurrentHrsSilce";
import {
  LastHrsDataReducer,
  LastThreeHrsAvgReducer,
  LastTwoHrsDataReducer,
} from "../Slicer/SingleShiftHrs";
import { ProductionDataReducer } from "../Slicer/ProductionDataSilce";

const rootReducer = combineReducers({
  shiftTarget: ShiftTargetReducer,
  emojiStatus: EmojiStatusReducer,
  currentHrs: CurrentHrsReducer,
  lastThreeHrsAvg: LastThreeHrsAvgReducer,
  lastTwoHrsData: LastTwoHrsDataReducer,
  lastHrsData: LastHrsDataReducer,
  productionData: ProductionDataReducer,
});

export default rootReducer;
