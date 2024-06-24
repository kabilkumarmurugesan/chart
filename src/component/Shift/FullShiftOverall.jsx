import React, { useEffect, useState } from "react";
import { Box, Button, Card, Grid } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import smileEmoji from "../../asset/gif/emoj.png";
import sadEmoji from "../../asset/gif/SadEmoji.png";
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
  handleSlidechange,
  visibleQRCodeIndex,
  setVisibleQRCodeIndex,
  todayDate,
  downTimeAction,
  targetList,
  cardData,
}) => {
  const [isHappy, setIsHappy] = useState();
  const [isShift, setIsShift] = useState(true);
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    getEmojiStatus();
  }, [isShift]);

  const handleSlidechanges = () => {
    handleSlidechange("Full");
  };

  const getEmojiStatus = async () => {
    let dataCount = lastBarValue.totalCount;
    try {
      const response = await fetch(
        `http://localhost:8001/api/v1/general/getEmoji?isShift=${isShift}&dataCount=${dataCount}`,
      );
      const result = await response.json();
      setIsHappy(result.data.isHappy);
    } catch (error) {
      console.error(`Download error: ${error.message}`);
    }
  };

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
                <ShiftHeader date={todayDate} time={"09:00 AM - 05:30 PM"} />
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
              <DownTimeAction data={downTimeAction} />
            </Grid>
            <Grid
              item
              xs={4}
              md={2}
              onMouseEnter={() => setShowMenu(false)}
              onMouseLeave={() => setShowMenu(true)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box>
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
