import React, { useEffect, useRef, useState } from "react";
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
import zoomPlugin from "chartjs-plugin-zoom"; // Import the zoom plugin
import { Card } from "@mui/material";
import AppHeader from "../Layout/AppHeader";
import { socket } from "../../utilities/socket";
import { fetchLastHour, fetchLastTwoHour } from "../../api/ProductionData";
import { useDispatch } from "react-redux";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  zoomPlugin // Register the zoom plugin
);

const StackedBarLineChart = (props) => {
  const chartRef = useRef(null);
  const dispatch = useDispatch();

  const [currentHrs, setcurrentHrs] = useState();
  const [dataSet, setDataSet] = useState(props.data);
  const [annotationsList, setAnnotationsList] = useState({
    label1: {
      type: "label",
      xValue: props.data.labels.length - 2,
      yValue: 40,
      content: [`Time:  ${props.time}`],
    },
    label2: {
      type: "label",
      xValue: props.data.labels.length - 2, // Position at the last X index
      yValue: 30, // Position at the bottom of the Y-axis
      content: [
        `Cumulative O/P:  ${
          props.data.datasets[0].data[props.data.datasets[0].data.length - 1]
        }`,
      ],
    },
  });

  useEffect(() => {
    const handleNewData = (data) => {
      const [hours, minutes, seconds] = data.L1.lastEntryTime.split(":");
      if (minutes === "59") {
        dispatch(fetchLastTwoHour({ Line: "L1" }));
        dispatch(fetchLastHour({ duration: props.intervals / 100 }));
      } else {
        setcurrentHrs(() => data.L1);
      }
    };

    socket.send(JSON.stringify({ duration: props.intervals / 1000 }));
    socket.on("getCurrentHour", handleNewData);

    // Cleanup listener on component unmount
    return () => {
      socket.off("getCurrentHour", handleNewData);
    };
  }, [props.intervals, props.data]);

  useEffect(() => {
    if (currentHrs && currentHrs.count) {
      setDataSet((prevData) => props.data);
      updateChartData(currentHrs);
      chartRef.current.update();
    }
  }, [currentHrs]);

  const updateChartData = (data) => {
    const chart = chartRef.current;
    if (chart && data) {
      setAnnotationsList((prevData) => {
        const lastXIndex = dataSet.labels.length;

        return {
          ...prevData,
          label1: {
            type: "label",
            xValue: lastXIndex,
            yValue: 40,
            content: [`Time:  ${props.time}`],
            position: "end",
            align: "end",
            xAdjust: -20,
            yAdjust: 20,
          },
          label2: {
            type: "label",
            xValue: lastXIndex, // Position at the last X index
            yValue: 40, // Position at the bottom of the Y-axis
            content: [`Cumulative O/P:  ${data.count}`],
            position: "end",
            align: "end",
            xAdjust: -20,
            yAdjust: 40,
          },
        };
      });

      setDataSet((prevData) => {
        const newLabels = [...prevData.labels];
        const newBarData = [...prevData.datasets[1].data];
        const newLineData = [...prevData.datasets[0].data];

        const [hours, minutes, seconds] = data.lastEntryTime.split(":");
        const time = `${hours % 12 || 12}:${minutes}:${seconds} ${
          hours >= 12 ? "PM" : "AM"
        }`;
        if (!newLabels.includes(time)) {
          newLabels.push(time);
          newLineData.push(data.count);
        }
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

      chart.update(); // Ensure the chart updates with the new data
    }
  };

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
        pan: {
          enabled: true,
          mode: "x",
        },
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
        mode: "nearest",
        intersect: true,
        callbacks: {
          label: function (tooltipItem) {
            let label = tooltipItem.label || "";
            label += `: ${tooltipItem.raw}`;
            return label;
          },
        },
        displayColors: false,
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
      {props.type === undefined && <AppHeader type="head" />}
      <Card
        className="mb-4"
        style={{
          position: "relative",
          padding: props.type === "chart" ? "20px" : "10px",
          height: props.type === "chart" ? "40vh" : "24vh",
        }}
      >
        <div
          id="chart"
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          <Chart type="bar" ref={chartRef} options={options} data={dataSet} />
        </div>
      </Card>
    </>
  );
};

export default StackedBarLineChart;
