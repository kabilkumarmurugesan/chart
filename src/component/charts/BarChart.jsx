import React, { useState, useRef, useEffect } from "react";
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
import { Card, useTheme } from "@mui/material";
import "../../asset/css/BarChartCopy.css";
import "chartjs-plugin-datalabels";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
  ChartDataLabels
);

const BarChart = ({
  categories,
  animations,
  visibleQRCodeIndex,
  setVisibleQRCodeIndex,
  handleSlidechange,
  response,
  height,
  targetList,
}) => {
  const theme = useTheme(); // Initial value for the last bar of PRODUCT A
  const { primary } = theme.palette;
  const [series, setSeries] = useState([]);
  const [seriesLable, setSeriesLable] = useState();
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    let temp = [];
    let seriesLables = {};
    let terget = [];
    if (response) {
      response.forEach((item) => {
        temp.push(item.y);
        seriesLables[item.x] = item.product_id;
        item.target && terget.push(parseInt(item.target));
      });
    }

    setSeries(temp);
    setSeriesLable(seriesLables);
  }, [response]);

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

  const handleButtonClick = (index) => {
    setVisibleQRCodeIndex((prevIndex) => (prevIndex === index ? null : index));
    handleSlidechange();
  };

  const getColor = (value) => {
    if (value < targetList / 3) return primary.incomplete;
    if (value < targetList / 2) return primary.pending;
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
        borderWidth: 34,
        barThickness: 35,
        datalabels: {
          display: true,
          align: "center",
          color: "white",
        },
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true, // Enable tooltips
        mode: "nearest", // Show tooltip for the nearest item
        intersect: true, // Ensure tooltip shows only for the intersected item
        callbacks: {
          label: function (tooltipItem) {
            // Customize the tooltip label
            let label = seriesLable[tooltipItem.label];
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
        display: false, // Disable legend
      },
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: targetList,
            yMax: targetList,
            xMin: -1, // Start from the beginning of the chart
            xMax: categories.length - 1, // End at the last index of the chart
            borderColor: "#241773",
            borderWidth: 4,
            label: {
              content: `Target: ${Math.round(targetList)}`, // Specify the label text
              enabled: true,
              position: "start", // Change to 'start' or 'center'
              backgroundColor: "#241773",
              yAdjust: -15,
              xAdjust: -5,
            },
            onEnter: (e) => showTooltip(e, `Target: ${Math.round(targetList)}`),
            onLeave: hideTooltip,
          },
        },
      },
    },
    animations: animations,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          stepSize: 20, // Set the step size for the y-axis labels and grid lines
        },
      },
    },
  };

  return (
    <Card className="mb-4" style={{ position: "relative", padding: "20px" }}>
      <div
        id="charts"
        style={{ position: "relative", width: "100%", height: height }}
      >
        <Bar
          data={data}
          options={options}
          style={{ width: "100%", height: "100%" }}
        />
        <div
          className="qr-code-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            // paddingTop: "15px",
          }}
        >
          {data.labels.map((label, index) => (
            <div key={index} style={{ padding: "10px" }}>
              <button
                className="btn-one"
                style={{
                  background:
                    visibleQRCodeIndex === index + 3
                      ? "#4d5a81"
                      : "rgb(220, 223, 224)",
                  width: "10px",
                  height: "5px",
                }}
                onClick={() => handleButtonClick(index + 3)}
              ></button>
            </div>
          ))}
        </div>
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
