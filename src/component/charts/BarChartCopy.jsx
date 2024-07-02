import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import "chartjs-plugin-annotation";
import "../../asset/css/BarChartCopy.css";
import { Card, useTheme } from "@mui/material";
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
ChartJS.register(...registerables);

const BarChartCopy = ({
  categories,
  lastBarValue,
  handleSlidechange,
  response,
  animations,
  id,
  height,
  shiftHours,
  ShowShift,
  ShowShiftDate,
  setVisibleQRCodeIndex,
  visibleQRCodeIndex,
  targetList,
  isCurrentShift,
  targetOne,
}) => {
  const theme = useTheme();
  const { primary } = theme.palette;
  const [isBlinking, setIsBlinking] = useState(true);
  const [blinkingIndex, setBlinkingIndex] = useState(0);
  const [categoriesList, setCategories] = useState(categories);
  const [emtSeries, setEmtSeries] = useState([]);
  const [series, setSeries] = useState([]);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [seriesLabel, setSeriesLabel] = useState({});
  const tooltipRef = useRef(null);

  useEffect(() => {
    setCategories(categories);
  }, [categories]);

  useEffect(() => {
    let temp = [];
    let emt = [];
    let seriesLabels = {};
    response &&
      response.forEach((item) => {
        temp.push(item.y !== "-" ? item.y : 0);
        seriesLabels[item.x] = item.product_id;
        emt.push(0);
      });

    let valuran = lastBarValue.timeRange;
    if (valuran) {
      let indexOf = categoriesList.indexOf(valuran);
      setBlinkingIndex(indexOf);
      emt[indexOf] = 5;
      temp[indexOf] = lastBarValue.totalCount;
    }
    setSeries(() => temp);
    setEmtSeries(emt);
    setSeriesLabel(seriesLabels);

    const blinkInterval = setInterval(() => {
      setIsBlinking((prevState) => !prevState);
    }, 500);
    return () => {
      clearInterval(blinkInterval);
    };
  }, [
    response,
    ShowShiftDate,
    lastBarValue.timeRange,
    lastBarValue.totalCount,
    ShowShift,
    categoriesList,
    shiftHours,
  ]);

  const handleButtonClick = (index) => {
    setVisibleQRCodeIndex((prevIndex) => (prevIndex === index ? null : index));
    getUpdateData();
    id !== "single" && handleSlidechange();
  };

  const getUpdateData = async () => {
    const url = "http://localhost:8001/api/v1/general/1";
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then((updatedData) => {
        console.log("Data updated:", updatedData);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

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

  const getColor = (value, index) => {
    if (blinkingIndex === index) {
      return primary.complete;
    } else {
      if (value < targetOne / 3) return primary.incomplete;
      if (value < targetOne / 2) return primary.pending;
      return primary.complete;
    }
  };

  const data = {
    labels: categoriesList,
    datasets: [
      {
        label: "PRODUCT A",
        data: series,
        backgroundColor: series.map(getColor),
        borderColor: series.map(getColor),
        borderWidth: 35,
        barThickness: 34,
        datalabels: {
          display: true,
          align: "center",
          color: "white",
        },
      },
      {
        label: "PRODUCT B",
        data: emtSeries,
        backgroundColor: (context) => {
          const index = context.dataIndex;
          return index === blinkingIndex && isBlinking
            ? "#fff"
            : primary.complete;
        },
        borderColor: (context) => {
          const index = context.dataIndex;
          return index === blinkingIndex && isBlinking
            ? "#fff"
            : primary.complete;
        },
        borderWidth: 35,
        barThickness: 34,
        datalabels: {
          display: false,
        },
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
        stacked: true,
      },
      y: {
        ticks: {
          stepSize: 20, // Set the step size for the y-axis labels and grid lines
        },
        stacked: true,
        beginAtZero: true,
      },
    },
    animations: animations,
    plugins: {
      tooltip: {
        enabled: true,
        mode: "nearest", // Show tooltip for the nearest item
        intersect: true, // Ensure tooltip shows only for the intersected item
        callbacks: {
          label: function (tooltipItem) {
            let label = seriesLabel[tooltipItem.label];
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
          label1: {
            type: "label",
            xValue: categories.length / 2 - 3,
            yValue: targetOne + 5,
            content: [`Target 1: ${Math.round(targetOne)}`],
          },
          line1: {
            type: "line",
            yMin: targetOne,
            yMax: targetOne,
            xMin: -1, // Start from the beginning of the chart
            xMax: categories.length / 2 - 1, // End at the last index of the chart
            borderColor: "#241773",
            borderWidth: 4,
            label: {
              content: [`Target: ${Math.round(targetOne)}`], // Specify the label text
              enabled: true,
              position: "start", // Change to 'start', 'center', or 'end'
              backgroundColor: "#241773",
              yAdjust: -15,
              xAdjust: 0,
              padding: 6,
              font: {
                size: 14,
                weight: "bold",
                family: "Arial",
              },
            },
            onEnter: (e) => showTooltip(e, `Target: ${Math.round(targetOne)}`),
            onLeave: hideTooltip,
            datalabels: {
              align: "end", // or any other alignment
              anchor: "end", // or any other anchor position
              color: "#000", // specify the color
              formatter: (value, context) => {
                return `Target: ${Math.round(targetOne)}`; // custom label text
              },
            },
          },
          label2: {
            type: "label",
            xValue: categories.length / 2,
            yValue: targetOne - 5,
            content: [`Target 2: ${Math.round(targetOne)}`],
          },
          line2: {
            type: "line",
            yMin: targetOne - 10,
            yMax: targetOne - 10,
            xMin: categories.length / 2 - 1, // Start from the beginning of the chart
            xMax: categories.length, // End at the last index of the chart
            borderColor: "#241773",
            borderWidth: 4,
            label: {
              content: [`Target: ${Math.round(targetOne)}`], // Specify the label text
              enabled: true,
              position: "start", // Change to 'start', 'center', or 'end'
              backgroundColor: "#241773",
              yAdjust: -15,
              xAdjust: 0,
              padding: 6,
              font: {
                size: 14,
                weight: "bold",
                family: "Arial",
              },
            },
            onEnter: (e) => showTooltip(e, `Target: ${Math.round(targetOne)}`),
            onLeave: hideTooltip,
            datalabels: {
              align: "end", // or any other alignment
              anchor: "end", // or any other anchor position
              color: "#000", // specify the color
              formatter: (value, context) => {
                return `Target: ${Math.round(targetOne)}`; // custom label text
              },
            },
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Card className="mb-4" style={{ position: "relative", padding: "20px" }}>
      <div
        id={id === "single" ? "single" : "chart"}
        style={{
          position: "relative",
          width: "100%",
          height: height,
        }}
      >
        {data && (
          <Bar
            data={data}
            options={options}
            style={{ width: "100%", height: "100%" }}
          />
        )}
        <div
          className="qr-code-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {data.labels.map((label, index) => (
            <div key={index} style={{ padding: "5px" }}>
              <button
                className="btn-one"
                style={{
                  background:
                    visibleQRCodeIndex === index + (isCurrentShift ? 1 : 12)
                      ? "#4d5a81"
                      : "rgb(220, 223, 224)",
                  width: "10px",
                  height: "5px",
                }}
                onClick={() =>
                  handleButtonClick(index + (isCurrentShift ? 1 : 12))
                }
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
    </Card>
  );
};

export default BarChartCopy;
