import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import ENV from "../../utilities/ENV";
import AppContainer from "../../component/Layout/AppContainer";
import AppHeader from "../../component/Layout/AppHeader";
import ShiftContext from "../../utilities/Context/shiftContext";
import RadioBtn from "../../component/RadioBtn";

function Home() {
  const theme = useTheme();
  const { primary } = theme.palette;
  const [refreshRate, setRefreshRate] = useState(30000);
  const [ShowShift, setShowShift] = useState("Day");
  const [ShowShiftDate, setShowShiftDate] = useState("Today");
  const [shiftHours, setShiftHours] = useState(true);
  const [refreshStatus, setRefreshStatus] = useState(true);
  const [isSystem, setIsSystem] = useState(true);
  const [targetList, setTargetList] = useState([]);
  const [appHeaderStatus, setAppHeaderStatus] = useState("tool");
  const [intervals, setIntervals] = useState(60000);

  useEffect(() => {
    const dates = new Date();
    if (ShowShiftDate === "Today") {
      let formattedDate = dates.toISOString().split("T")[0];
      getShiftTarget(formattedDate);
    } else {
      const formattedDate = `${dates.getFullYear()}-${
        dates.getMonth() + 1
      }-${dates.getDate()}`;
      let currentDateString = new Date(formattedDate);
      let date = currentDateString.toISOString().split("T")[0];
      getShiftTarget(date);
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
    setShowShiftDate(() => temp);
  };

  const handleShiftTarget = (e) => {
    setIsSystem((pre) => e.target.checked);
  };

  const getShiftTarget = async (date) => {
    ENV.get(`/getTarget?isSystem=${isSystem}&date=${date}`)
      .then((res) => {
        setTargetList(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInterval = (event) => {
    event.persist();
    setIntervals(event.target.value);
  };

  const contextValue = {
    handleShiftUpdate,
    handleRefresh,
    handleShiftDateUpdate,
    handleOnShift,
    handleShiftTarget,
    handleRefreshStatus,
    setAppHeaderStatus,
    isSystem,
    refreshRate,
    ShowShift,
    ShowShiftDate,
    refreshStatus,
    shiftHours,
    targetList,
    intervals
  };

  return (
    <ShiftContext.Provider value={contextValue}>
      {appHeaderStatus === "head" ? (
        <AppHeader
          type={"head"}
          component={<RadioBtn handleEvent={handleInterval} />}
        />
      ) : (
        <AppHeader type={appHeaderStatus} />
      )}
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
        V 2.1
      </Box>
    </ShiftContext.Provider>
  );
}

export default Home;
