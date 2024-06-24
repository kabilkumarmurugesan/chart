import React from "react";
import { Box, Card, Grid } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import emoj from "../../asset/gif/emoj.png";
import BarChart from "../charts/BarChart";
import BarChartCopy from "../charts/BarChartCopy";
import ShiftHeader from "./ShiftHeader";
import DownTimeAction from "../Card/DownTimeAction";
import MetricsCard from "../Card/MetricsCard";

const FullShiftOverall = ({
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
  targetList,
  cardData,
}) => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container rowSpacing={3} spacing={4}>
        <Grid item xs={12} md={10} className="dateChart">
          <Grid container rowSpacing={2}>
            <Grid item xs={12} md={12} sx={{ height: "34vh" }}>
              <Card sx={{ minWidth: 275 }}>
                <ShiftHeader
                  date={yesterdayDate}
                  time={"09:00 PM - 05:30 AM"}
                />
                <BarChart
                  height={"25vh"}
                  setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                  handleSlidechage={handleSlidechage}
                  visibleQRCodeIndex={visibleQRCodeIndex}
                  categories={categories}
                  response={firstResponse}
                  targetList={targetList}
                />
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sx={{ height: "34vh", marginTop: "20px" }}
            >
              <Card sx={{ minWidth: 275 }}>
                <ShiftHeader date={todayDate} time={"09:00 AM - 05:30 PM"} />
                <BarChartCopy
                  height={"24vh"}
                  targetList={targetList}
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
        </Grid>

        <Grid item xs={4} md={2}>
          <MetricsCard data={cardData} />
        </Grid>
        <Grid item xs={6} md={12} className="timeChart">
          <Grid container spacing={4}>
            <Grid item xs={6} md={10}>
              <DownTimeAction data={downTimeAction} />
            </Grid>
            <Grid item xs={4} md={2}>
              {visibleQRCodeIndex === null ? (
                <img style={{ width: "54%" }} alt="emoj" src={emoj} />
              ) : (
                <Card>
                  <QRCodeCanvas
                    value={
                      "MES~LEMES MM~S0V MT~11T3 MO~L9N023103009 SN~PG03MQD5 INS~ ID~1S11T3S0V900PG03MQD5"
                    }
                    size={150}
                  />
                </Card>
              )}
            </Grid>
          </Grid>{" "}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FullShiftOverall;
