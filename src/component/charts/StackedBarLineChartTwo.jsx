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
import ENV from "../../utilities/ENV";
import AppHeader from "../Layout/AppHeader";
import { Card } from "@mui/material";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

export default function StackedBarLineChartTwo(props) {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  const [dataSet, setDataSet] = useState({
    labels: ["9 AM", "10 AM", "11 AM"],
    datasets: [
      {
        type: "line",
        label: "Current Chart",
        borderColor: "rgb(255, 99, 132)",
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

  const [intervals, setIntervals] = useState(15000);

  useEffect(() => {
    getProductData();
  }, [currentHour]);

  useEffect(() => {
    props.intervals && setIntervals(props.intervals);
  }, [props.intervals]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentHour(new Date().getHours());
    }, 60 * 60);

    return () => clearTimeout(timeout);
  }, [currentHour]);

  useEffect(() => {
    // const payload = { duration: 15 };
    //   socket.send(JSON.stringify(payload));
    const interval = setInterval(() => {
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
  }, []);

  const getProductData = async () => {
    try {
      const response = await ENV.get(`getLastThreeHour?line=L1`);
      const result = response.data.data;

      setDataSet((prevData) => {
        let initialLabel = [];
        const newLineData = [];
        const newBarData = [];

        result.forEach((res) => {
          let time = res.start_time.split(":");
          let temp = `${time[0] % 12 || 12} ${time[0] >= 12 ? "PM" : "AM"}`;
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

  const options = {
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
          stepSize: 20, // Set the step size for the y-axis labels and grid lines
        },
        stacked: true,
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: "nearest", // Show tooltip for the nearest item
        intersect: true, // Ensure tooltip shows only for the intersected item
        displayColors: false, // Disable the color box in tooltips
      },
      legend: {
        display: false, // Disable legend
      },
    },
    maintainAspectRatio: false,
  };

 console.log('dataSet,dataSet',dataSet.labels[0])

  return (
    <>
      {props.type === undefined && <AppHeader type={"head"} />}
      {props.type === "chart" ? (
        <Card
          className="mb-4"
          style={{ position: "relative", padding: "20px" }}
        >
          <div
            id="chart"
            style={{
              position: "relative",
              width: "100%",
              height: "40vh",
            }}
          >
            <Chart type="bar" options={options} data={dataSet} />
          </div>
        </Card>
      ) : (
        <Card style={{ position: "relative", height: "24vh", padding: "10px" }}>
          <Chart type="bar" options={options} data={dataSet} />
        </Card>
      )}
    </>
  );
}
