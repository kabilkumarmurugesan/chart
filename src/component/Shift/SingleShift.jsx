import React, { useEffect, useState } from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import BasicTable from "../Table/Table";
import DownTimeAction from "../Card/DownTimeAction";
import BarChartCopy from "../charts/BarChartCopy";
import ShiftCardDetails from "../Card/ShiftCardDetails";
import ShiftHeader from "./ShiftHeader";
import { QRCodeCanvas } from "qrcode.react";
import smileEmoji from "../../asset/gif/emoj.png";
import sadEmoji from "../../asset/gif/SadEmoji.png";
import BarChart from "../charts/BarChart";

const SingleShift = ({
  formatDate,
  categories,
  secoundResponse,
  ShiftCardDetailList,
  shiftHours,
  ShowShiftDate,
  isDownTime,
  secoundShiftTiming,
  handleSlidechage,
  firstResponse,
  lastBarValue,
  firstShiftTiming,
  visibleQRCodeIndex,
  setVisibleQRCodeIndex,
  downTimeAction,
}) => {
  const [isHappy, setIsHappy] = useState();
  const [isShift, setIsShift] = useState(true);
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    getEmojiStatus();
  }, [isShift]);

  const getEmojiStatus = async () => {
    let dataCount = lastBarValue.totalCount;
    try {
      const response = await fetch(
        `http://localhost:8001/api/v1/general/getEmoji?isShift=${isShift}&dataCount=${dataCount}`
      );
      const result = await response.json();
      setIsHappy(result.data.isHappy);
    } catch (error) {
      console.error(`Download error: ${error.message}`);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={6} md={10}>
          <Card sx={{ minWidth: 275 , height: 500}}>
            <ShiftHeader
              date={formatDate(new Date())}
              time={firstResponse ?  firstShiftTiming : secoundShiftTiming}
            />
            {firstResponse ? (
              <BarChart
                height={"40vh"}
                animations={{
                  tension: {
                    duration: 1000,
                    easing: "linear",
                    from: 1,
                    to: 0,
                  },
                }}
                setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                handleSlidechage={handleSlidechage}
                visibleQRCodeIndex={visibleQRCodeIndex}
                categories={categories}
                response={firstResponse}
              />
            ) : (
              <BarChartCopy
                setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                visibleQRCodeIndex={visibleQRCodeIndex}
                handleSlidechage={handleSlidechage}
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
                        {" "}
                        800
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
                    // height: "80px", // Set a fixed height or a percentage value
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
                        {" "}
                        650
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
                    // height: "80/px", // Match this height to the other Boxes
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
                        {" "}
                        125
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
                    // height: "25px", // Match this height to the other Boxes
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
                        145
                      </b>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={6} md={10}>
          {secoundResponse !== undefined && (
            <BasicTable response={secoundResponse.updatedData} />
          )}
            {firstResponse !== undefined && (
            <BasicTable response={firstResponse} />
          )}          
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
          <DownTimeAction data={downTimeAction} />
        </Grid>
        <Grid item xs={4} md={2}>
          <Box>
            {visibleQRCodeIndex === null ? (
              <Box
                onMouseEnter={() => setShowMenu(false)}
                onMouseLeave={() => setShowMenu(true)}
              >
                <img
                  style={{ width: "40%" }}
                  alt="emoj"
                  src={isHappy ? smileEmoji : sadEmoji}
                />
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
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <Button
                style={{ background: "#483456", marginRight: "1em" }}
                onClick={() => setIsShift(true)}
              >
                Shift
              </Button>
              <Button
                style={{ background: "#483456" }}
                onClick={() => setIsShift(false)}
              >
                Crt Hrs
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleShift;
