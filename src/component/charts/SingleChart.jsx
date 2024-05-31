import { QRCodeCanvas } from "qrcode.react";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { socket } from "../socket";

const SingleChart = ({ lastBarValue }) => {
  const [isBlinking, setIsBlinking] = useState(true);
  const [addValue, setaddValue] = useState(0);
  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState([
    { name: "PRODUCT A", data: [addValue] },
    { name: "PRODUCT B", data: [5] },
  ]);

  useEffect(() => {
    socket.on('dataUpdate', (data) => {
      let Tcategories = categories
     let temp = Object.keys(data)
     let dataT = data[temp[0]]
     if (temp[0] !== Tcategories[categories.length - 1]) {
       Tcategories.push(temp[0])
       setCategories(Tcategories)
     }
     setaddValue(dataT[0].total_count)
     setSeries((prevSeries) => [
      { name: "PRODUCT A", data: [dataT[0].total_count] },
      { name: "PRODUCT B", data: [5] },
    ]);
   });
    const blinkInterval = setInterval(() => {
      setIsBlinking((prevState) => !prevState);
    }, 1000);

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    const incrementValue = () => {
      setSeries((prevSeries) => [
        { name: "PRODUCT A", data: [prevSeries[0].data[0] + 1] },
        { name: "PRODUCT B", data: [10] },
      ]);

      setTimeout(incrementValue, 20000); // Recursively call incrementValue every 20 seconds
    };

    const timeout = setTimeout(incrementValue, 20000); // Initial call after 20 seconds

    return () => clearTimeout(timeout);
  }, []);

  const options = {
    chart: {
      type: "bar",
      height: 250,
      stacked: true,
      toolbar: { show: false },
      zoom: { enabled: false },
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
      type: "datetime",
      categories: ["2024-05-30T00:00:00.000Z"], // Ensure the format matches your data
      tickAmount: 1,
      labels: {
        format: "MMM dd",
        style: {
          colors: [],
          fontSize: "12px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
        offsetX: 0,
        offsetY: 10, // Adjust the vertical position
        formatter: function (value, timestamp) {
          return new Date(timestamp).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
        },
      },
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
      <div id="html-dist"></div>
    </div>
  );
};

export default SingleChart;
