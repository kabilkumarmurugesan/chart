import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import SingleChart from "./SingleChart"; // Import the SingleChart component

const BarChartCopy = () => {
  const [isBlinking, setIsBlinking] = useState(true);
  const [lastBarValue, setLastBarValue] = useState(20); // Initial value for the last bar of PRODUCT A
  const [showSingleChart, setShowSingleChart] = useState(false); // State to control showing SingleChart

  const [series, setSeries] = useState([
    { name: "PRODUCT A", data: [87, 87, 90, 95, 95, lastBarValue] },
    { name: "PRODUCT B", data: [0, 0, 0, 0, 0, 10] },
  ]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking((prevState) => !prevState);
    }, 1000);

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    const incrementValue = () => {
      setLastBarValue((prevValue) => prevValue + 1); // Increment the last value of PRODUCT A

      setTimeout(incrementValue, 20000); // Recursively call incrementValue every 20 seconds
    };

    const timeout = setTimeout(incrementValue, 20000); // Initial call after 20 seconds

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setSeries([
      { name: "PRODUCT A", data: [87, 87, 90, 90, 95, 95, lastBarValue] },
      { name: "PRODUCT B", data: [0, 0, 0, 0, 0,0, 10] },
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
          x: "09-10",
          x2: "10-11",
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
          x: "01-02",
          x2: "02-03",
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
      categories: [
        "01-02",
        "02-03",
        "03-04",
        "09-10",
        "10-11",
        "11-12",
        "12-01",
      ],
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
