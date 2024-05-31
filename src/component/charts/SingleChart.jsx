import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { socket } from "../socket"; // Ensure you have configured your socket connection properly

ChartJS.register(CategoryScale, LinearScale, BarElement);

const SingleChart = () => {
  const [isBlinking, setIsBlinking] = useState(true);
  const [addValue, setAddValue] = useState(0);

  useEffect(() => {
    // Socket listener for data updates
    socket.on("dataUpdate", (data) => {
      const temp = Object.keys(data)[0];
      const dataT = data[temp];
      if (temp === "03-04") {
        setAddValue(dataT[0].total_count);
      }
    });

    // Interval for blinking effect
    const blinkInterval = setInterval(() => {
      setIsBlinking((prevState) => !prevState);
    }, 1000); // Blink every second

    // Interval for incrementing Product A value
    const incrementInterval = setInterval(() => {
      setAddValue((prevValue) => prevValue + 1);
    }, 10000); // Increment every 10 seconds

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(blinkInterval);
      clearInterval(incrementInterval);
    };
  }, []);

  // Data for the chart
  const data = {
    labels: ["03-04"],
    datasets: [
      {
        label: "PRODUCT A",
        data: [addValue],
        backgroundColor: "#1f77b4",
        stack: "Stack 0",
      },
      {
        label: "PRODUCT B",
        data: [10],
        backgroundColor: isBlinking ? "#ff7f0e" : "#1f77b4",
        stack: "Stack 0",
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      x: {
        display: true, // Hide x-axis labels
        stacked: true,
      },
      y: {
        display: true, // Hide y-axis labels
        beginAtZero: true,
        max: 20,
        stacked: true,
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    /* layout: {
      padding: {
        left: 50, // Adjust this value to center the bars horizontally
        right: 50,
      },
    }, */
  };

  return (
    <div style={{ height: "400px", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "50%" }}>
        <Bar data={data} options={options} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default SingleChart;
