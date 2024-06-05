import React, { useState, useRef } from "react";
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
import annotationPlugin from "chartjs-plugin-annotation";
import "chartjs-plugin-annotation";
import "./BarChartCopy.css";
import { Card, useTheme } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const BarChart = (props) => {
  const theme = useTheme(); // Initial value for the last bar of PRODUCT A
  const { primary } = theme.palette;
  const [categories, setCategories] = useState([
    "09-10",
    "10-11",
    "11-12",
    "12-01",
    "01-02",
    "02-03",
    "03-04",
  ]);

  const [series, setSeries] = useState([75, 80, 90, 95, 95, 95, 90]);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);

  const showTooltip = (event, content) => {
    const rect = event.chart.canvas.getBoundingClientRect();
    setTooltipContent(content);
    setTooltipPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
    setTooltipVisible(true);
  };

  const hideTooltip = () => {
    setTooltipVisible(false);
  };

  const getColor = (value) => {
    if (value < 30) return primary.incomplete;
    if (value < 80) return primary.pending;
    return primary.complete;
  };

  const data = {
    labels: categories,
    datasets: [
      {
        label: "PRODUCT A",
        data: series,
        backgroundColor: series.map(getColor),
        borderColor: series.map(getColor),
        borderWidth: 20,
        barThickness: 24,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Disable legend
      },
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: 85,
            yMax: 85,
            xMin: -1, // Start from the beginning of the chart
            xMax: 2, // End at the index of "10-11"
            borderColor: "rgb(4, 142, 254)",
            borderWidth: 3,
            label: {
              content: "Target: 85", // This is where you specify the label text
              enabled: true,
              position: "start", // Change to 'start' or 'center'
              backgroundColor: "rgb(4, 142, 254)",
              yAdjust: -15,
              xAdjust: -5,
            },
            onEnter: (e) => showTooltip(e, "Target: 85"),
            onLeave: hideTooltip,
          },
          line2: {
            type: "line",
            yMin: 100,
            yMax: 100,
            xMin: 2, // Start at the index of "11-12"
            xMax: 6, // End at the index of "03-04"
            borderColor: "rgb(30, 239, 44)",
            borderWidth: 7,
            label: {
              content: "Target: 100", // This is where you specify the label text
              enabled: true,
              position: "start", // Change to 'start' or 'center'
              backgroundColor: "rgb(30, 239, 44)",
              yAdjust: -15,
              xAdjust: -5,
            },
            onEnter: (e) => showTooltip(e, "Target: 100"),
            onLeave: hideTooltip,
          },
        },
      },
    },
    animations: props.animations,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <Card className="mb-4" style={{ position: "relative", padding: "20px" }}>
      <div
        id="chart"
        style={{ position: "relative", width: "100%", height: "300px" }}
      >
        <Bar
          data={data}
          options={options}
          style={{ width: "100%", height: "100%" }}
        />
        {tooltipVisible && (
          <div
            ref={tooltipRef}
            className="custom-tooltip"
            style={{
              position: "absolute",
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "#fff",
              padding: "5px",
              borderRadius: "5px",
              pointerEvents: "none",
              transform: "translate(-50%, -50%)",
            }}
          >
            {tooltipContent}
          </div>
        )}
      </div>
      <div
        style={{
          padding: "10px",
        }}
      ></div>
    </Card>
  );
};

export default BarChart;
