import React, { useContext, useEffect, useState } from "react";
import { Box, Card, Typography, Grid } from "@mui/material";
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
import ShiftContext from "../Context/shiftContext";

const FullShiftOverall = ({
  yesterdayDate,
  secoundResponse,
  firstResponse,
  categories,
  lastBarValue,
  handleSlidechange,
  visibleQRCodeIndex,
  setVisibleQRCodeIndex,
  todayDate,
  secoundShiftTiming,
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
  const { ShowShiftDate, shiftHours, targetList } = useContext(ShiftContext);

  const [isHappy, setIsHappy] = useState();
  const [isShift, setIsShift] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    CommonAPIService.getEmojiStatus(
      isShift,
      lastBarValue.totalCount,
      setIsHappy
    );
  }, [isShift, lastBarValue.totalCount]);

  useEffect(() => {
    ShowShiftDate === "Yesterday" && setIsShift(true);
  }, [ShowShiftDate]);

  const handleSlidechanges = (index) => {
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
                  time={"09:00 AM - 05:30 PM"}
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
                  time={"09:00 PM - 05:30 AM"}
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
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "90%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "24px",
                            background: "#d3cccc4f",
                            boxShadow:
                              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                          }}
                        >
                          <span
                            onClick={(e) => {
                              setIsShift(() => true);
                            }}
                            style={{
                              cursor: "pointer",
                              display: "flex",
                              fontFamily:
                                '"Roboto", "Helvetica", "Arial", sans-serif',
                              alignItems: "center",
                              // borderColor: "divider",
                              justifyContent: "center",
                              padding: 8,
                              // bgcolor: "#5a0497e8",
                              // color: "text.secondary",
                              color: isShift
                                ? "#eeaa0a"
                                : theme.palette.mode === "dark"
                                ? "white"
                                : "#c9c7c7",
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
                                cursor: "pointer",
                                display: "flex",
                                fontFamily:
                                  '"Roboto", "Helvetica", "Arial", sans-serif',
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "0px 40px 40px 0px",
                                padding: 8,
                                color: !isShift
                                  ? "#eeaa0a"
                                  : theme.palette.mode === "dark"
                                  ? "white"
                                  : "#c9c7c7",
                              }}
                            >
                              Current Hrs
                            </span>
                          )}
                        </Box>
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
