import { combineReducers } from "redux";
import { ShiftTargetReducer } from "../Slicer/shiftTargetSlice";
import { EmojiStatusReducer } from "../Slicer/EmojiStatusSlice";
import { CurrentHrsReducer } from "../Slicer/CurrentHrsSilce";
import { LastThreeHrsAvgReducer } from "../Slicer/LastThreeHrsAvgSilce";
import { ProductionDataReducer } from "../Slicer/ProductionDataSilce";

const rootReducer = combineReducers({
  shiftTarget: ShiftTargetReducer,
  emojiStatus: EmojiStatusReducer,
  currentHrs: CurrentHrsReducer,
  LastThreeHrsAvg: LastThreeHrsAvgReducer,
  productionData: ProductionDataReducer,
});

export default rootReducer;
