import AppContainer from "./AppContainer";
import AppHeader from "./AppHeader";
import MUIWrapper from "../MUIWrapper";
import { useState } from "react";

function Laoyout() {
  const [refreshRate, setRefreshRate] = useState(15000)
  const [ShowShift, setShowShift] = useState('All')

  const handleRefresh = (e) => {
    let temp = e.currentTarget.innerText === '30 sec' ? 30000 : 15000
    setRefreshRate(temp)
  }

  const handleShiftUpdate = (e) => {
    let temp = e.currentTarget.innerText == 'Shift' ? 'Day' : 'All'
    setShowShift(temp)
  }

  return (
    <MUIWrapper>
      <AppHeader handleShiftUpdate={handleShiftUpdate} handleRefresh={handleRefresh} refreshRate={refreshRate} ShowShift={ShowShift} />
      <AppContainer ShowShift={ShowShift} refreshRate={refreshRate} />
    </MUIWrapper>
  );
}

export default Laoyout;
