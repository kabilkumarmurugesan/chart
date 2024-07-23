import React, { useEffect, useState, useContext } from "react";
import { Box, useTheme } from "@mui/material";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import FullShift from "../Shift/FullShift";
import SingleShift from "../Shift/SingleShift";
import { socket } from "../../utilities/socket";
import FullShiftOverall from "../Shift/FullShiftOverall";
import ENV from "../../utilities/ENV";
import CommonService from "../../utilities/CommonService";
import ShiftContext from "../../utilities/Context/shiftContext";
import SingleShiftHrs from "../../pages/SingleShiftHrs";

const ShiftCardDetailList = [
  { title: "MFG ORDER", value: 2 },
  { title: "MTM", value: 2 },
  { title: "MONTH TARGET", value: 11200 },
  { title: "MONTH ACTUAL", value: 8150 },
];

const AppContainer = () => {
  const {
    ShowShift,
    ShowShiftDate,
    refreshRate,
    shiftHours,
    refreshStatus,
    targetList,
    isSystem,
  } = useContext(ShiftContext);

  const theme = useTheme();
  const { primary } = theme.palette;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [targetOne, setTargetOne] = useState(10);
  const [lastBarValue, setLastBarValue] = useState({}); // Initial value for the last bar of PRODUCT A
  const [firstResponse, setFirstResponse] = useState([]);
  const [hrsResponse, setHrsResponse] = useState([]);
  const [firstShiftTiming, setFirstShiftTiming] = useState(
    "09:00 PM - 05:30 AM"
  );
  const [secoundShiftTiming, setSecoundShiftTiming] = useState(
    "09:00 AM - 05:30 PM"
  );

  const [secoundResponse, setSecoundResponse] = useState([]);
  let Dates = new Date(new Date().setDate(new Date().getDate() - 1));
  const yesterdayDate = Dates.toLocaleDateString("en-US"); // MM/DD/YYYY in US English
  const [shiftType, setShiftType] = useState("1st");
  const [visibleQRCodeIndex, setVisibleQRCodeIndex] = useState(null);
  const [mfgcardData, setMFGCardData] = useState([]);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [intervals, setIntervals] = useState(60000);
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

  const [apiControll, setApiControll] = useState("");
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
            size: 13,
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
        barThickness: 35,
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

  useEffect(() => {
    let temp = targetList.reduce(
      (accumulator, currentValue) => accumulator + currentValue.target,
      0
    );
    targetList.length > 0 && setTargetOne(temp / targetList.length);
  }, [targetList]);

  useEffect(() => {
    getHrsProductData();
  }, [currentHour]);

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
  }, [refreshRate, isSystem, refreshStatus, shiftHours]);

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
        date = CommonService.formatDate(new Date());
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
    ShowShiftDate,
    shiftType,
    currentSlide,
    targetList,
    ShowShift,
    shiftHours,
    refreshRate,
    apiControll,
  ]);

  useEffect(() => {
    socket.on("dataUpdate", (data) => {
      setApiControll(data.timeRange);
      if (ShowShiftDate === "Today") {
        setLastBarValue(() => data);
      } else {
        setLastBarValue({});
      }
    });
  }, [
    ShowShiftDate,
    shiftType,
    currentSlide,
    targetList,
    ShowShift,
    shiftHours,
  ]);

  useEffect(() => {
    let cardDatalist = cardData;
    if (lastBarValue.overAllActual !== undefined) {
      if (cardData.length > 0) {
        cardDatalist[1].value = lastBarValue.overAllActual;
        cardDatalist[2].value = lastBarValue.overAllUph;
        setCardData(() => cardDatalist);
      }
    }
  }, [lastBarValue, cardData]);

  const getProductData = async (line, categoriesList, formattedDate) => {
    const date = CommonService.formatDates(formattedDate);
    let temp = "";
    if (currentSlide === 0 && ShowShift === "Day") {
      temp = shiftHours
        ? `&duration=6hrs&shift=${shiftType}`
        : `&duration=9hrs&shift=${shiftType}`;
    } else {
      temp = shiftHours
        ? `&duration=12hrs&shift=1st`
        : `&duration=9hrs&shift=${shiftType}`;
    }

    try {
      const response = await ENV.get(
        `productiondata?line=${line}${temp}&date=${date}&target=${targetOne}&isSystem=${isSystem}`
      );
      const result = response.data;
      const shifts = ["shiftA", "shiftB"];
      let ShiftCardDetailListMFG = ShiftCardDetailList;
      let shiftACardDetailListMFG = [];
      let shiftBCardDetailListMFG = [];

      shifts.forEach((shift, index) => {
        const dome = categoriesList.map((element, i) => {
          const res = result.data[shift].find((item) => item.x === element);
          ShiftCardDetailListMFG[0].value =
            result.data[`${shift}Details`].mfgOrderCount;
          ShiftCardDetailListMFG[1].value =
            result.data[`${shift}Details`].mfgProductCount;
          return {
            id: res
              ? res.id
              : shift === "shiftA"
              ? i + index
              : i +
                (index === 0
                  ? shiftType === "1st"
                    ? 12
                    : 13
                  : shiftType === "1st"
                  ? 24
                  : 25),

            x: res ? res.x : element,
            y: res ? res.y : "-",
            z: res ? res.z : "-",
            headcount: res ? res.headcount : "-",
            upph: res ? res.upph : "-",
            product_id: res ? res.product_id : "-",
            target: res ? res.target : "-",
            comments: res ? res.comments : "-",
            op_date: res ? res.op_date : "-",
            line: res ? res.line : "-",
            downtime: res ? res.downtime : "-",
          };
        });

        if (shift === "shiftA") {
          shiftACardDetailListMFG = ShiftCardDetailListMFG;
          setFirstResponse(dome);
        } else {
          shiftBCardDetailListMFG = ShiftCardDetailListMFG;
          setSecoundResponse(dome);
        }
      });

      ShiftCardDetailListMFG = {
        shiftA: shiftACardDetailListMFG,
        shiftB: shiftBCardDetailListMFG,
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
      setCurrentShift(result.data.currentShift);
      setFirstCardData(result.data.shiftADetails);
      setSecoundCardData(result.data.shiftBDetails);
      setFirstShiftTiming(result.data.shiftADetails.shiftTiming);
      setSecoundShiftTiming(result.data.shiftBDetails.shiftTiming);
      setFirstDowntimeDetails(result.data.shiftADowntimeDetails);
      setSecoundDowntimeDetails(result.data.shiftBDowntimeDetails);
      // ShiftCardDetailList[0].value =
      //   result.data[`${result.data.currentShift}Details`].mfgOrderCount;
      // ShiftCardDetailList[1].value =
      //   result.data[`${result.data.currentShift}Details`].mfgProductCount;

      setMFGCardData(ShiftCardDetailListMFG);
    } catch (error) {
      console.error("Error fetching production data:", error);
    }
  };

  const handleSlidechange = (type) => {
    type === "Full"
      ? setCurrentSlide((prevSlide) => 1)
      : setCurrentSlide((prevSlide) => (prevSlide + 1) % 2);
  };

  const [todayDate, setTodayDate] = useState(
    CommonService.formatDate(new Date())
  );

  const handleButtonClick = (index, id) => {
    setVisibleQRCodeIndex((prevIndex) => (prevIndex === index ? null : index));
    if (id === "Full" && index !== null) {
      handleSlidechange("Full");
    } else if (
      (id !== "single" && index !== null) ||
      (currentSlide % 2 === 0 && index !== null)
    ) {
      handleSlidechange();
    }
  };

  const getHrsProductData = async () => {
    try {
      const response = await ENV.get(`getLastThreeHour?line=L1`);
      const result = response.data.data;
      setCurrentHour(new Date().getHours());
      const dome = result.map((res, i) => {
        let x = `${CommonService.timeFromater12(
          res.start_time
        )} - ${CommonService.timeFromater12(res.end_time)}`;
        return {
          id: res ? res.id : i,
          x: res ? x : "-",
          y: res ? res.totalcount : "-",
          z: res ? res.target : "-",
          headcount: res ? res.headcount : "-",
          upph: res ? res.upph : "-",
          product_id: res ? res.product_id : "-",
          target: res ? res.target : "-",
          comments: res ? res.comments : "-",
          op_date: res ? res.op_date : "-",
          line: res ? res.line : "-",
          downtime: res ? res.downtime : "-",
        };
      });

      setHrsResponse(dome);
      setDataSet((prevData) => {
        let initialLabel = [];
        const newLineData = [];
        const newBarData = [];
        result.forEach((res) => {
          let temp = CommonService.timeFromater12(res.start_time);
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

  const handleInterval = (event) => {
    event.persist();
    setIntervals(event.target.value);
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
                >
                  <Box style={{ flex: "4" }}>
                    <FullShift
                      targetOne={targetOne}
                      handleSlidechange={handleSlidechange}
                      firstResponse={firstResponse}
                      visibleQRCodeIndex={visibleQRCodeIndex}
                      setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                      handleButtonClick={handleButtonClick}
                      secoundResponse={secoundResponse}
                      secoundShiftTiming={secoundShiftTiming}
                      firstShiftTiming={firstShiftTiming}
                      categories={categories}
                      targetList={targetList}
                      yesterdayDate={yesterdayDate}
                      todayDate={todayDate}
                      lastBarValue={lastBarValue}
                      shiftHours={shiftHours}
                      firstCardData={firstCardData}
                      secoundCardData={secoundCardData}
                      firstDowntimeDetails={firstDowntimeDetails}
                      secoundDowntimeDetails={secoundDowntimeDetails}
                      currentShift={currentShift}
                      disabledOne={true}
                      disabledTwo={false}
                      shiftType={shiftType}
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
                    handleButtonClick={handleButtonClick}
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
                    secoundCardData={secoundCardData}
                    firstCardData={firstCardData}
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
                    handleSlidechange={handleSlidechange}
                    lastBarValue={lastBarValue}
                    visibleQRCodeIndex={visibleQRCodeIndex}
                    setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                    handleButtonClick={handleButtonClick}
                    firstResponse={firstResponse}
                    currentShift={currentShift}
                    firstShiftTiming={firstShiftTiming}
                    categories={categories}
                    yesterdayDate={yesterdayDate}
                    currentSlide={currentSlide}
                    todayDate={todayDate}
                    firstDowntimeDetails={firstDowntimeDetails}
                    secoundDowntimeDetails={secoundDowntimeDetails}
                    cardData={firstCardData}
                    ShiftCardDetailList={mfgcardData.shiftB}
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
                    currentSlide={currentSlide}
                    targetOne={targetOne}
                    handleSlidechange={handleSlidechange}
                    lastBarValue={lastBarValue}
                    visibleQRCodeIndex={visibleQRCodeIndex}
                    handleButtonClick={handleButtonClick}
                    setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                    secoundResponse={secoundResponse}
                    secoundShiftTiming={secoundShiftTiming}
                    categories={categories}
                    cardData={secoundCardData}
                    yesterdayDate={yesterdayDate}
                    todayDate={todayDate}
                    currentShift={currentShift}
                    firstDowntimeDetails={firstDowntimeDetails}
                    secoundDowntimeDetails={secoundDowntimeDetails}
                    ShiftCardDetailList={mfgcardData.shiftB}
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
          {" "}
          {currentSlide === 0 ? (
            <SingleShift
              handleSlidechange={handleSlidechange}
              lastBarValue={lastBarValue}
              visibleQRCodeIndex={visibleQRCodeIndex}
              setVisibleQRCodeIndex={setVisibleQRCodeIndex}
              handleButtonClick={handleButtonClick}
              secoundResponse={secoundResponse}
              categories={categories}
              yesterdayDate={yesterdayDate}
              todayDate={todayDate}
              currentShift={currentShift}
              targetOne={targetOne}
              firstDowntimeDetails={firstDowntimeDetails}
              secoundDowntimeDetails={secoundDowntimeDetails}
              ShiftCardDetailList={mfgcardData["shiftA"]}
              cardData={
                currentShift === "shiftA" ? firstCardData : secoundCardData
              }
              firstResponse={
                currentShift === "shiftA" ? firstResponse : undefined
              }
              firstShiftTiming={firstShiftTiming}
              currentSlide={currentSlide}
              secoundShiftTiming={secoundShiftTiming}
            />
          ) : (
            <SingleShiftHrs
              categories={categories}
              response={dataSet}
              hrsResponse={hrsResponse}
              ShiftCardDetailList={mfgcardData["shiftA"]}
              handleSlidechange={handleSlidechange}
              lastBarValue={lastBarValue}
              visibleQRCodeIndex={visibleQRCodeIndex}
              yesterdayDate={yesterdayDate}
              todayDate={todayDate}
              cardData={
                currentShift === "shiftA" ? firstCardData : secoundCardData
              }
              firstDowntimeDetails={firstDowntimeDetails}
              secoundDowntimeDetails={secoundDowntimeDetails}
              currentShift={currentShift}
              currentSlide={currentSlide}
              handleInterval={handleInterval}
              intervals={intervals}
              currentHour={currentHour}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default AppContainer;
