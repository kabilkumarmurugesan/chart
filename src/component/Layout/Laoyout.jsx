import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ENV from "../../utilities/ENV";
import AppContainer from "./AppContainer";
import AppHeader from "./AppHeader";
import ShiftContext from "./shiftContext";

function Layout() {
  const [refreshRate, setRefreshRate] = useState(30000);
  const [ShowShift, setShowShift] = useState("Day");
  const [ShowShiftDate, setShowShiftDate] = useState("Today");
  const [shiftHours, setShiftHours] = useState(true);
  const [refreshStatus, setRefreshStatus] = useState(true);
  const [isSystem, setIsSystem] = useState(true);
  const [targetList, setTargetList] = useState([]);

  useEffect(() => {
    getShiftTarget();
  }, [isSystem]);

  const handleOnShift = (e) => {
    setShiftHours((pre) => e.target.checked);
  };

  const handleRefresh = (e) => {
    let temp = !e.currentTarget.checked ? 30000 : 45000;
    setRefreshRate(temp);
  };

  const handleRefreshStatus = (e) => {
    setRefreshStatus(!refreshStatus);
  };

  const handleShiftUpdate = (innerText) => {
    setShowShift(innerText);
  };

  const handleShiftDateUpdate = (e) => {
    let temp = e.currentTarget.innerText;
    setShowShiftDate(temp);
  };

  const handleShiftTarget = (e) => {
    setIsSystem((pre) => e.target.checked);
  };

  const getShiftTarget = async () => {
    try {
      const response = await ENV.get(`/getTarget?isSystem=${isSystem}`);
      setTargetList(response.data.data); // Assuming `data` contains the array you need
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const contextValue = {
    handleShiftUpdate,
    handleRefresh,
    handleShiftDateUpdate,
    handleOnShift,
    handleShiftTarget,
    handleRefreshStatus,
    isSystem,
    refreshRate,
    ShowShift,
    ShowShiftDate,
    refreshStatus,
    shiftHours,
    targetList,
  };

  return (
    <ShiftContext.Provider value={contextValue}>
      <AppHeader />
      <Box>
        <AppContainer targetList={targetList} />
      </Box>
      <Box style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#fff' }}>V 1.0</Box>
    </ShiftContext.Provider>
  );
}

export default Layout;
