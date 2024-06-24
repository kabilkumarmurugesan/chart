import React from "react";
import { Box, Card, Grid } from "@mui/material";
import BasicTable from "../Table/Table";
import BarChart from "../charts/BarChart";
import BarChartCopy from "../charts/BarChartCopy";
import ShiftHeader from "./ShiftHeader";
import DownTimeAction from "../Card/DownTimeAction";

const FullShift = ({
  yesterdayDate,
  secoundResponse,
  secoundShiftTiming,
  firstShiftTiming,
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
      <Grid container rowSpacing={1} spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ minWidth: 275 }} className="smartCard">
            <ShiftHeader date={yesterdayDate} time={firstShiftTiming} />
            <BarChart
              height={"35vh"}
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
            <ShiftHeader date={todayDate} time={secoundShiftTiming} />
            <BarChartCopy
              height={"37vh"}
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
      <Grid container spacing={2} sx={{ mt: 1 }}>
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
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={6} md={6}>
          <DownTimeAction data={downTimeAction} />
        </Grid>
        <Grid item xs={6} md={6}>
          <DownTimeAction data={downTimeAction} />
        </Grid>{" "}
      </Grid>
    </Box>
  );
};

export default FullShift;
