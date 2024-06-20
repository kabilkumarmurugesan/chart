import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import FullShift from "../Shift/FullShift";
import SingleShift from "../Shift/SingleShift";
import { socket } from "../socket";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const ShiftCardDetailList = [
  { title: "MODEL", value: 155 },
  { title: "MOTHLY ORDER", value: 135 },
  { title: "P.M TARGET", value: 135 },
  { title: "P.M ACTUAL", value: 135 },
];

const AppContainer = ({
  ShowShift,
  ShowShiftDate,
  refreshRate,
  shiftHours,
  isDownTime,
}) => {
  const theme = useTheme();
  const { primary } = theme.palette;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lastBarValue, setLastBarValue] = useState({}); // Initial value for the last bar of PRODUCT A
  const [firstResponse, setFirstResponse] = useState();
  const [secoundResponse, setSecoundResponse] = useState();
  let Dates = new Date(new Date().setDate(new Date().getDate() - 1));
  const yesterdayDate = Dates.toLocaleDateString("en-US"); // MM/DD/YYYY in US English
  const [shiftType, setShiftType] = useState("1st");
  const [visibleQRCodeIndex, setVisibleQRCodeIndex] = useState(null);
  const [downTimeAction, setDownTimeAction] = useState([]);
  const [categories, setCategories] = useState(
    shiftHours
      ? [
          "9 - 10",
          "10 - 11",
          "11 - 12",
          "12 - 1",
          "1 - 2",
          "2 - 3",
          "3 - 4",
          "4 - 5",
          "5 - 6",
        ]
      : ["9 - 10", "10 - 11", "11 - 12", "12 - 1", "1 - 2", "2 - 3"]
  );

  useEffect(() => {
    let date = "";
    if (ShowShiftDate === "Today") {
      getFirstData("L1");
      getSecoundData("L1");
      date = formatDate(new Date());
    } else {
      date = yesterdayDate;
    }
    setTodayDate(date);
  }, [shiftHours, ShowShiftDate, shiftType]);

  useEffect(() => {
    let intervalshiftHours = 0;
    const interval = setInterval(() => {
      handleSlidechage();
    }, refreshRate);
    if (!shiftHours) {
      clearInterval(interval);
      intervalshiftHours = setInterval(() => {
        handleSlidechage();
        setShiftType((prevType) => (prevType === "1st" ? "2nd" : "1st"));
      }, refreshRate / 2);
    }
    return () => {
      clearInterval(interval);
      clearInterval(intervalshiftHours);
    };
  }, [refreshRate, shiftHours]);

  useEffect(() => {
    shiftHours && setShiftType((pre) => "1st");
    setCategories((prevCategories) => {
      let categoriesList = [
        "09 - 10",
        "10 - 11",
        "11 - 12",
        "12 - 1",
        "1 - 2",
        "2 - 3",
        "3 - 4",
        "4 - 5",
        "5 - 6",
      ];

      if (!shiftHours) {
        categoriesList =
          shiftType === "1st"
            ? ["09 - 10", "10 - 11", "11 - 12", "12 - 1", "1 - 2", "2 - 3"]
            : ["3 - 4", "4 - 5", "5 - 6", "6 - 7", "7 - 8", "8 - 9"];
      }

      return categoriesList;
    });
  }, [shiftHours, shiftType]);

  const formatDate = (date) => {
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    if (ShowShiftDate === "Today") {
      socket.on("dataUpdate", (data) => {
        setLastBarValue(data);
      });
    } else {
      setLastBarValue({});
      socket.close();
      getPreviousData("L1");
    }
  }, [ShowShiftDate, shiftHours]);

  const getFirstData = async (line) => {
    let temp = shiftHours
      ? `&duration=9hrs&shift=1st`
      : `&duration=6hrs&shift=${shiftType}`;
    try {
      const response = await fetch(
        `http://localhost:8001/api/v1/general/previousshiftdata?line=${line}&${temp}`
      );
      const result = await response.json();
      setFirstResponse(result.data.data);
    } catch (error) {
      console.error(`Download error: ${error.message}`);
    }
  };

  const getSecoundData = async (line) => {
    let temp = shiftHours
      ? `&duration=9hrs&shift=${shiftType}`
      : `&duration=6hrs&shift=${shiftType}`;
    try {
      const response = await fetch(
        `http://localhost:8001/api/v1/general/shift2?line=${line}&${temp}`
      );
      const result = await response.json();
      let dome = [];
      let updatedData = result.data.updatedData;
      let categoriesList = shiftHours
        ? [
            "09 - 10",
            "10 - 11",
            "11 - 12",
            "12 - 1",
            "1 - 2",
            "2 - 3",
            "3 - 4",
            "4 - 5",
            "5 - 6",
          ]
        : categories;
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
      setSecoundResponse(temps);
    } catch (error) {
      console.error(`Download error: ${error.message}`);
    }
  };

  const handleSlidechage = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % 2);
  };

  const getPreviousData = async (line) => {
    let temps = shiftHours
      ? `&duration=9hrs&shift=1st`
      : `&duration=6hrs&shift=${shiftType}`;
    try {
      const response = await fetch(
        `http://localhost:8001/api/v1/general/displayprevioustwoshiftsdata?line=${line}&${temps}`
      );
      const result = await response.json();
      setFirstResponse(result.data.shiftA);
      let temp = {
        updatedData: result.data.shiftB,
      };
      setSecoundResponse(temp);
    } catch (error) {
      console.error(error.message);
    }
  };

  const [todayDate, setTodayDate] = useState(formatDate(new Date()));

  useEffect(() => {
    getDownTimeData();
  }, []);

  const getDownTimeData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8001/api/v1/general/getDownTime?isShift=${isDownTime}&record=true`
      );
      const result = await response.json();
      setDownTimeAction(result.data);
    } catch (error) {
      console.error(`Download error: ${error.message}`);
    }
  };

  return (
    <>
      {shiftHours && ShowShiftDate === "Today" ? (
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
                height: currentSlide !== 0 ? "100%" : "90vh",
              }}
            >
              {currentSlide === 0 && ShowShift === "All" ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box style={{ flex: "4" }}>
                    <FullShift
                      handleSlidechage={handleSlidechage}
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
                    />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ArrowForwardIosIcon onClick={handleSlidechage} />
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    // alignItems: "center",
                  }}
                >
                  {ShowShift === "All" && (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <ArrowBackIosIcon onClick={handleSlidechage} />
                    </Box>
                  )}
                  <SingleShift
                    shiftHours={shiftHours}
                    isDownTime={isDownTime}
                    handleSlidechage={handleSlidechage}
                    lastBarValue={lastBarValue}
                    visibleQRCodeIndex={visibleQRCodeIndex}
                    setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                    secoundResponse={secoundResponse}
                    categories={categories}
                    formatDate={formatDate}
                    downTimeAction={downTimeAction}
                    ShiftCardDetailList={ShiftCardDetailList}
                  />
                </Box>
              )}
            </Box>
          </CSSTransition>
        </SwitchTransition>
      ) : (
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
                height: currentSlide !== 0 ? "100%" : "90vh",
              }}
            >
              {currentSlide === 0 ? (
                <FullShift
                  handleSlidechage={handleSlidechage}
                  firstResponse={firstResponse}
                  secoundResponse={secoundResponse}
                  categories={categories}
                  yesterdayDate={yesterdayDate}
                  todayDate={todayDate}
                  lastBarValue={lastBarValue}
                  shiftHours={shiftHours}
                  downTimeAction={downTimeAction}
                />
              ) : (
                <FullShift
                  handleSlidechage={handleSlidechage}
                  firstResponse={firstResponse}
                  secoundResponse={secoundResponse}
                  categories={categories}
                  yesterdayDate={yesterdayDate}
                  todayDate={todayDate}
                  lastBarValue={lastBarValue}
                  shiftHours={shiftHours}
                  downTimeAction={downTimeAction}
                />
              )}
            </Box>
          </CSSTransition>
        </SwitchTransition>
      )}
    </>
  );
};

export default AppContainer;
