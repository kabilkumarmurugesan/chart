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
import { CommonAPIService } from "../../utilities/CommonAPI";
import ArrowNavigation from "../Card/ArrowNavigation";

const SingleShift = ({
  formatDate,
  categories,
  secoundResponse,
  ShiftCardDetailList,
  shiftHours,
  ShowShiftDate,
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
  currentSlide,
  targetOne,
}) => {
  const [isHappy, setIsHappy] = useState();
  const [isShift, setIsShift] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

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
              isCurrentShift={currentShift === "shiftA"}
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
                targetOne={targetOne}
                ShowShiftDate={ShowShiftDate}
                lastBarValue={lastBarValue}
                response={firstResponse}
                currentShift={currentShift}
                isCurrentShift={currentShift === "shiftA"}
              />
            ) : (
              <BarChartCopy
                targetList={targetList}
                setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                visibleQRCodeIndex={visibleQRCodeIndex}
                handleSlidechange={handleSlidechange}
                shiftHours={shiftHours}
                ShowShiftDate={ShowShiftDate}
                targetOne={targetOne}
                lastBarValue={lastBarValue}
                isCurrentShift={currentShift === "shiftB"}
                response={secoundResponse}
                categories={categories}
                currentShift={currentShift}
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
            categories={categories}
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
          <DownTimeAction
            data={
              currentShift === "shiftA"
                ? firstDowntimeDetails
                : secoundDowntimeDetails
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
          <Card style={{ boxShadow: "none" }}>
            {visibleQRCodeIndex === null ? (
              <>
                {!isNaN(currentSlide) && (
                  <ArrowNavigation
                    disabledOne={currentSlide === 0}
                    disabledTwo={currentSlide > 0}
                    handaleEvent={handleSlidechange}
                  />
                )}
                <Typography
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  TARGET & ACTUAL STATUS
                </Typography>
                <Box
                  onMouseOver={() => setShowMenu(true)}
                  onMouseOut={() => setShowMenu(false)}
                >
                  <Box
                    style={{
                      height: "40px",
                    }}
                  >
                    {showMenu && (
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
                        {ShowShiftDate === "Today" && (
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
              <Card>
                <QRCodeCanvas
                  value={
                    "MES~LEMES MM~S0V MT~11T3 MO~L9N023103009 SN~PG03MQD5 INS~ ID~1S11T3S0V900PG03MQD5"
                  }
                  size={150}
                />
              </Card>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleShift;
