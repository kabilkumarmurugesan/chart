import React from "react";
import { Box, Card, Grid } from "@mui/material";
import BasicTable from "../Table/Table";
import BarChart from "../charts/BarChart";
import BarChartCopy from "../charts/BarChartCopy";
import ShiftHeader from "./ShiftHeader";
import DownTimeAction from "../Table/DownTimeAction";

const FullShift = ({
  ShowShiftDate,
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
  targetList,
  currentShift,
  firstDowntimeDetails,
  secoundDowntimeDetails,
}) => {
  const handleSlidechanges = () => {
    handleSlidechange();
  };
  return (
    <Box sx={{ p: 2 }}>
      <Grid container rowSpacing={1} spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ minWidth: 275 }}>
            <ShiftHeader
              date={ShowShiftDate === "Yesterday" ? yesterdayDate : todayDate}
              time={firstShiftTiming}
              isCurrentShift={currentShift === "shiftA"}
            />
            {currentShift === "shiftB" ? (
              <BarChart
                height={"33vh"}
                targetList={targetList}
                setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                handleSlidechange={handleSlidechanges}
                visibleQRCodeIndex={visibleQRCodeIndex}
                categories={categories}
                response={firstResponse}
              />
            ) : (
              <BarChartCopy
                height={"35vh"}
                targetList={targetList}
                lastBarValue={currentShift === "shiftA" && lastBarValue}
                setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                handleSlidechange={handleSlidechanges}
                visibleQRCodeIndex={visibleQRCodeIndex}
                categories={categories}
                response={firstResponse}
                currentShift={currentShift}
                isCurrentShift={currentShift === "shiftA"}
              />
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ minWidth: 275 }}>
            <ShiftHeader
              date={ShowShiftDate === "Yesterday" ? yesterdayDate : todayDate}
              time={secoundShiftTiming}
              isCurrentShift={currentShift === "shiftB"}
            />
            {currentShift === "shiftA" ? (
              <BarChart
                height={"33vh"}
                targetList={targetList}
                setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                handleSlidechange={handleSlidechanges}
                visibleQRCodeIndex={visibleQRCodeIndex}
                categories={categories}
                response={secoundResponse}
                shiftHours={shiftHours}
              />
            ) : (
              <BarChartCopy
                height={"35vh"}
                targetList={targetList}
                lastBarValue={currentShift === "shiftB" && lastBarValue}
                animations={false}
                setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                handleSlidechange={handleSlidechanges}
                visibleQRCodeIndex={visibleQRCodeIndex}
                categories={categories}
                response={secoundResponse}
                shiftHours={shiftHours}
                currentShift={currentShift}
                isCurrentShift={currentShift === "shiftB"}
              />
            )}
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          {firstResponse !== undefined && (
            <BasicTable response={firstResponse} categories={categories} />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {secoundResponse !== undefined && (
            <BasicTable response={secoundResponse} categories={categories} />
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={6} md={6}>
          <DownTimeAction data={firstDowntimeDetails} />
        </Grid>
        <Grid item xs={6} md={6}>
          <DownTimeAction data={secoundDowntimeDetails} />
        </Grid>{" "}
      </Grid>
    </Box>
  );
};

export default FullShift;
