import React, { useContext } from "react";
import { Box, Card, Grid } from "@mui/material";
import BasicTable from "../Table/Table";
import BarChart from "../charts/BarChart";
import BarChartLive from "../charts/BarChartLive";
import ShiftHeader from "./ShiftHeader";
import DownTimeAction from "../Table/DownTimeAction";
import ArrowNavigation from "../Card/ArrowNavigation";
import ShiftContext from "../../utilities/Context/shiftContext";

const FullShift = ({
  yesterdayDate,
  secoundResponse,
  firstResponse,
  categories,
  lastBarValue,
  handleSlidechange,
  visibleQRCodeIndex,
  setVisibleQRCodeIndex,
  handleButtonClick,
  todayDate,
  currentShift,
  firstDowntimeDetails,
  secoundDowntimeDetails,
  secoundCardData,
  firstCardData,
  disabledOne,
  disabledTwo,
  handaleEvent,
  targetOne,
  shiftType,
}) => {
  const { ShowShiftDate, shiftHours } = useContext(ShiftContext);

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
              time={"09:00 AM - 05:30 PM"}
              isCurrentShift={currentShift === "shiftA"}
              cardData={firstCardData}
            />
            {currentShift === "shiftB" ? (
              <BarChart
                height={"33vh"}
                targetOne={targetOne}
                setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                handleButtonClick={handleButtonClick}
                handleSlidechange={handleSlidechanges}
                visibleQRCodeIndex={visibleQRCodeIndex}
                categories={categories}
                response={firstResponse}
                shiftType={shiftType}
              />
            ) : (
              <BarChartLive
                height={"35vh"}
                targetOne={targetOne}
                lastBarValue={currentShift === "shiftA" && lastBarValue}
                setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                handleButtonClick={handleButtonClick}
                handleSlidechange={handleSlidechanges}
                visibleQRCodeIndex={visibleQRCodeIndex}
                categories={categories}
                response={firstResponse}
                currentShift={currentShift}
                shiftType={shiftType}
                isCurrentShift={currentShift === "shiftA"}
              />
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ minWidth: 275 }}>
            <ShiftHeader
              date={ShowShiftDate === "Yesterday" ? yesterdayDate : todayDate}
              time={"09:00 PM - 05:30 AM"}
              isCurrentShift={currentShift === "shiftB"}
              cardData={secoundCardData}
            />
            {currentShift === "shiftA" ? (
              <BarChart
                height={"33vh"}
                setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                handleButtonClick={handleButtonClick}
                handleSlidechange={handleSlidechanges}
                visibleQRCodeIndex={visibleQRCodeIndex}
                categories={categories}
                response={secoundResponse}
                shiftHours={shiftHours}
                targetOne={targetOne}
              />
            ) : (
              <BarChartLive
                height={"35vh"}
                targetOne={targetOne}
                lastBarValue={currentShift === "shiftB" && lastBarValue}
                animations={false}
                setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                handleButtonClick={handleButtonClick}
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
      <Grid container>
        <Grid
          item
          xs={12}
          md={12}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <ArrowNavigation
            disabledOne={disabledOne}
            disabledTwo={disabledTwo}
            handaleEvent={handaleEvent}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
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
