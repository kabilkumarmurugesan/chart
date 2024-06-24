import AppContainer from "./AppContainer";
import AppHeader from "./AppHeader";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

function Laoyout() {
  const [refreshRate, setRefreshRate] = useState(30000);
  const [ShowShift, setShowShift] = useState("All");
  const [ShowShiftDate, setShowShiftDate] = useState("Today");
  const [shiftHours, setShiftHours] = useState(true);
  const [refreshStatus, setRefreshStatus] = useState(true);
  const [isDownTime, setIsDownTime] = useState(false);
  const [isSystem, setIsSystem] = useState(true);
  const [targetList, setTargetList] = useState(90);

  useEffect(() => {
    getShiftTarget();
  }, [isSystem]);
  const handleOnShift = (e) => {
    setShiftHours((pre) => e.target.checked);
  };

  const handleOnDownTime = (e) => {
    setIsDownTime(e.target.checked);
  };

  const handleRefresh = (e) => {
    let temp = e.currentTarget.innerText === "30 sec" ? 30000 : 45000;
    setRefreshRate(temp);
  };

  const handleRefreshStatus = (e) => {
    setRefreshStatus(!refreshStatus);
  };

  const handleShiftUpdate = (e) => {
    let temp = e.currentTarget.innerText === "Shift" ? "Day" : "All";
    setShowShift(temp);
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
      const response = await fetch(
        `http://localhost:8001/api/v1/general/getTarget?isSystem=${isSystem}`
      );
      const result = await response.json();
      setTargetList((pre) => result.data.target);
    } catch (error) {
      console.error(`Download error: ${error.message}`);
    }
  };
  return (
    <>
      <AppHeader
        handleShiftUpdate={handleShiftUpdate}
        handleRefresh={handleRefresh}
        handleShiftDateUpdate={handleShiftDateUpdate}
        handleOnShift={handleOnShift}
        isDownTime={isDownTime}
        handleOnDownTime={handleOnDownTime}
        handleShiftTarget={handleShiftTarget}
        handleRefreshStatus={handleRefreshStatus}
        isSystem={isSystem}
        refreshRate={refreshRate}
        ShowShift={ShowShift}
        ShowShiftDate={ShowShiftDate}
        refreshStatus={refreshStatus}
        shiftHours={shiftHours}
      />
      <Box>
        <AppContainer
          targetList={targetList}
          shiftHours={shiftHours}
          refreshStatus={refreshStatus}
          isDownTime={isDownTime}
          ShowShiftDate={ShowShiftDate}
          ShowShift={ShowShift}
          refreshRate={refreshRate}
        />
      </Box>
    </>
  );
}

export default Laoyout;
