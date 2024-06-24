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
  handleSlidechange,
  visibleQRCodeIndex,
  setVisibleQRCodeIndex,
  todayDate,
  downTimeAction,
  targetList,
}) => {
  const handleSlidechanges = () => {
    handleSlidechange();
  };
  return (
    <Box sx={{ p: 2 }}>
      <Grid container rowSpacing={1} spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ minWidth: 275 }}>
            <ShiftHeader date={yesterdayDate} time={firstShiftTiming} />
            <BarChart
              height={"28vh"}
              targetList={targetList}
              setVisibleQRCodeIndex={setVisibleQRCodeIndex}
              handleSlidechange={handleSlidechanges}
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
              targetList={targetList}
              height={"30vh"}
              setVisibleQRCodeIndex={setVisibleQRCodeIndex}
              handleSlidechange={handleSlidechanges}
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
