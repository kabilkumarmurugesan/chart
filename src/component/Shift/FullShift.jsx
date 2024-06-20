import React from 'react';
import { Box, Card, Grid } from '@mui/material';
import BasicTable from '../Table/Table';
import BarChart from '../charts/BarChart';
import BarChartCopy from '../charts/BarChartCopy';
import ShiftHeader from './ShiftHeader';
import DownTimeAction from '../Card/DownTimeAction';

const FullShift = ({
  yesterdayDate,
  secoundResponse,
  firstResponse,
  categories,
  shiftHours,
  lastBarValue,
  handleSlidechage,
  visibleQRCodeIndex,
  setVisibleQRCodeIndex,
  todayDate,
  downTimeAction,
}) => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ minWidth: 275 }}>
            <ShiftHeader date={yesterdayDate} time={'09:00 PM - 05:30 AM'} />
            <BarChart
              height={'36vh'}
              setVisibleQRCodeIndex={setVisibleQRCodeIndex}
              handleSlidechage={handleSlidechage}
              visibleQRCodeIndex={visibleQRCodeIndex}
              categories={categories}
              response={firstResponse}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ minWidth: 275 }}>
            <ShiftHeader date={todayDate} time={'09:00 AM - 05:30 PM'} />
            <BarChartCopy
              height={'40vh'}
              setVisibleQRCodeIndex={setVisibleQRCodeIndex}
              handleSlidechage={handleSlidechage}
              lastBarValue={lastBarValue}
              animations={false}
              response={secoundResponse}
              categories={categories}
              visibleQRCodeIndex={visibleQRCodeIndex}
              shiftHours={shiftHours}
            />
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          {firstResponse !== undefined && (
            <BasicTable response={firstResponse} />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {secoundResponse !== undefined && (
            <BasicTable response={secoundResponse.updatedData} />
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6} md={6}>
          <DownTimeAction data={downTimeAction} />
        </Grid>
        <Grid item xs={6} md={6}>
          <DownTimeAction data={downTimeAction} />
        </Grid>{' '}
      </Grid>
    </Box>
  );
};

export default FullShift;
