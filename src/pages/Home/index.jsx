import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import AppContainer from "../../component/Layout/AppContainer";
import AppHeader from "../../component/Layout/AppHeader";
import ShiftContext from "../../utilities/Context/shiftContext";
import { useDispatch } from "react-redux";
import { fetchShiftTarget } from "../../api/TargetData";
import locale from "../../utilities/local/local";

function Home() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { primary } = theme.palette;
  const [refreshRate, setRefreshRate] = useState(30000);
  const [ShowShift, setShowShift] = useState("Day");
  const [ShowShiftDate, setShowShiftDate] = useState("Today");
  const [shiftHours, setShiftHours] = useState(true);
  const [refreshStatus, setRefreshStatus] = useState(true);
  const [isSystem, setIsSystem] = useState(true);

  useEffect(() => {
    const dates = new Date();
    if (ShowShiftDate === "Today") {
      let formattedDate = dates.toISOString().split("T")[0];
      dispatch(
        fetchShiftTarget({
          isSystem,
          data: formattedDate,
        })
      );
    } else {
      const formattedDate = `${dates.getFullYear()}-${
        dates.getMonth() + 1
      }-${dates.getDate()}`;
      let currentDateString = new Date(formattedDate);
      let date = currentDateString.toISOString().split("T")[0];
      dispatch(
        fetchShiftTarget({
          isSystem,
          date,
        })
      );
    }
  }, [isSystem, ShowShiftDate]);

  const handleOnShift = (e) => {
    setShiftHours(e.target.checked);
  };

  const handleRefresh = (e) => {
    let temp = e.target.checked ? 45000 : 30000;
    setRefreshRate(temp);
  };

  const handleRefreshStatus = () => {
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
    setIsSystem(e.target.checked);
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
  };

  return (
    <ShiftContext.Provider value={contextValue}>
      <AppHeader locale={locale} />
      <Box>
        <AppContainer locale={locale} />
      </Box>
      <Box
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          background: primary.main,
          color: primary.main,
        }}
      >
        V 3.1
      </Box>
    </ShiftContext.Provider>
  );
}

export default Home;
