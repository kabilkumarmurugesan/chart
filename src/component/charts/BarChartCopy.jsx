import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

import SingleChart from "./SingleChart"; // Import the SingleChart component
import { socket } from "../socket";
import { Card } from "@mui/material";

const BarChartCopy = () => {
  const [isBlinking, setIsBlinking] = useState(true);
  const [lastBarValue, setLastBarValue] = useState(20); // Initial value for the last bar of PRODUCT A
  const [showSingleChart, setShowSingleChart] = useState(false); // State to control showing SingleChart
  const [categories, setCategories] = useState([
    "9-10",
    "10-11",
    "11-12",
    "12-01",
    "01-02",
    "02-03",
    "03-04",
  ]);

  const [series, setSeries] = useState([
    { name: "PRODUCT A", data: [87, 87, 90, 95, 95, lastBarValue] },
    { name: "PRODUCT B", data: [0, 0, 0, 0, 0, 5] },
  ]);

  useEffect(() => {
    socket.on("dataUpdate", (data) => {
      let Tcategories = categories;
      let temp = Object.keys(data);
      let dataT = data[temp[0]];
      if (temp[0] !== Tcategories[categories.length - 1]) {
        Tcategories.push(temp[0]);
        setCategories(Tcategories);
      }
      setLastBarValue(dataT[0].total_count);
    });

    const blinkInterval = setInterval(() => {
      setIsBlinking((prevState) => !prevState);
    }, 1000);

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    setSeries([
      { name: "PRODUCT A", data: [87, 87, 90, 90, 95, 95, lastBarValue] },
      { name: "PRODUCT B", data: [0, 0, 0, 0, 0, 0, 10] },
    ]);
  }, [lastBarValue]);

  const handleClick = (event, chartContext, config) => {
    if (config.dataPointIndex === 5) {
      // If the last bar is clicked, show the SingleChart component
      setShowSingleChart(true);
    }
  };

  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: { show: false },
      zoom: { enabled: false },
      events: {
        dataPointSelection: handleClick, // Handle click events
      },
    },
    annotations: {
      xaxis: [
        {
          x: "9-10",
          x2: "9-10",
          borderColor: "#000",
          fillColor: "#B3F7CA",
          opacity: 0.2,
          label: {
            text: "M709 - target: 85",
            style: {
              color: "#fff",
              background: "#00E396",
            },
          },
        },
        {
          x: "9-10",
          x2: "9-10",
          borderColor: "#000",
          fillColor: "#C9A1F7",
          opacity: 0.2,
          label: {
            text: "M759 - target: 100",
            style: {
              color: "#fff",
              background: "#775DD0",
            },
          },
        },
      ],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        dataLabels: {
          enabled: false,
        },
      },
    },
    xaxis: {
      categories: categories,
    },
    legend: {
      show: false, // Disable legend
    },
    fill: {
      opacity: 1,
    },
    colors: ["#1f77b4", isBlinking ? "#ff7f0e" : "#1f77b4"], // Set colors dynamically based on blinking state
  };

  return (
    <div>
      {!showSingleChart ? (
        <div id="chart">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
          />
        </div>
      ) : (
        <SingleChart lastBarValue={lastBarValue} /> // Render SingleChart with lastBarValue
      )}
      <div id="html-dist"></div>
    </div>
  );
};

export default BarChartCopy;
