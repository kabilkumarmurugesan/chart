import React, { useContext, useEffect, useState } from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import DownTimeAction from "../component/Table/DownTimeAction";
import ShiftCardDetails from "../component/Card/ShiftCardDetails";
import ShiftHeader from "../component/Shift/ShiftHeader";
import { QRCodeCanvas } from "qrcode.react";
import smileEmoji from "../asset/gif/emoj.png";
import sadEmoji from "../asset/gif/SadEmoji.png";
import ArrowNavigation from "../component/Card/ArrowNavigation";
import ShiftContext from "../utilities/Context/shiftContext";
import { useTheme } from "@emotion/react";
import Divider from "@mui/material/Divider";
import CommonService from "../utilities/CommonService";
import BasicTable from "../component/Table/Table";
import StackedBarLineChart from "../component/charts/StackedBarLineChart";
import RadioBtn from "../component/RadioBtn";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmojiStatus } from "../api/EmojiStatus";
import { fetchLastThreeHrsAvgHrs } from "../api/Socket";

const SingleShiftHrs = ({
  categories,
  ShiftCardDetailList,
  handleSlidechange,
  response,
  hrsResponse,
  visibleQRCodeIndex,
  todayDate,
  cardData,
  firstDowntimeDetails,
  secoundDowntimeDetails,
  currentShift,
  currentSlide,
  handleInterval,
  intervals,
  currentHour,
}) => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const { ShowShiftDate } = useContext(ShiftContext);
  const liveData = useSelector((state) => state.lastTwoHrsData);
  const isHappy = useSelector((state) => state.emojiStatus);
  const [isShift, setIsShift] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(fetchLastThreeHrsAvgHrs());
  }, []);

  useEffect(() => {
    let count = liveData.actual;
    dispatch(fetchEmojiStatus({ isShift, count }));
  }, [isShift, liveData.actual]);

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={6} md={10}>
          <Card sx={{ minWidth: 275, height: 500 }}>
            <ShiftHeader
              date={todayDate}
              time={`${CommonService.timeFromater12(
                currentHour - 2
              )} - ${CommonService.timeFromater12(currentHour)}`}
              component={<RadioBtn handleEvent={handleInterval} />}
            />
            <StackedBarLineChart
              type={"chart"}
              time={`${CommonService.timeFromater12(
                currentHour - 2
              )} - ${CommonService.timeFromater12(currentHour)}`}
              data={response}
              intervals={intervals}
              line={"L1"}
            />
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
                        {liveData?.target}
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
                        {liveData?.actual}
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
                        {liveData?.shiftUph}
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
                        {cardData?.shiftdownTime}
                      </b>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={6} md={10}>
          <BasicTable categories={categories} response={hrsResponse} />
        </Grid>{" "}
        <Grid item xs={4} md={2}>
          <Card>
            <Grid container spacing={1}>
              {ShiftCardDetailList?.map((item, index) => (
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
                    color: "#4d5a81",
                  }}
                >
                  TARGET - ACTUAL STATUS
                </Typography>
                <Box
                  onMouseOver={() => setShowMenu(true)}
                  onMouseOut={() => setShowMenu(false)}
                >
                  <Box
                    style={{
                      height: ShowShiftDate === "Today" ? "40px" : "5px",
                    }}
                  >
                    {showMenu && ShowShiftDate === "Today" && (
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
                            borderRadius: "6px",
                            // background: "#d3cccc4f",
                            boxShadow:
                              "rgba(0, 0, 0, 0.2) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px 0px,rgba(0, 0, 0, 0.1) 0px 1px 2px 0px,rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
                          }}
                        >
                          <span
                            onClick={(e) => {
                              setIsShift(true);
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
                            Shift Hrs
                          </span>
                          <Divider
                            orientation="vertical"
                            color="#fff"
                            variant="middle"
                            flexItem
                          />
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

export default SingleShiftHrs;
