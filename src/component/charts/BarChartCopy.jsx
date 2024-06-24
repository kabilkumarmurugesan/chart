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
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import "chartjs-plugin-annotation";
import "../../asset/css/BarChartCopy.css";
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

const BarChartCopy = ({
  categories,
  lastBarValue,
  handleSlidechage,
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
  const [seriesLable, setSeriesLable] = useState();
  const tooltipRef = useRef(null);

  useEffect(() => {
    setCategories(categories);
  }, [categories]);

  useEffect(() => {
    let temp = [];
    let emt = [];
    let terget = [];
    let seriesLables = {};
    response &&
      response.updatedData.map((item) => {
        temp.push(item.y);
        seriesLables[item.x] = item.product_id;
        item.target && terget.push(parseInt(item.target));
        emt.push(0);
      });

    let valuran = lastBarValue.timeRange;

    let indeOdf = categoriesList.indexOf(valuran);
    indeOdf > 0 && setBlinkingIndex(indeOdf);
    if (valuran) {
      emt[indeOdf] = 5;
      temp[indeOdf] = lastBarValue.totalCount;
    }
    setSeries(temp);
    setEmtSeries(emt);
    setSeriesLable(seriesLables);

    const blinkInterval = setInterval(() => {
      setIsBlinking((prevState) => !prevState);
    }, 500);
    return () => {
      clearInterval(blinkInterval);
    };
  }, [response, ShowShiftDate, lastBarValue, ShowShift, shiftHours]);

  const handleButtonClick = (index) => {
    setVisibleQRCodeIndex((prevIndex) => (prevIndex === index ? null : index));
    getUpdateData();
    id !== "single" && handleSlidechage();
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
      if (value < targetList / 3) return primary.incomplete;
      if (value < targetList / 2) return primary.pending;
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
              content: [`Target: ${Math.round(targetList)}`], // Specify the label text
              enabled: true,
              position: "start", // Change to 'start' or 'center'
              backgroundColor: "#241773",
              yAdjust: -15,
              xAdjust: 0,
            },
            onEnter: (e) => showTooltip(e, `Target: ${Math.round(targetList)}`),
            onLeave: hideTooltip,
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
          // height: id === 'single' ? '0vh' : '45vh',
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
                    visibleQRCodeIndex === index + 5
                      ? "#4d5a81"
                      : "rgb(220, 223, 224)",
                  width: "10px",
                  height: "5px",
                }}
                onClick={() => handleButtonClick(index + 5)}
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
