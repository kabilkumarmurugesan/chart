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
  const [currentHrs, setcurrentHrs] = useState();

  const [dataSet, setDataSet] = useState(props.data);
  const [annotationsList, setAnnotationsList] = useState({
    label1: {
      type: "label",
      xValue: 2,
      yValue: 5,
      content: [`Time:  ${props.time}`],
    },
  });

  useEffect(() => {
    const handleNewData = (data) => {
      setcurrentHrs(() => data.L1);
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
      updateChartData(currentHrs);
      chartRef.current.update();
    }
  }, [currentHrs]);

  const updateChartData = (data) => {
    const chart = chartRef.current;
    if (chart && data) {
      setAnnotationsList((prevData) => {
        return {
          ...prevData,
          label1: {
            type: "label",
            xValue:
              dataSet.datasets[0].data.length -
              dataSet.datasets[0].data.length / 15.6,
            yValue: data.count / 2,
            content: [`Time:  ${props.time}`],
          },
          label2: {
            type: "label",
            xValue: dataSet.labels.length - dataSet.labels.length / 15.6,
            yValue: data.count / 4,
            content: [`Cumulative O/P:  ${data.count}`],
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

        newLabels.push(time);
        newLineData.push(data.count);

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
          {/* <div>
            <button onClick={handleZoomIn}>Zoom In</button>
            <button onClick={handleZoomOut}>Zoom Out</button>
            <button onClick={handleResetZoom}>Reset Zoom</button>
          </div> */}
        </div>
      </Card>
    </>
  );
};

export default StackedBarLineChart;
