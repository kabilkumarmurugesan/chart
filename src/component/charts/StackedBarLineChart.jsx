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
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentHrs } from "../../api/Socket";

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
  const currentHrs = useSelector((state) => state.currentHrs);
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
    dispatch(fetchCurrentHrs({ duration: intervals / 1000 }));
  }, [intervals]);

  useEffect(() => {
    let data = currentHrs.data;
    if (data[props.line] && data[props.line].length > 0) {
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
    }
  }, [currentHrs]);

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
            let label = tooltipItem.label;
            if (label) {
              label += ": ";
            }
            label += tooltipItem.raw;
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

  const handleZoomIn = () => {
    const chart = chartRef.current;
    if (chart) {
      chart.zoom(1.2); // Zoom in by a factor of 1.2
    }
  };

  const handleZoomOut = () => {
    const chart = chartRef.current;
    if (chart) {
      chart.zoom(0.8); // Zoom out by a factor of 0.8
    }
  };

  const handleResetZoom = () => {
    const chart = chartRef.current;
    if (chart) {
      chart.resetZoom(); // Reset zoom to the initial state
    }
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
          <Chart type="bar" ref={chartRef} options={options} data={dataSet} />
          <div>
            <button onClick={handleZoomIn}>Zoom In</button>
            <button onClick={handleZoomOut}>Zoom Out</button>
            <button onClick={handleResetZoom}>Reset Zoom</button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default StackedBarLineChart;
