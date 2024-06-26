import React, { useEffect, useState } from "react";
import { Box, useTheme, IconButton } from "@mui/material";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import FullShift from "../Shift/FullShift";
import SingleShift from "../Shift/SingleShift";
import { socket } from "../socket";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FullShiftOverall from "../Shift/FullShiftOverall";

const ShiftCardDetailList = [
  { title: "MFG ORDER", value: 155 },
  { title: "MTM", value: 135 },
  { title: "MONTH TARGET", value: 11200 },
  { title: "MONTH ACTUAL", value: 8150 },
];

const AppContainer = ({
  ShowShift,
  ShowShiftDate,
  refreshRate,
  shiftHours,
  isDownTime,
  refreshStatus,
  targetList,
}) => {
  const theme = useTheme();
  const { primary } = theme.palette;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lastBarValue, setLastBarValue] = useState({}); // Initial value for the last bar of PRODUCT A
  const [firstResponse, setFirstResponse] = useState();
  const [firstShiftTiming, setFirstShiftTiming] = useState(
    "09:00 PM - 05:30 AM"
  );
  const [secoundShiftTiming, setSecoundShiftTiming] = useState(
    "09:00 AM - 05:30 PM"
  );
  const [secoundResponse, setSecoundResponse] = useState();
  let Dates = new Date(new Date().setDate(new Date().getDate() - 1));
  const yesterdayDate = Dates.toLocaleDateString("en-US"); // MM/DD/YYYY in US English
  const [shiftType, setShiftType] = useState("1st");
  const [visibleQRCodeIndex, setVisibleQRCodeIndex] = useState(null);
  const [downTimeAction, setDownTimeAction] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [firstCardData, setFirstCardData] = useState([]);
  const [secoundCardData, setSecoundCardData] = useState([]);
  const [categories, setCategories] = useState(
    shiftHours
      ? [
          "09 - 10",
          "10 - 11",
          "11 - 12",
          "12 - 01",
          "01 - 02",
          "02 - 03",
          "03 - 04",
          "04 - 05",
          "05 - 06",
        ]
      : ["09 - 10", "10 - 11", "11 - 12", "12 - 01", "01 - 02", "02 - 03"]
  );
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    getDownTimeData();
  }, []);

  useEffect(() => {
    let intervalshiftHours = 0;
    let interval = 0;
    if (refreshStatus) {
      if (shiftHours) {
        clearInterval(interval);
        intervalshiftHours = setInterval(() => {
          setShiftType((prevType) => (prevType === "1st" ? "2nd" : "1st"));
          console.log(shiftType);
        }, refreshRate / 2);
        interval = setInterval(() => {
          handleSlidechange();
        }, refreshRate);
      } else {
        interval = setInterval(() => {
          handleSlidechange();
        }, refreshRate);
      }
    } else {
      clearInterval(interval);
      clearInterval(intervalshiftHours);
    }
    return () => {
      clearInterval(interval);
      clearInterval(intervalshiftHours);
    };
  }, [refreshRate, refreshStatus, shiftHours]);

  useEffect(() => {
    // if (shiftHours) {
    //   setShiftType("1st");
    // }
    let date = "";
    let categoriesList = [];
    if (currentSlide === 0 && ShowShift === "Day") {
      categoriesList = [
        "09 - 10",
        "10 - 11",
        "11 - 12",
        "12 - 01",
        "01 - 02",
        "02 - 03",
      ];

      if (shiftHours) {
        if (shiftType === "1st") {
          categoriesList = [
            "09 - 10",
            "10 - 11",
            "11 - 12",
            "12 - 01",
            "01 - 02",
            "02 - 03",
          ];
        } else {
          categoriesList = [
            "03 - 04",
            "04 - 05",
            "05 - 06",
            "06 - 07",
            "07 - 08",
            "08 - 09",
          ];
        }
      } else {
        categoriesList = [
          "09 - 10",
          "10 - 11",
          "11 - 12",
          "12 - 01",
          "01 - 02",
          "02 - 03",
          "03 - 04",
          "04 - 05",
          "05 - 06",
        ];
      }
    } else {
      categoriesList = [
        "09 - 10",
        "10 - 11",
        "11 - 12",
        "12 - 01",
        "01 - 02",
        "02 - 03",
        "03 - 04",
        "04 - 05",
        "05 - 06",
        "06 - 07",
        "07 - 08",
        "08 - 09",
      ];

      if (!shiftHours) {
        categoriesList = [
          "09 - 10",
          "10 - 11",
          "11 - 12",
          "12 - 01",
          "01 - 02",
          "02 - 03",
          "03 - 04",
          "04 - 05",
          "05 - 06",
        ];
      }
    }
    setCategories(() => {
      return categoriesList;
    });
    if (ShowShiftDate === "Today") {
      getFirstData("L1");
      getSecoundData("L1", categoriesList);
      date = formatDate(new Date());
    } else {
      date = yesterdayDate;
    }
    setTodayDate(date);
  }, [
    shiftHours,
    currentSlide,
    targetList,
    ShowShift,
    ShowShiftDate,
    shiftType,
  ]);

  useEffect(() => {
    socket.on("dataUpdate", (data) => {
      ShowShiftDate === "Today"
        ? setLastBarValue(() => data)
        : setLastBarValue({});
    });
    ShowShiftDate !== "Today" && getPreviousData("L1");
  }, [ShowShiftDate,shiftType, currentSlide, targetList, ShowShift, shiftHours]);

  useEffect(() => {
    if (ShowShiftDate === "Today") {
      let TARGET = firstCardData.shiftTarget + secoundCardData.shiftTarget;
      const overallData = [
        {
          label: "OVERALL TARGET",
          value: TARGET,
          background: "#241773",
        },
        {
          label: "OVERALL ACTUAL",
          value: firstCardData.shiftActual + secoundCardData.shiftActual,
          background: "#3d860b",
        },
        {
          label: "OVERALL UPH",
          value: Math.round(
            firstCardData.shiftUPH + secoundCardData.shiftUPH / 2
          ),
          background: "#483456",
        },
        {
          label: "DOWN TIME",
          value: firstCardData.shiftdownTime,
          background: "#e1140a",
        },
      ];

      setCardData(overallData);
    }
  }, [firstCardData, ShowShiftDate, secoundCardData]);

  const formatDate = (date) => {
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const getFirstData = async (line) => {
    let temp =
      currentSlide === 0 && ShowShift === "Day"
        ? !shiftHours
          ? `&duration=9hrs&shift=1st`
          : `&duration=6hrs&shift=${shiftType}`
        : shiftHours
        ? `&duration=12hrs&shift=1st`
        : `&duration=9hrs&shift=${shiftType}`;
    try {
      const response = await fetch(
        `http://localhost:8001/api/v1/general/previousshiftdata?line=${line}&target=${targetList}${temp}`
      );
      const result = await response.json();
      setFirstCardData(result.data);
      setFirstShiftTiming(result.data.shiftTime);
      setFirstResponse(result.data.data);
    } catch (error) {
      console.error(`Download error: ${error.message}`);
    }
  };

  const getSecoundData = async (line, categoriesList) => {
    let temp =
      currentSlide === 0 && ShowShift === "Day"
        ? !shiftHours
          ? `&duration=9hrs&shift=1st`
          : `&duration=6hrs&shift=${shiftType}`
        : shiftHours
        ? `&duration=12hrs&shift=1st`
        : `&duration=9hrs&shift=${shiftType}`;
    try {
      const response = await fetch(
        `http://localhost:8001/api/v1/general/shift2?line=${line}&target=${targetList}${temp}`
      );
      const result = await response.json();
      let dome = [];
      let updatedData = result.data.updatedData;
      categoriesList.map((item, i) => {
        dome.push({
          id: updatedData[i] === undefined ? "-" : updatedData[i].id,
          x: updatedData[i] === undefined ? "-" : updatedData[i].x,
          y: updatedData[i] === undefined ? "-" : updatedData[i].y,
          z: updatedData[i] === undefined ? "-" : updatedData[i].z,
          product_id:
            updatedData[i] === undefined ? "-" : updatedData[i].product_id,
          target: updatedData[i] === undefined ? "-" : updatedData[i].target,
          comments:
            updatedData[i] === undefined ? "-" : updatedData[i].comments,
          op_date: updatedData[i] === undefined ? "-" : updatedData[i].op_date,
          line: updatedData[i] === undefined ? "-" : updatedData[i].line,
        });
      });
      let temps = {
        updatedData: dome,
      };
      setSecoundCardData(result.data);
      setSecoundShiftTiming(result.data.shiftTiming);
      setSecoundResponse(temps);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSlidechange = (type) => {
    type === "Full"
      ? setCurrentSlide((prevSlide) => 1)
      : setCurrentSlide((prevSlide) => (prevSlide + 1) % 2);
  };

  const getPreviousData = async (line) => {
    let temps =
      currentSlide === 0 && ShowShift === "Day"
        ? !shiftHours
          ? `&duration=9hrs&shift=1st`
          : `&duration=6hrs&shift=${shiftType}`
        : shiftHours
        ? `&duration=12hrs&shift=1st`
        : `&duration=9hrs&shift=${shiftType}`;
    try {
      const response = await fetch(
        `http://localhost:8001/api/v1/general/displayprevioustwoshiftsdata?line=${line}${temps}&target=${targetList}`
      );
      const result = await response.json();
      setFirstResponse(result.data.shiftA);
      let temp = {
        updatedData: result.data.shiftB,
      };
      const overallData = [
        {
          label: "OVERALL TARGET",
          value: result.data.overAllDetails.overAllTarget,
          background: "#241773",
        },
        {
          label: "OVERALL ACTUAL",
          value: result.data.overAllDetails.overAllActual,
          background: "#3d860b",
        },
        {
          label: "OVERALL UPH",
          value: result.data.overAllDetails.overAllUPH,
          background: "#483456",
        },
        {
          label: "DOWN TIME",
          value: result.data.overAllDetails.overAlldownTime,
          background: "#e1140a",
        },
      ];
      setCardData(overallData);
      setFirstCardData(result.data.shiftADetails);
      setSecoundCardData(result.data.shiftBDetails);
      setSecoundShiftTiming(result.data.shiftBTiming);
      setFirstShiftTiming(result.data.shiftATiming);
      setSecoundResponse(temp);
    } catch (error) {
      console.error(error.message);
    }
  };

  const [todayDate, setTodayDate] = useState(formatDate(new Date()));

  const getDownTimeData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8001/api/v1/general/getDownTime?isShift=${isDownTime}&record=true`
      );
      const result = await response.json();
      setDownTimeAction(result.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      {ShowShift === "Day" ? (
        <SwitchTransition>
          <CSSTransition
            key={currentSlide}
            timeout={600}
            classNames="zoom-fade"
            unmountOnExit
          >
            <Box
              className="zoom-fade-container"
              sx={{
                background: primary.main,
                fontWeight: "bold",
                height: "94vh",
              }}
            >
              {currentSlide === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  // onMouseEnter={() => setShowMenu(false)}
                  // onMouseLeave={() => setShowMenu(true)}
                >
                  {/* <Box
                    sx={{
                      display: showMenu ? "none" : "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      position: "absolute",
                      top: "50%",
                      right: "0%",
                    }}
                  >
                    <IconButton
                      sx={{ background: "#fff" }}
                      disabled
                      onClick={handleSlidechange}
                    >
                      <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton
                      sx={{ background: "#fff" }}
                      onClick={handleSlidechange}
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </Box> */}
                  <Box style={{ flex: "4" }}>
                    <FullShift
                      handleSlidechange={handleSlidechange}
                      firstResponse={firstResponse}
                      visibleQRCodeIndex={visibleQRCodeIndex}
                      setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                      secoundResponse={secoundResponse}
                      secoundShiftTiming={secoundShiftTiming}
                      firstShiftTiming={firstShiftTiming}
                      categories={categories}
                      targetList={targetList}
                      yesterdayDate={yesterdayDate}
                      todayDate={todayDate}
                      lastBarValue={lastBarValue}
                      shiftHours={shiftHours}
                      downTimeAction={downTimeAction}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: showMenu ? "none" : "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      position: "absolute",
                      top: "74%",
                      right: "1%",
                    }}
                  >
                    <IconButton
                      disabled
                      onClick={() => {
                        if (shiftHours) {
                          if (shiftType === "2nd" && currentSlide === 0) {
                            handleSlidechange();
                          } else {
                            setShiftType("2nd");
                          }
                        } else {
                          handleSlidechange();
                        }
                      }}
                    >
                      <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        if (shiftHours) {
                          if (shiftType === "2nd" && currentSlide === 0) {
                            handleSlidechange();
                          } else {
                            setShiftType("2nd");
                          }
                        } else {
                          handleSlidechange();
                        }
                      }}
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                  // onMouseEnter={() => setShowMenu(false)}
                  // onMouseLeave={() => setShowMenu(true)}
                >
                  <Box
                    sx={{
                      display: showMenu ? "none" : "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      position: "absolute",
                      top: "75%",
                      right: "1%",
                    }}
                  >
                    <IconButton
                      sx={{ background: "#fff" }}
                      onClick={() => {
                        handleSlidechange();
                        setShiftType("1st");
                      }}
                    >
                      <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton
                      sx={{ background: "#fff" }}
                      disabled
                      onClick={() => {
                        handleSlidechange();
                        setShiftType("1st");
                      }}
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </Box>
                  <FullShiftOverall
                    targetList={targetList}
                    handleSlidechange={handleSlidechange}
                    firstResponse={firstResponse}
                    visibleQRCodeIndex={visibleQRCodeIndex}
                    setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                    secoundResponse={secoundResponse}
                    categories={categories}
                    yesterdayDate={yesterdayDate}
                    todayDate={todayDate}
                    lastBarValue={lastBarValue}
                    shiftHours={shiftHours}
                    downTimeAction={downTimeAction}
                    cardData={cardData}
                    firstShiftTiming={firstShiftTiming}
                    secoundShiftTiming={secoundShiftTiming}
                  />

                  {/* <Box
                    sx={{
                      display: showMenu ? "none" : "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      position: "absolute",
                      top: "50%",
                      left: "0%",
                    }}
                  >
                    <IconButton
                      sx={{ background: "#fff" }}
                      onClick={handleSlidechange}
                    >
                      <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton
                      sx={{ background: "#fff" }}
                      disabled
                      onClick={handleSlidechange}
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </Box> */}
                </Box>
              )}
            </Box>
          </CSSTransition>
        </SwitchTransition>
      ) : ShowShiftDate !== "Today" && ShowShift !== "All" ? (
        <SwitchTransition>
          <CSSTransition
            key={currentSlide}
            timeout={600}
            classNames="zoom-fade"
            unmountOnExit
          >
            <Box
              className="zoom-fade-container"
              sx={{
                background: primary.main,
                fontWeight: "bold",
                height: currentSlide !== 0 ? "100%" : "93.2vh",
              }}
            >
              {currentSlide === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  // onMouseEnter={() => setShowMenu(false)}
                  // onMouseLeave={() => setShowMenu(true)}
                >
                  <Box
                    sx={{
                      display: showMenu ? "none" : "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      position: "absolute",
                      top: "75%",
                      right: "1%",
                    }}
                  >
                    <IconButton
                      disabled={currentSlide === 0}
                      onClick={handleSlidechange}
                    >
                      <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton
                      disabled={currentSlide > 0}
                      onClick={handleSlidechange}
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </Box>
                  <SingleShift
                    shiftHours={shiftHours}
                    isDownTime={isDownTime}
                    handleSlidechange={handleSlidechange}
                    targetList={targetList}
                    lastBarValue={lastBarValue}
                    ShowShiftDate={ShowShiftDate}
                    visibleQRCodeIndex={visibleQRCodeIndex}
                    setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                    firstResponse={firstResponse}
                    firstShiftTiming={firstShiftTiming}
                    categories={categories}
                    formatDate={formatDate}
                    yesterdayDate={yesterdayDate}
                    todayDate={todayDate}
                    downTimeAction={downTimeAction}
                    cardData={firstCardData}
                    ShiftCardDetailList={ShiftCardDetailList}
                  />

                  {/* <Box
                    sx={{
                      display: showMenu ? "none" : "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                      position: "absolute",
                      top: "50%",
                      left: "0%",
                    }}
                  >
                    <IconButton
                      sx={{ background: "#fff" }}
                      disabled
                      onClick={handleSlidechange}
                    >
                      <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton
                      sx={{ background: "#fff" }}
                      onClick={handleSlidechange}
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </Box> */}
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  // onMouseEnter={() => setShowMenu(false)}
                  // onMouseLeave={() => setShowMenu(true)}
                >
                  <Box
                    sx={{
                      display: showMenu ? "none" : "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      position: "absolute",
                      top: "75%",
                      right: "1%",
                    }}
                  >
                    <IconButton
                      disabled={currentSlide === 0}
                      onClick={handleSlidechange}
                    >
                      <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton
                      disabled={currentSlide > 0}
                      onClick={handleSlidechange}
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </Box>
                  <SingleShift
                    shiftHours={shiftHours}
                    isDownTime={isDownTime}
                    handleSlidechange={handleSlidechange}
                    lastBarValue={lastBarValue}
                    ShowShiftDate={ShowShiftDate}
                    visibleQRCodeIndex={visibleQRCodeIndex}
                    setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                    secoundResponse={secoundResponse}
                    secoundShiftTiming={secoundShiftTiming}
                    categories={categories}
                    cardData={secoundCardData}
                    yesterdayDate={yesterdayDate}
                    todayDate={todayDate}
                    targetList={targetList}
                    formatDate={formatDate}
                    downTimeAction={downTimeAction}
                    ShiftCardDetailList={ShiftCardDetailList}
                  />
                  {/* <Box
                    sx={{
                      display: showMenu ? "none" : "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      position: "absolute",
                      top: "75%",
                      left: "0%",
                    }}
                  >
                    <IconButton
                      sx={{ background: "#fff" }}
                      disabled
                      onClick={handleSlidechange}
                    >
                      <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton
                      sx={{ background: "#fff" }}
                      onClick={handleSlidechange}
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </Box> */}
                </Box>
              )}
            </Box>
          </CSSTransition>
        </SwitchTransition>
      ) : (
        <Box
          className="zoom-fade-container"
          sx={{
            background: primary.main,
            fontWeight: "bold",
            height: currentSlide !== 0 ? "100%" : "93.2vh",
          }}
        >
          <SingleShift
            shiftHours={shiftHours}
            isDownTime={isDownTime}
            secoundShiftTiming={secoundShiftTiming}
            handleSlidechange={handleSlidechange}
            lastBarValue={lastBarValue}
            ShowShiftDate={ShowShiftDate}
            visibleQRCodeIndex={visibleQRCodeIndex}
            targetList={targetList}
            setVisibleQRCodeIndex={setVisibleQRCodeIndex}
            secoundResponse={secoundResponse}
            categories={categories}
            formatDate={formatDate}
            yesterdayDate={yesterdayDate}
            todayDate={todayDate}
            downTimeAction={downTimeAction}
            ShiftCardDetailList={ShiftCardDetailList}
            cardData={secoundCardData}
          />
        </Box>
      )}
    </>
  );
};

export default AppContainer;
