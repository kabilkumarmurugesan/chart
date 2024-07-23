import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import ENV from "../utilities/ENV";
import AppHeader from "../component/Layout/AppHeader";
import RadioBtn from "../component/RadioBtn";
import { useTheme } from "@emotion/react";
import zoomPlugin from "chartjs-plugin-zoom";
import CommonService from "../utilities/CommonService";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  zoomPlugin,
  BarController
);

export default function StackedBarLineChart() {
  const theme = useTheme();
  const { primary } = theme.palette;
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [intervals, setIntervals] = useState(60000);
  const [dataSet, setDataSet] = useState({
    labels: ["9 AM", "10 AM", "11 AM"],
    datasets: [
      {
        type: "line",
        label: "Current Chart",
        borderColor: primary.complete,
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
            size: 15,
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
        barThickness: 45,
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
    getProductData();
  }, [currentHour]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentHour(new Date().getHours());
      getProductData();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [currentHour]);

  useEffect(() => {
    let interval = 0;
    clearInterval(interval);
    interval = setInterval(() => {
      setDataSet((prevData) => {
        let time = new Date().toLocaleTimeString().split(":");
        let temp = `${time[0] % 12 || 12}:${time[1]}:${time[2]} ${
          time[0] >= 12 ? "PM" : "AM"
        }`;
        const newLabels = [...prevData.labels, temp];
        let randomValue = Math.floor(Math.random() * 5);
        const newLineData = [...prevData.datasets[0].data, randomValue];
        const newBarData = [...prevData.datasets[1].data];
        return {
          labels: newLabels,
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
    }, intervals);

    return () => clearInterval(interval);
  }, [intervals]);

  const getProductData = async () => {
    try {
      const response = await ENV.get(`getLastThreeHour?line=L1`);
      const result = response.data.data;

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

  const options = {
    animation: {
      duration: 1600,
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        stacked: true,
      },
      y: {
        suggestedMax: 140,
        ticks: {
          stepSize: 20,
        },
        stacked: true,
        beginAtZero: true,
      },
    },
    plugins: {
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: "x",
      },
      tooltip: {
        enabled: true,
        mode: "nearest", // Show tooltip for the nearest item
        intersect: true, // Ensure tooltip shows only for the intersected item
        callbacks: {
          label: function (tooltipItem) {
            let label = tooltipItem.label;
            if (label) {
              label += ": ";
            }
            label += tooltipItem.raw;
            return label;
          },
        },
        displayColors: false, // Disable the color box in tooltips
      },
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  return (
    <>
      <AppHeader />
      <div style={{ width: "1300px", height: "1100px" }}>
        <RadioBtn handleEvent={handleInterval} />
        <Chart type="bar" options={options} data={dataSet} />
      </div>
    </>
  );
}
