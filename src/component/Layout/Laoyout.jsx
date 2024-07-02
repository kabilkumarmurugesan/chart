import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import ENV from "../../utilities/ENV";
import AppContainer from "./AppContainer";
import AppHeader from "./AppHeader";
import CommonService from "../../utilities/CommonService";
import ShiftContext from "../Context/shiftContext";

function Layout() {
  const theme = useTheme();
  const { primary } = theme.palette;
  const [refreshRate, setRefreshRate] = useState(30000);
  const [ShowShift, setShowShift] = useState("Day");
  const [ShowShiftDate, setShowShiftDate] = useState("Today");
  const [shiftHours, setShiftHours] = useState(true);
  const [refreshStatus, setRefreshStatus] = useState(true);
  const [isSystem, setIsSystem] = useState(true);
  const [targetList, setTargetList] = useState([]);

  useEffect(() => {
    const dates = new Date();
    if (ShowShiftDate === "Today") {
      const formattedDate = `${dates.getFullYear()}-${
        dates.getMonth() + 1
      }-${dates.getDate()}`;
      getShiftTarget(formattedDate);
    } else {
      const formattedDate = `${dates.getFullYear()}-${dates.getMonth() + 1}-${
        dates.getDate() - 1
      }`;
      getShiftTarget(formattedDate);
    }
  }, [isSystem, ShowShiftDate]);

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

  const getShiftTarget = async (formattedDate) => {
    let currentDateString = new Date(formattedDate);
    let date = currentDateString.toISOString().split("T")[0];
    ENV.get(`/getTarget?isSystem=${isSystem}&date=${date}`)
      .then((res) => {
        setTargetList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
        <AppContainer />
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
        V 1.1
      </Box>
    </ShiftContext.Provider>
  );
}

export default Layout;
