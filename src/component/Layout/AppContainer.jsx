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
  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const yseterdate = yesterday.toLocaleDateString("en-US"); // MM/DD/YYYY in US English
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
  const [series, setSeries] = useState([
    75, 80, 90, 95, 25, 95, 95, 65, 95, 95,
  ]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 2); // Adjusted to 2 slides
    }, refreshRate);
    return () => clearInterval(interval);
  }, [refreshRate]);

  useEffect(() => {
    console.log("shiftHours", shiftHours);
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
    getData("L1");
  }, []);

  const getData = async (line) => {
    let temp = shiftHours ? `&duration=9hrs` : `&duration=6hrs&shift=2nd`;

    try {
      const response = await fetch(
        `http://localhost:8001/api/v1/general/previousshiftdata?line=${line}&temp`
      );
      const result = await response.json();
      let temp = [];
      let categories = [];
      result.data.map((item) => {
        temp.push(item.y);
        categories.push(item.x);
      });
      // let optionline=options.plugins.annotation
      // console.log(optionline)
      setSeries(temp);
      setCategories(categories);
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
              categories={categories}
              yseterdate={yseterdate}
              formatDate={formatDate}
            />
          ) : (
            <SingleShift
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
