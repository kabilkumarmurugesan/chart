import AppContainer from "./AppContainer";
import AppHeader from "./AppHeader";
import MUIWrapper from "../MUIWrapper";
import { useState } from "react";

function Laoyout() {
  const [refreshRate, setRefreshRate] = useState(15000)

  const handleRefresh = (e) => {
    let temp = e.currentTarget.innerText === '30 sec' ? 30000 : 15000
    setRefreshRate(temp)
  }
  
  return (
    <MUIWrapper>
      <AppHeader handleRefresh={handleRefresh} refreshRate={refreshRate}/>
      <AppContainer refreshRate={refreshRate}/>
    </MUIWrapper>
  );
}

export default Laoyout;
