import React, { useEffect, useState } from "react";
import { Box, Button, Card, Grid } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import smileEmoji from "../../asset/gif/emoj.png";
import sadEmoji from "../../asset/gif/SadEmoji.png";
import BarChart from "../charts/BarChart";
import BarChartCopy from "../charts/BarChartCopy";
import ShiftHeader from "./ShiftHeader";
import DownTimeAction from "../Table/DownTimeAction";
import MetricsCard from "../Card/MetricsCard";
import { CommonAPIService } from "../../utilities/CommonAPI";

const FullShiftOverall = ({
  yesterdayDate,
  secoundResponse,
  firstResponse,
  categories,
  shiftHours,
  lastBarValue,
  handleSlidechange,
  visibleQRCodeIndex,
  setVisibleQRCodeIndex,
  todayDate,
  targetList,
  secoundShiftTiming,
  ShowShiftDate,
  cardData,
  firstDowntimeDetails,
  secoundDowntimeDetails,
  firstShiftTiming,
}) => {
  const [isHappy, setIsHappy] = useState();
  const [isShift, setIsShift] = useState(true);
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    CommonAPIService.getEmojiStatus(
      isShift,
      lastBarValue.totalCount,
      setIsHappy
    );
  }, [isShift]);

  const handleSlidechanges = () => {
    handleSlidechange("Full");
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container rowSpacing={3} spacing={4}>
        <Grid item xs={12} md={10} className="dateChart">
          <Grid container rowSpacing={2}>
            <Grid item xs={12} md={12} sx={{ height: "34vh" }}>
              <Card sx={{ minWidth: 275 }}>
                <ShiftHeader
                  date={
                    ShowShiftDate === "Yesterday" ? yesterdayDate : todayDate
                  }
                  time={firstShiftTiming}
                />
                <BarChartCopy
                  height={"25vh"}
                  lastBarValue={lastBarValue}
                  setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                  handleSlidechange={handleSlidechanges}
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
                <ShiftHeader
                  date={
                    ShowShiftDate === "Yesterday" ? yesterdayDate : todayDate
                  }
                  time={secoundShiftTiming}
                />
                <BarChartCopy
                  height={"24vh"}
                  targetList={targetList}
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
        </Grid>

        <Grid item xs={4} md={2}>
          <MetricsCard data={cardData} />
        </Grid>
        <Grid item xs={6} md={12} className="timeChart">
          <Grid container spacing={4}>
            <Grid item xs={6} md={10}>
              <DownTimeAction data={secoundDowntimeDetails} />
            </Grid>
            <Grid
              item
              xs={4}
              md={2}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box onClick={() => setShowMenu(!showMenu)}>
                {visibleQRCodeIndex === null ? (
                  <Box>
                    {showMenu ? (
                      <img
                        style={{ width: "40%" }}
                        alt="emoj"
                        src={isHappy ? smileEmoji : sadEmoji}
                      />
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Button
                          sx={{
                            background: "#483456",
                            marginRight: "1em",
                            "&:hover": {
                              background: "#483456",
                            },
                          }}
                          onClick={() => setIsShift(true)}
                        >
                          Shift
                        </Button>
                        <Button
                          sx={{
                            background: "#483456",
                            "&:hover": {
                              background: "#483456",
                            },
                          }}
                          onClick={() => setIsShift(false)}
                        >
                          Crt Hrs
                        </Button>
                      </Box>
                    )}
                  </Box>
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
              </Box>
            </Grid>
          </Grid>{" "}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FullShiftOverall;
