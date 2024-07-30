import { combineReducers } from "redux";
import { ShiftTargetReducer } from "../features/shiftTarget";

const rootReducer = combineReducers({
  ShiftTarget: ShiftTargetReducer,
});

export default rootReducer;
