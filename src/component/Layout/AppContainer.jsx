import React, { useEffect, useState, useContext } from "react";
import { Box, useTheme } from "@mui/material";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import FullShift from "../Shift/FullShift";
import SingleShift from "../Shift/SingleShift";
import { socket } from "../../utilities/socket";
import FullShiftOverall from "../Shift/FullShiftOverall";
import ENV from "../../utilities/ENV";
import ShiftContext from "./shiftContext.jsx";

const ShiftCardDetailList = [
  { title: "MFG ORDER", value: 155 },
  { title: "MTM", value: 135 },
  { title: "MONTH TARGET", value: 11200 },
  { title: "MONTH ACTUAL", value: 8150 },
];

const AppContainer = () => {
  const theme = useTheme();
  const { primary } = theme.palette;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [targetOne, setTargetOne] = useState(10);
  const [lastBarValue, setLastBarValue] = useState({}); // Initial value for the last bar of PRODUCT A
  const [firstResponse, setFirstResponse] = useState([]);
  const [firstShiftTiming, setFirstShiftTiming] = useState(
    "09:00 PM - 05:30 AM"
  );
  const [secoundShiftTiming, setSecoundShiftTiming] = useState(
    "09:00 AM - 05:30 PM"
  );

  const {
    ShowShift,
    ShowShiftDate,
    refreshRate,
    shiftHours,
    isDownTime,
    refreshStatus,
    targetList,
  } = useContext(ShiftContext);

  useEffect(() => {
    targetList[0] !== undefined && setTargetOne(targetList[0].target);
  }, [targetList]);

  const [secoundResponse, setSecoundResponse] = useState([]);
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
    if (targetList !== undefined) {
      if (ShowShiftDate === "Today") {
        date = formatDate(new Date());
        const formattedDate = `${dates.getFullYear()}-${
          dates.getMonth() + 1
        }-${dates.getDate()}`;
        getProductData("L1", categoriesList, formattedDate);
      } else {
        date = yesterdayDate;
        getProductData("L1", categoriesList, yesterdayDate);
      }
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
      `productiondata?line=${line}${temp}&date=${date}&target=${targetOne}`
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
            headcount:
              shiftData[i] === undefined ? "-" : shiftData[i].headcount,
            upph: shiftData[i] === undefined ? "-" : shiftData[i].upph,
            product_id:
              shiftData[i] === undefined ? "-" : shiftData[i].product_id,
            target: shiftData[i] === undefined ? "-" : shiftData[i].target,
            comments: shiftData[i] === undefined ? "-" : shiftData[i].comments,
            op_date: shiftData[i] === undefined ? "-" : shiftData[i].op_date,
            line: shiftData[i] === undefined ? "-" : shiftData[i].line,
            downtime: shiftData[i] === undefined ? "-" : shiftData[i].downtime,
          });
        });
        ShiftCardDetailList[0].value = result.data.shiftBDetails.mfgOrderCount;
        ShiftCardDetailList[1].value =
          result.data.shiftBDetails.mfgProductCount;
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
                      targetOne={targetOne}
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
                      disabledOne={true}
                      disabledTwo={false}
                      handaleEvent={() => {
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
                    />
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <FullShiftOverall
                    targetOne={targetOne}
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
                    disabledOne={false}
                    disabledTwo={true}
                    handaleEvent={() => {
                      handleSlidechange();
                      setShiftType("1st");
                    }}
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
                  <SingleShift
                    targetOne={targetOne}
                    shiftHours={shiftHours}
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
                    currentSlide={currentSlide}
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
                  <SingleShift
                    shiftHours={shiftHours}
                    currentSlide={currentSlide}
                    targetOne={targetOne}
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
            targetOne={targetOne}
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
