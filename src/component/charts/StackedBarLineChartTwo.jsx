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
import { socket } from "../../utilities/socket";

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
  const [dataSet, setDataSet] = useState(props.data);
  const [intervals, setIntervals] = useState(15000);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    props.intervals && setIntervals(props.intervals);
  }, [props.intervals]);

  useEffect(() => {
    const payload = { duration: intervals / 1000 };
    socket.send(JSON.stringify(payload));
    socket.on("getCurrentHour", (data) => {
      setDataSet((prevData) => {
        let newLabels = [...props.data.labels];
        let newBarData = [...props.data.datasets[1].data];
        let newLineData = [...props.data.datasets[1].data];
        let size = data.L1.length;
        data.L1.forEach((item, i) => {
          let time = item.interval.split(":");
          let temp = `${time[0] % 12 || 12}:${time[1]}:${time[2]} ${
            time[0] >= 12 ? "PM" : "AM"
          }`;
          let lineData = item.count;
          newLabels.push(temp);
          newLineData.push(lineData);
        });
        setLabels(() => newLabels);
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
    });
  }, [intervals, props.data]);

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
