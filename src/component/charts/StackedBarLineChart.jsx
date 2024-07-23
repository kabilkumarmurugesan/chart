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
import { Card } from "@mui/material";
import { socket } from "../../utilities/socket";
import AppHeader from "../Layout/AppHeader";
import zoomPlugin from "chartjs-plugin-zoom";

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

const StackedBarLineChart = (props) => {
  const { data, intervals, type } = props;
  const [dataSet, setDataSet] = useState(data);
  const [annotationsList, setAnnotationsList] = useState({
    label1: {
      type: "label",
      xValue: 2,
      yValue: 5,
      content: [`Time:  ${props.time}`],
    },
  });

  useEffect(() => {
    setDataSet(data);
  }, [data]);

  useEffect(() => {
    const payload = { duration: intervals / 1000 };
    socket.send(JSON.stringify(payload));
    socket.on("getCurrentHour", (data) => {
      setAnnotationsList((prevData) => {
        return {
          ...prevData,
          label1: {
            type: "label",
            xValue: data.L1.length - data.L1.length / 15.6,
            yValue: data.L1[data.L1.length - 1].count / 2,
            content: [`Time:  ${props.time}`],
          },
          label2: {
            type: "label",
            xValue: data.L1.length - data.L1.length / 15.6,
            yValue: data.L1[data.L1.length - 1].count / 4,
            content: [`Cumulative O/P:  ${data.L1[data.L1.length - 1].count}`],
          },
        };
      });
      setDataSet((prevData) => {
        const newLabels = [...props.data.labels];
        const newBarData = [...props.data.datasets[1].data];
        const newLineData = [...props.data.datasets[1].data];
        data[props.line].forEach((item) => {
          const [hours, minutes, seconds] = item.interval.split(":");
          const time = `${hours % 12 || 12}:${minutes}:${seconds} ${
            hours >= 12 ? "PM" : "AM"
          }`;
          newLabels.push(time);
          newLineData.push(item.count);
        });

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
    animation: {
      duration: 2500,
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
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
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
      annotation: {
        annotations: annotationsList,
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
      {type === undefined && <AppHeader type="head" />}
      <Card
        className="mb-4"
        style={{
          position: "relative",
          padding: type === "chart" ? "20px" : "10px",
          height: type === "chart" ? "40vh" : "24vh",
        }}
      >
        <div
          id="chart"
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          <Chart type="bar" options={options} data={dataSet} />
        </div>
      </Card>
    </>
  );
};

export default StackedBarLineChart;
