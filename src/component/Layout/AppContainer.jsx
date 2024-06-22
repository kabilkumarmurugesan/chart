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
  { title: "MO", value: 155 },
  { title: "MTM", value: 135 },
  { title: "PRODUCT MONTHLY TARGET", value: 1200 },
  { title: "PRODUCT MONTHLY ACTUAL", value: 850 },
];

const AppContainer = ({
  ShowShift,
  ShowShiftDate,
  refreshRate,
  shiftHours,
  isDownTime,
  refreshStatus,
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
    let date = "";
    if (ShowShiftDate === "Today") {
      getFirstData("L1");
      getSecoundData("L1");
      date = formatDate(new Date());
    } else {
      date = yesterdayDate;
    }
    setTodayDate(date);
  }, [shiftHours, ShowShift, ShowShiftDate, shiftType]);

  useEffect(() => {
    let intervalshiftHours = 0;
    let interval = 0;
    if (refreshStatus) {
      interval = setInterval(() => {
        handleSlidechage();
      }, refreshRate);
      if (!shiftHours) {
        clearInterval(interval);
        intervalshiftHours = setInterval(() => {
          handleSlidechage();
          setShiftType((prevType) => (prevType === "1st" ? "2nd" : "1st"));
        }, refreshRate / 2);
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
    if (shiftHours) {
      setShiftType("1st");
    }
    if (ShowShift === "All") {
      setCategories(() => {
        let categoriesList = [
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

        if (!shiftHours) {
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
        }

        return categoriesList;
      });
    } else {
      setCategories(() => {
        let categoriesList = [
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

        return categoriesList;
      });
    }
  }, [shiftHours, ShowShift, shiftType]);

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
  }, [ShowShiftDate, ShowShift, shiftHours]);

  const getFirstData = async (line) => {
    let temp =
      ShowShift === "All"
        ? shiftHours
          ? `&duration=9hrs&shift=1st`
          : `&duration=6hrs&shift=${shiftType}`
        : shiftHours
        ? `&duration=12hrs&shift=1st`
        : `&duration=9hrs&shift=${shiftType}`;
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
    let temp =
      ShowShift === "All"
        ? shiftHours
          ? `&duration=9hrs&shift=1st`
          : `&duration=6hrs&shift=${shiftType}`
        : shiftHours
        ? `&duration=12hrs&shift=1st`
        : `&duration=9hrs&shift=${shiftType}`;
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
            "12 - 01",
            "01 - 02",
            "02 - 03",
            "03 - 04",
            "04 - 05",
            "05 - 06",
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
    let temps =
      ShowShift === "All"
        ? shiftHours
          ? `&duration=9hrs&shift=1st`
          : `&duration=6hrs&shift=${shiftType}`
        : shiftHours
        ? `&duration=12hrs&shift=1st`
        : `&duration=9hrs&shift=${shiftType}`;
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
      {ShowShiftDate === "Today" && ShowShift === "All" ? (
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton disabled onClick={handleSlidechage}>
                      <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton onClick={handleSlidechage}>
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </Box>
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton disabled onClick={handleSlidechage}>
                      <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton onClick={handleSlidechage}>
                      <ArrowForwardIosIcon />
                    </IconButton>
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton onClick={handleSlidechage}>
                      <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton disabled onClick={handleSlidechage}>
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </Box>
                  <FullShiftOverall
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

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton onClick={handleSlidechage}>
                      <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton disabled onClick={handleSlidechage}>
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </Box>
          </CSSTransition>
        </SwitchTransition>
      ) : ShowShift === "All" ? (
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
                height: currentSlide !== 0 ? "100%" : "94vh",
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
      ) : (
        <Box
          className="zoom-fade-container"
          sx={{
            background: primary.main,
            fontWeight: "bold",
            height: currentSlide !== 0 ? "100%" : "94vh",
          }}
        >
          <SingleShift
            shiftHours={shiftHours}
            isDownTime={isDownTime}
            handleSlidechage={handleSlidechage}
            lastBarValue={lastBarValue}
            ShowShiftDate={ShowShiftDate}
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
    </>
  );
};

export default AppContainer;
