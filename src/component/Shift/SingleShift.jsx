import React, { useEffect, useState } from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import BasicTable from "../Table/Table";
import DownTimeAction from "../Table/DownTimeAction";
import BarChartCopy from "../charts/BarChartCopy";
import ShiftCardDetails from "../Card/ShiftCardDetails";
import ShiftHeader from "./ShiftHeader";
import { QRCodeCanvas } from "qrcode.react";
import smileEmoji from "../../asset/gif/emoj.png";
import sadEmoji from "../../asset/gif/SadEmoji.png";
import BarChart from "../charts/BarChart";
import { CommonAPIService } from "../../utilities/CommonAPI";

const SingleShift = ({
  formatDate,
  categories,
  secoundResponse,
  ShiftCardDetailList,
  shiftHours,
  ShowShiftDate,
  isDownTime,
  secoundShiftTiming,
  handleSlidechange,
  firstResponse,
  lastBarValue,
  firstShiftTiming,
  visibleQRCodeIndex,
  setVisibleQRCodeIndex,
  targetList,
  yesterdayDate,
  todayDate,
  cardData,
  firstDowntimeDetails,
  secoundDowntimeDetails,
  currentShift,
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

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={6} md={10}>
          <Card sx={{ minWidth: 275, height: 500 }}>
            <ShiftHeader
              date={ShowShiftDate === "Yesterday" ? yesterdayDate : todayDate}
              time={
                ShowShiftDate === "Today"
                  ? currentShift === "shiftA"
                    ? firstShiftTiming
                    : secoundShiftTiming
                  : firstResponse
                  ? firstShiftTiming
                  : secoundShiftTiming
              }
            />
            {firstResponse ? (
              <BarChartCopy
                height={"40vh"}
                animations={{
                  tension: {
                    duration: 1000,
                    easing: "linear",
                    from: 1,
                    to: 0,
                  },
                }}
                targetList={targetList}
                setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                handleSlidechange={handleSlidechange}
                visibleQRCodeIndex={visibleQRCodeIndex}
                categories={categories}
                shiftHours={shiftHours}
                ShowShiftDate={ShowShiftDate}
                lastBarValue={lastBarValue}
                response={firstResponse}
              />
            ) : (
              <BarChartCopy
                targetList={targetList}
                setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                visibleQRCodeIndex={visibleQRCodeIndex}
                handleSlidechange={handleSlidechange}
                shiftHours={shiftHours}
                ShowShiftDate={ShowShiftDate}
                lastBarValue={lastBarValue}
                response={secoundResponse}
                categories={categories}
                id={"single"}
                animations={{
                  tension: {
                    duration: 1000,
                    easing: "linear",
                    from: 1,
                    to: 0,
                  },
                }}
              />
            )}
          </Card>
        </Grid>
        <Grid item xs={4} md={2}>
          <Card>
            <Box className="grid-container">
              <Box
                className="grid-item"
                style={{
                  background: "#241773",
                  color: "#fff",
                  borderBottom: "2px solid #fff",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // height: "100px", // Match this height to the other Boxes
                  }}
                >
                  <Box>
                    <Typography
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      SHIFT TARGET <br />
                      <b
                        style={{
                          fontSize: "30px",
                        }}
                      >
                        {cardData.shiftTarget}
                      </b>
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                className="grid-item"
                style={{
                  borderBottom: "2px solid #fff",
                  background: "#3d860b",
                  color: "#fff",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      SHIFT ACTUAL<br></br>
                      <b
                        style={{
                          fontSize: "30px",
                        }}
                      >
                        {cardData.shiftActual}
                      </b>
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                className="grid-item"
                style={{
                  background: "#483456",
                  borderBottom: "2px solid #fff",
                  color: "#fff",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      SHIFT UPH
                      <br />
                      <b
                        style={{
                          fontSize: "30px",
                        }}
                      >
                        {cardData.shiftUPH}
                      </b>
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                className="grid-item"
                style={{
                  background: "#e1140a",
                  color: "#fff",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      DOWN TIME <br />
                      <b
                        style={{
                          fontSize: "30px",
                        }}
                      >
                        {cardData.shiftdownTime}
                      </b>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={6} md={10}>
          <BasicTable
            response={
              ShowShiftDate === "Today"
                ? currentShift === "shiftA"
                  ? firstResponse
                  : secoundResponse
                : firstResponse
                ? firstResponse
                : secoundResponse
            }
          />
        </Grid>{" "}
        <Grid item xs={4} md={2}>
          <Card>
            <Grid container spacing={1}>
              {ShiftCardDetailList.map((item, index) => (
                <Grid item xs={6} md={12} key={index}>
                  <ShiftCardDetails {...item} index={index} />
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={6} md={10}>
          <DownTimeAction data={currentShift === "shiftA"?firstDowntimeDetails:secoundDowntimeDetails} />
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
          <Box>
            {visibleQRCodeIndex === null ? (
              <Box onClick={() => setShowMenu(!showMenu)}>
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
      </Grid>
    </Box>
  );
};

export default SingleShift;
