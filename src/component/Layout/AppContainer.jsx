import React, { useEffect, useState } from "react";
import { Box, useTheme, IconButton } from "@mui/material";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import FullShift from "../Shift/FullShift";
import SingleShift from "../Shift/SingleShift";
import { socket } from "../socket";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FullShiftOverall from "../Shift/FullShiftOverall";
import ENV from "../../utilities/ENV";

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
  const [cardData, setCardData] = useState([]);
  const [firstCardData, setFirstCardData] = useState([]);
  const [secoundCardData, setSecoundCardData] = useState([]);
  const [firstDowntimeDetails, setFirstDowntimeDetails] = useState([]);
  const [secoundDowntimeDetails, setSecoundDowntimeDetails] = useState([]);
  const [currentShift, setCurrentShift] = useState("shiftA");
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

  useEffect(() => {
    let intervalshiftHours = 0;
    let interval = 0;
    if (refreshStatus) {
      if (shiftHours) {
        clearInterval(interval);
        intervalshiftHours = setInterval(() => {
          setShiftType((prevType) => (prevType === "1st" ? "2nd" : "1st"));
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
    const dates = new Date();

    if (ShowShiftDate === "Today" && targetList) {
      date = formatDate(new Date());
      const formattedDate = `${dates.getFullYear()}-${
        dates.getMonth() + 1
      }-${dates.getDate()}`;
      getProductData("L1", categoriesList, formattedDate);
    } else {
      date = yesterdayDate;
      const formattedDate = `${dates.getFullYear()}-${dates.getMonth() + 1}-${
        dates.getDate() - 1
      }`;
      getProductData("L1", categoriesList, formattedDate);
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

  const formatDates = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  useEffect(() => {
    socket.on("dataUpdate", (data) => {
      ShowShiftDate === "Today"
        ? setLastBarValue(() => data)
        : setLastBarValue({});
    });
  }, [
    ShowShiftDate,
    shiftType,
    currentSlide,
    targetList,
    ShowShift,
    shiftHours,
  ]);

  const formatDate = (date) => {
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const getProductData = async (line, categoriesList, formattedDate) => {
    let date = formatDates(formattedDate);
    let temp = "";

    if (currentSlide === 0 && ShowShift === "Day") {
      if (shiftHours) {
        temp = `&duration=6hrs&shift=${shiftType}`;
      } else {
        temp = `&duration=9hrs&shift=${shiftType}`;
      }
    } else {
      if (shiftHours) {
        temp = `&duration=12hrs&shift=1st`;
      } else {
        temp = `&duration=9hrs&shift=${shiftType}`;
      }
    }

    ENV.get(
      `productiondata?line=${line}${temp}&date=${date}&target=${targetList}`
    ).then((response) => {
      const result = response.data;
      let shift = ["shiftA", "shiftB"];
      shift.forEach((item) => {
        let dome = [];
        let shiftData = result.data[item];
        categoriesList.forEach((element, i) => {
          dome.push({
            id: shiftData[i] === undefined ? "-" : shiftData[i].id,
            x: shiftData[i] === undefined ? element : shiftData[i].x,
            y: shiftData[i] === undefined ? "-" : shiftData[i].y,
            z: shiftData[i] === undefined ? "-" : shiftData[i].z,
            product_id:
              shiftData[i] === undefined ? "-" : shiftData[i].product_id,
            target: shiftData[i] === undefined ? "-" : shiftData[i].target,
            comments: shiftData[i] === undefined ? "-" : shiftData[i].comments,
            op_date: shiftData[i] === undefined ? "-" : shiftData[i].op_date,
            line: shiftData[i] === undefined ? "-" : shiftData[i].line,
            downtime: shiftData[i] === undefined ? "-" : shiftData[i].downtime,
          });
        });
        if (item === "shiftA") {
          setFirstResponse(dome);
        } else {
          setSecoundResponse(dome);
        }
      });
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
      setCurrentShift(result.data.currentShift);
      setFirstCardData(result.data.shiftADetails);
      setSecoundCardData(result.data.shiftBDetails);
      setSecoundShiftTiming(result.data.shiftBDetails.shiftTiming);
      setFirstShiftTiming(result.data.shiftADetails.shiftTiming);
      setFirstDowntimeDetails(result.data.shiftADowntimeDetails);
      setSecoundDowntimeDetails(result.data.shiftBDowntimeDetails);
    });
  };

  const handleSlidechange = (type) => {
    type === "Full"
      ? setCurrentSlide((prevSlide) => 1)
      : setCurrentSlide((prevSlide) => (prevSlide + 1) % 2);
  };

  const [todayDate, setTodayDate] = useState(formatDate(new Date()));

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
                >
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
                      firstDowntimeDetails={firstDowntimeDetails}
                      secoundDowntimeDetails={secoundDowntimeDetails}
                      ShowShiftDate={ShowShiftDate}
                      currentShift={currentShift}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
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
                >
                  <Box
                    sx={{
                      display: "flex",
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
                    ShowShiftDate={ShowShiftDate}
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
                    firstDowntimeDetails={firstDowntimeDetails}
                    secoundDowntimeDetails={secoundDowntimeDetails}
                    cardData={cardData}
                    firstShiftTiming={firstShiftTiming}
                    currentShift={currentShift}
                    secoundShiftTiming={secoundShiftTiming}
                  />
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
                >
                  <Box
                    sx={{
                      display: "flex",
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
                    currentShift={currentShift}
                    firstShiftTiming={firstShiftTiming}
                    categories={categories}
                    formatDate={formatDate}
                    yesterdayDate={yesterdayDate}
                    todayDate={todayDate}
                    firstDowntimeDetails={firstDowntimeDetails}
                    secoundDowntimeDetails={secoundDowntimeDetails}
                    cardData={firstCardData}
                    ShiftCardDetailList={ShiftCardDetailList}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
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
                    currentShift={currentShift}
                    targetList={targetList}
                    formatDate={formatDate}
                    firstDowntimeDetails={firstDowntimeDetails}
                    secoundDowntimeDetails={secoundDowntimeDetails}
                    ShiftCardDetailList={ShiftCardDetailList}
                    firstShiftTiming={firstShiftTiming}
                  />
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
            currentShift={currentShift}
            firstDowntimeDetails={firstDowntimeDetails}
            secoundDowntimeDetails={secoundDowntimeDetails}
            ShiftCardDetailList={ShiftCardDetailList}
            cardData={firstCardData}
            firstResponse={firstResponse}
            firstShiftTiming={firstShiftTiming}
          />
        </Box>
      )}
    </>
  );
};

export default AppContainer;
