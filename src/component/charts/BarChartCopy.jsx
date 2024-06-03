/* import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { QRCodeCanvas } from "qrcode.react";

class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Actual",
          data: [
            { x: "09-10", y: 1292, goals: [{ name: "Target", value: 5600, strokeHeight: 5, strokeWidth: 55, strokeColor: "#775DD0" }] },
            { x: "10-11", y: 4432, goals: [{ name: "Target", value: 5600, strokeHeight: 5, strokeWidth: 55, strokeColor: "#775DD0" }] },
            { x: "11-12", y: 5423, goals: [{ name: "Target", value: 5200, strokeHeight: 5, strokeWidth: 55, strokeColor: "#775DD0" }] },
            { x: "12-01", y: 6653, goals: [{ name: "Target", value: 5200, strokeHeight: 5, strokeWidth: 55, strokeColor: "#775DD0" }] },
            { x: "01-02", y: 8133, goals: [{ name: "Target", value: 5200, strokeHeight: 5, strokeWidth: 55, strokeColor: "#775DD0" }] },
            { x: "02-03", y: 7132, goals: [{ name: "Target", value: 5200, strokeHeight: 5, strokeWidth: 55, strokeColor: "#775DD0" }] },
            { x: "03-04", y: 7332, goals: [{ name: "Target", value: 5200, strokeHeight: 5, strokeWidth: 55, strokeColor: "#775DD0" }] },
            { x: "04-05", y: 6553, goals: [{ name: "Target", value: 5200, strokeHeight: 5, strokeWidth: 55, strokeColor: "#775DD0" }] },
            { x: "05-06", y: 6753, goals: [{ name: "Target", value: 5200, strokeHeight: 5, strokeWidth: 55, strokeColor: "#775DD0" }] },
            // Adding new data with target lines for May 25, 26, 27, 28, 29
            { x: "05-25", y: 7000, goals: [{ name: "Target", value: 8500, strokeHeight: 5, strokeWidth: 55, strokeColor: "#FF4560" }] },
            { x: "05-26", y: 7000, goals: [{ name: "Target", value: 8500, strokeHeight: 5, strokeWidth: 55, strokeColor: "#FF4560" }] },
            { x: "05-27", y: 7000, goals: [{ name: "Target", value: 10000, strokeHeight: 5, strokeWidth: 55, strokeColor: "#00E396" }] },
            { x: "05-28", y: 7000, goals: [{ name: "Target", value: 10000, strokeHeight: 5, strokeWidth: 55, strokeColor: "#00E396" }] },
            { x: "05-29", y: 7000, goals: [{ name: "Target", value: 10000, strokeHeight: 5, strokeWidth: 55, strokeColor: "#00E396" }] },
          ],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            columnWidth: "60%",
          },
        },
        colors: ["#00E396"],
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ["Actual", "Target"],
          markers: {
            fillColors: ["#00E396", "#775DD0"],
          },
        },
        yaxis: {
          max: 11000, // set the y-axis maximum value to accommodate the highest target
        },
      },
    };
  }

  componentDidMount() {
    this.blinkLastBar();
  }

  blinkLastBar = () => {
    const lastBar = document.querySelector(".apexcharts-series:last-child .apexcharts-bar-series");
    if (lastBar) {
      lastBar.classList.add("blinking");
    }
  };

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={350}
          />
        </div>
        <div id="qr-code" style={{ paddingLeft: "540px", paddingBottom: "10px" }}>
          <QRCodeCanvas value="Hi Welcome to Lenovo" size={50} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default BarChart; */

import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { QRCodeCanvas } from "qrcode.react";
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
    { name: "PRODUCT B", data: [0, 0, 0, 0, 0, 10] },
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
      height: 250,
      width: 100,
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
          x2: "11-12",
          // borderColor: "#000",
          // fillColor: "#B3F7CA",
          fillColor: "none",
          // label: {
          //   text: "M709 - target: 85",
          //   style: {
          //     color: "#fff",
          //     background: "#00E396",
          //   },
          // },
        },
        {
          x: "12-01",
          x2: "03-04",
          // borderColor: "#000",
          // fillColor: "#C9A1F7",
          fillColor: "none",
          // label: {
          //   text: "M759 - target: 100",
          //   style: {
          //     color: "#fff",
          //     background: "#775DD0",
          //   },
          // },
        },
      ],
      yaxis: [
        {
          y: 85,
          borderColor: "#00E396",
          borderWidth: "15",
          label: {
            text: "Target: 85",
            style: {
              color: "#fff",
              background: "#00E396",
            },
          },
        },
        {
          y: 100,
          borderColor: "#775DD0",
          borderWidth: "15",
          label: {
            text: "Target: 100",
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
    // fill: {
    //   opacity: 1,
    // },
    colors: ["#1f77b4", isBlinking ? "#ff7f0e" : "#fff"], // Set colors dynamically based on blinking state
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
          <div id="qr-code" style={{ paddingLeft: "760px" }}>
            <QRCodeCanvas value="Hi Welcome to Lenovo" size={60} />
          </div>
        </div>
      ) : (
        <SingleChart lastBarValue={lastBarValue} /> // Render SingleChart with lastBarValue
      )}
    </div>
  );
};

export default BarChartCopy;
