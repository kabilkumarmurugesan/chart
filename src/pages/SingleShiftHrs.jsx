import React, { useContext, useEffect, useState } from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import DownTimeAction from "../component/Table/DownTimeAction";
import ShiftCardDetails from "../component/Card/ShiftCardDetails";
import ShiftHeader from "../component/Shift/ShiftHeader";
import { QRCodeCanvas } from "qrcode.react";
import smileEmoji from "../asset/gif/emoj.png";
import sadEmoji from "../asset/gif/SadEmoji.png";
import { CommonAPIService } from "../utilities/CommonAPI";
import ArrowNavigation from "../component/Card/ArrowNavigation";
import ShiftContext from "../utilities/Context/shiftContext";
import { useTheme } from "@emotion/react";
import Divider from "@mui/material/Divider";
import CommonService from "../utilities/CommonService";
import BasicTable from "../component/Table/Table";
import StackedBarLineChartTwo from "../component/charts/StackedBarLineChartTwo";
import ENV from "../utilities/ENV";

const SingleShiftHrs = ({
  categories,
  secoundResponse,
  ShiftCardDetailList,
  handleSlidechange,
  firstResponse,
  lastBarValue,
  visibleQRCodeIndex,
  todayDate,
  cardData,
  firstDowntimeDetails,
  secoundDowntimeDetails,
  currentShift,
  currentSlide,
  intervals,
}) => {
  const theme = useTheme();
  const { ShowShiftDate } = useContext(ShiftContext);
  const [isHappy, setIsHappy] = useState();
  const [isShift, setIsShift] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [dataSet, setDataSet] = useState({
    labels: ["9 AM"],
    datasets: [
      {
        type: "line",
        label: "Current Chart",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
        data: [10],
        datalabels: {
          display: (con) => {
            if (con.dataIndex < 2) {
              return false;
            } else {
              return con.dataset.data[con.dataIndex] > 0;
            }
          },
          align: "top",
          color: "white",
          backgroundColor: "rgb(77, 90, 129)",
          borderWidth: 1,
          borderRadius: 2,
          padding: 4,
          formatter: (value) => {
            return value;
          },
          font: {
            weight: "bold",
            size: 15,
          },
        },
      },
      {
        type: "bar",
        label: "Shift Chart",
        backgroundColor: "#3D860B",
        data: [10],
        borderColor: "white",
        borderWidth: 1, // Reduced borderWidth to avoid white line
        barThickness: 45,
        datalabels: {
          display: (con) => {
            return con.dataset.data[con.dataIndex] > 0;
          },
          align: "center",
          color: "white",
          borderWidth: 1,
          borderRadius: 2,
          backgroundColor: "rgb(75, 192, 192)",
          padding: 4,
          formatter: (value) => {
            return value;
          },
          font: {
            weight: "bold",
            size: 15,
          },
        },
      },
    ],
  });
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  useEffect(() => {
    getProductData();
  }, [currentHour]);

  useEffect(() => {
    CommonAPIService.getEmojiStatus(
      isShift,
      lastBarValue.totalCount,
      setIsHappy
    );
  }, [isShift, lastBarValue.totalCount]);

  const getProductData = async () => {
    try {
      const response = await ENV.get(`getLastThreeHour?line=L1`);
      const result = response.data.data;
      setCurrentHour(new Date().getHours());
      setDataSet((prevData) => {
        let initialLabel = [];
        const newLineData = [];
        const newBarData = [];
        result.forEach((res) => {
          let time = res.start_time.split(":");
          let temp = `${time[0] % 12 || 12} ${time[0] >= 12 ? "PM" : "AM"}`;
          initialLabel.push(temp);
          newLineData.push(res.totalcount);
          newBarData.push(res.totalcount);
        });

        return {
          labels: [...initialLabel],
          datasets: [
            {
              ...prevData.datasets[0],
              data: newLineData,
            },
            {
              ...prevData.datasets[1],
              data: newBarData,
            },
          ],
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={6} md={10}>
          <Card sx={{ minWidth: 275, height: 500 }}>
            <ShiftHeader
              date={todayDate}
              time={`${currentHour - 2} - ${currentHour}`}
            />
            <StackedBarLineChartTwo
              type={"chart"}
              data={dataSet}
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
                        {CommonService.convertIntoKiloPrefix(
                          cardData?.shiftTarget
                        )}
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
                        {CommonService.convertIntoKiloPrefix(
                          ShowShiftDate === "Yesterday"
                            ? cardData?.shiftActual
                            : lastBarValue?.shiftActual
                        )}
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
                        {CommonService.convertIntoKiloPrefix(
                          cardData?.shiftUPH
                        )}
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
                        {CommonService.convertIntoKiloPrefix(
                          cardData?.shiftdownTime
                        )}
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
