// src/EQChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EQChart = () => {
  const data = {
    labels: [
      "32Hz",
      "64Hz",
      "125Hz",
      "250Hz",
      "500Hz",
      "1kHz",
      "2kHz",
      "4kHz",
      "8kHz",
      "16kHz",
    ],
    datasets: [
      {
        label: "EQ Levels",
        data: [20, 0, 0, 30, 0, 40, 0, 0, 40, 0],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
        max: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default EQChart;
