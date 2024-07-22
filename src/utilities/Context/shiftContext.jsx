import React from "react";

const ShiftContext = React.createContext({
  handleShiftUpdate: () => {},
  handleRefresh: () => {},
  handleShiftDateUpdate: () => {},
  handleOnShift: () => {},
  handleShiftTarget: () => {},
  handleRefreshStatus: () => {},
  setAppHeaderStatus: () => {},
  isSystem: true,
  refreshRate: 30000,
  ShowShift: "Day",
  ShowShiftDate: "Today",
  refreshStatus: true,
  shiftHours: true,
  intervals: 60000,
});

export default ShiftContext;
