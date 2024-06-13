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

const AppContainer = ({ ShowShift, refreshRate }) => {
  const theme = useTheme();
  const { primary } = theme.palette;
  const [currentSlide, setCurrentSlide] = useState(0);
  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const yseterdate = yesterday.toLocaleDateString("en-US"); // MM/DD/YYYY in US English

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 2); // Adjusted to 2 slides
    }, refreshRate);
    return () => clearInterval(interval);
  }, [refreshRate]);

  const formatDate = (date) => {
    const day = String(date.getDate())
    // .padStart(2, "0");
    const month = String(date.getMonth() + 1)
    // .padStart(2, "0"); // getMonth() is zero-based
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
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
            <FullShift yseterdate={yseterdate} formatDate={formatDate} />
          ) : (
            <SingleShift
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
