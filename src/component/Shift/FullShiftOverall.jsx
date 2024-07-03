import React, { useEffect, useState } from "react";
import { Box, Button, Card, Typography, Grid } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import smileEmoji from "../../asset/gif/emoj.png";
import sadEmoji from "../../asset/gif/SadEmoji.png";
import BarChartCopy from "../charts/BarChartCopy";
import ShiftHeader from "./ShiftHeader";
import DownTimeAction from "../Table/DownTimeAction";
import MetricsCard from "../Card/MetricsCard";
import { CommonAPIService } from "../../utilities/CommonAPI";
import ArrowNavigation from "../Card/ArrowNavigation";
import { useTheme } from "@emotion/react";
import Divider from "@mui/material/Divider";

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
  currentShift,
  disabledOne,
  disabledTwo,
  handaleEvent,
  targetOne,
  handleButtonClick,
  secoundCardData,
  firstCardData,
}) => {
  const [isHappy, setIsHappy] = useState();
  const [isShift, setIsShift] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    CommonAPIService.getEmojiStatus(
      isShift,
      lastBarValue.totalCount,
      setIsHappy
    );
  }, [isShift]);
  useEffect(() => {
    setIsShift(ShowShiftDate !== "Yesterday");
  }, [ShowShiftDate]);

  const handleSlidechanges = (index) => {
    // handleSlidechange("Full");
    handleButtonClick(index, "Full");
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
                  isCurrentShift={currentShift === "shiftA"}
                  cardData={firstCardData}
                />
                <BarChartCopy
                  height={"25vh"}
                  targetOne={targetOne}
                  lastBarValue={currentShift === "shiftA" && lastBarValue}
                  setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                  handleSlidechange={handleSlidechanges}
                  visibleQRCodeIndex={visibleQRCodeIndex}
                  categories={categories}
                  response={firstResponse}
                  targetList={targetList}
                  handleButtonClick={handleSlidechanges}
                  currentShift={currentShift}
                  isCurrentShift={currentShift === "shiftA"}
                />
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sx={{ height: "34vh", marginTop: "16px" }}
            >
              <Card sx={{ minWidth: 275 }}>
                <ShiftHeader
                  date={
                    ShowShiftDate === "Yesterday" ? yesterdayDate : todayDate
                  }
                  time={secoundShiftTiming}
                  cardData={secoundCardData}
                  isCurrentShift={currentShift === "shiftB"}
                />
                <BarChartCopy
                  height={"24vh"}
                  currentShift={currentShift}
                  targetList={targetList}
                  targetOne={targetOne}
                  setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                  handleSlidechange={handleSlidechanges}
                  lastBarValue={currentShift === "shiftB" && lastBarValue}
                  animations={false}
                  response={secoundResponse}
                  categories={categories}
                  visibleQRCodeIndex={visibleQRCodeIndex}
                  shiftHours={shiftHours}
                  handleButtonClick={handleSlidechanges}
                  isCurrentShift={currentShift === "shiftB"}
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} md={2}>
          <MetricsCard data={cardData} />
          <ArrowNavigation
            disabledOne={disabledOne}
            disabledTwo={disabledTwo}
            handaleEvent={handaleEvent}
          />
        </Grid>{" "}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6} md={10}>
          <DownTimeAction
            data={
              currentShift === "shiftB"
                ? secoundDowntimeDetails
                : firstDowntimeDetails
            }
          />
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
          {" "}
          <Card
            style={{ boxShadow: "none" }}
            onClick={() => setShowMenu(!showMenu)}
          >
            {visibleQRCodeIndex === null ? (
              <>
                <Typography
                  style={{
                    fontSize: "18px",
                  }}
                >
                  TARGET - ACTUAL STATUS
                </Typography>
                <Box
                  onMouseOver={() => setShowMenu(true)}
                  onMouseOut={() => setShowMenu(false)}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "35px",
                    }}
                  >
                    {showMenu && (
                      <Box
                        sx={{
                          cursor: "pointer",
                          display: "flex",
                          fontFamily:
                            '"Roboto", "Helvetica", "Arial", sans-serif',
                          alignItems: "center",
                          border: "1px solid",
                          borderColor: "divider",
                          justifyContent: "center",
                          borderRadius: 2,
                          bgcolor: "#5a0497e8",
                          color: "text.secondary",
                          "& span": {
                            m: 0.8,
                          },
                        }}
                      >
                        {" "}
                        <span
                          onClick={(e) => {
                            setIsShift(() => true);
                          }}
                          style={{
                            color: isShift
                              ? "#eeaa0a"
                              : theme.palette.mode === "dark"
                              ? "white"
                              : "#ddd",
                          }}
                        >
                          Shift hrs
                        </span>
                        <Divider
                          orientation="vertical"
                          color="#fff"
                          variant="middle"
                          flexItem
                        />
                        {ShowShiftDate === "Today" && (
                          <span
                            onClick={(e) => {
                              setIsShift(false);
                            }}
                            style={{
                              color: !isShift
                                ? "#eeaa0a"
                                : theme.palette.mode === "dark"
                                ? "white"
                                : "#ddd",
                            }}
                          >
                            Current Hrs
                          </span>
                        )}
                      </Box>
                    )}
                  </Box>
                  <img
                    style={{ width: "40%" }}
                    alt="emoj"
                    src={isHappy ? smileEmoji : sadEmoji}
                  />
                </Box>
              </>
            ) : (
              <QRCodeCanvas
                value={
                  "MES~LEMES MM~S0V MT~11T3 MO~L9N023103009 SN~PG03MQD5 INS~ ID~1S11T3S0V900PG03MQD5"
                }
                size={150}
              />
            )}
          </Card>
        </Grid>
      </Grid>{" "}
    </Box>
  );
};

export default FullShiftOverall;
