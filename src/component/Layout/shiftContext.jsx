import React from 'react';

const ShiftContext = React.createContext({
    handleShiftUpdate: () => {},
    handleRefresh: () => {},
    handleShiftDateUpdate: () => {},
    handleOnShift: () => {},
    handleShiftTarget: () => {},
    handleRefreshStatus: () => {},
    isSystem: true,
    refreshRate: 30000,
    ShowShift: "Day",
    ShowShiftDate: "Today",
    refreshStatus: true,
    shiftHours: true,
    
  });
  

  
  export default ShiftContext;

