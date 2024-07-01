import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ENV from "../../utilities/ENV";
import AppContainer from "./AppContainer";
import AppHeader from "./AppHeader";

function Laoyout() {
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
    ENV.get(`/getTarget?isSystem=${isSystem}`)
      .then((res) => {
        setTargetList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <AppHeader
        handleShiftUpdate={handleShiftUpdate}
        handleRefresh={handleRefresh}
        handleShiftDateUpdate={handleShiftDateUpdate}
        handleOnShift={handleOnShift}
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
          ShowShiftDate={ShowShiftDate}
          ShowShift={ShowShift}
          refreshRate={refreshRate}
        />
      </Box>
    </>
  );
}

export default Laoyout;
