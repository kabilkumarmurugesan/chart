import AppContainer from './AppContainer';
import AppHeader from './AppHeader';
import { useState } from 'react';
import { Box } from '@mui/material';

function Laoyout() {
  const [refreshRate, setRefreshRate] = useState(15000);
  const [ShowShift, setShowShift] = useState('All');
  const [ShowShiftDate, setShowShiftDate] = useState('Today');
  const [shiftHours, setShiftHours] = useState(true);
  const [isDownTime, setIsDownTime] = useState(true);

  const handleOnShift = (e) => {
    setShiftHours((pre) => e.target.checked);
  };

  const handleOnDownTime = (e) => {
    setIsDownTime(e.target.checked);
  };

  const handleRefresh = (e) => {
    let temp = e.currentTarget.innerText === '30 sec' ? 30000 : 15000;
    setRefreshRate(temp);
  };

  const handleShiftUpdate = (e) => {
    let temp = e.currentTarget.innerText === 'Shift' ? 'Day' : 'All';
    setShowShift(temp);
  };

  const handleShiftDateUpdate = (e) => {
    let temp = e.currentTarget.innerText;
    setShowShiftDate(temp);
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
        refreshRate={refreshRate}
        ShowShift={ShowShift}
        ShowShiftDate={ShowShiftDate}
        shiftHours={shiftHours}
      />
      <Box>
        <AppContainer
          shiftHours={shiftHours}
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
