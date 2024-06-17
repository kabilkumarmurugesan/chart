import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import FullShift from "../Shift/FullShift";
import SingleShift from "../Shift/SingleShift";

const ShiftCardDetailList = [
  { title: "MODEL", value: 155 },
  { title: "MOTHLY ORDER", value: 135 },
  { title: "P.M TARGET", value: 135 },
  { title: "P.M ACTUAL", value: 135 },
];

const AppContainer = ({ ShowShift, refreshRate, shiftHours }) => {
  const theme = useTheme();
  const { primary } = theme.palette;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [firstResponse, setFirstResponse] = useState();
  const [secoundResponse, setSecoundResponse] = useState();
  let Dates = new Date(new Date().setDate(new Date().getDate() - 1));
  const yesterdate = Dates.toLocaleDateString("en-US"); // MM/DD/YYYY in US English
  const [categories, setCategories] = useState(
    shiftHours
      ? [
          "09-10",
          "10-11",
          "11-12",
          "12-01",
          "01-02",
          "02-03",
          "03-04",
          "04-05",
          "05-06",
        ]
      : ["09-10", "10-11", "11-12", "12-01", "01-02", "02-03"]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 2); // Adjusted to 2 slides
    }, refreshRate);
    return () => clearInterval(interval);
  }, [refreshRate]);

  useEffect(() => {
    shiftHours
      ? setCategories((pre) => [
          "09-10",
          "10-11",
          "11-12",
          "12-01",
          "01-02",
          "02-03",
          "03-04",
          "04-05",
          "05-06",
        ])
      : setCategories((pre) => [
          "09-10",
          "10-11",
          "11-12",
          "12-01",
          "01-02",
          "02-03",
        ]);
  }, [shiftHours]);

  const formatDate = (date) => {
    const day = String(date.getDate());
    // .padStart(2, "0");
    const month = String(date.getMonth() + 1);
    // .padStart(2, "0"); // getMonth() is zero-based
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    getFirstData("L1");
    getSecoundData("L1");
  }, []);

  const getFirstData = async (line) => {
    let temp = shiftHours ? `&duration=9hrs` : `&duration=6hrs`;
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
    try {
      const response = await fetch(
        `http://localhost:8001/api/v1/general/shift2?line=${line}&duration=6hrs&shift=1st`
      );
      const result = await response.json();
      setSecoundResponse(result.data);
    } catch (error) {
      console.error(`Download error: ${error.message}`);
    }
  };

  return (
    <SwitchTransition>
      <CSSTransition
        key={currentSlide}
        timeout={600}
        classNames="zoom-fade"
        unmountOnExit
      >
        <Box
          className="zoom-fade-container"
          sx={{ background: primary.main, fontWeight: "bold", height: "100%" }}
        >
          {currentSlide === 0 && ShowShift === "All" ? (
            <FullShift
              firstResponse={firstResponse}
              secoundResponse={secoundResponse}
              categories={categories}
              yesterdate={yesterdate}
              shiftHours
              formatDate={formatDate}
            />
          ) : (
            <SingleShift
              shiftHours
              secoundResponse={secoundResponse}
              categories={categories}
              formatDate={formatDate}
              ShiftCardDetailList={ShiftCardDetailList}
            />
          )}
        </Box>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default AppContainer;
