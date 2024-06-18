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
  shiftHours,
  setVisibleQRCodeIndex,
  visibleQRCodeIndex,
}) => {
  const theme = useTheme();
  const { primary } = theme.palette;
  const [isBlinking, setIsBlinking] = useState(true);
  const [blinkingIndex, setBlinkingIndex] = useState(0);

  const [categoriesList, setCategories] = useState(categories);
  const [targetList, setTargetList] = useState(90);
  const [emtSeries, setEmtSeries] = useState([]);
  const [series, setSeries] = useState([]);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    setCategories(categories);
  }, [categories]);

  useEffect(() => {
    let temp = [];
    let emt = [];
    let terget = [];
    response &&
      response.updatedData.map((item) => {
        temp.push(item.y);
        item.target && terget.push(parseInt(item.target));
        emt.push(0);
      });
    const sum = terget.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const average = sum / terget.length;
    let valuran = lastBarValue.timeRange;

    let indeOdf = categoriesList.indexOf(valuran === '0 - 1' ? '12 - 1':valuran);
    indeOdf > 0 && setBlinkingIndex(indeOdf)
    if (valuran) {
      emt[indeOdf] = 5;
      temp[indeOdf] = lastBarValue.totalCount;
    }
    !isNaN(average) && setTargetList(average);
    setSeries(temp);
    setEmtSeries(emt);
    const blinkInterval = setInterval(() => {
      setIsBlinking((prevState) => !prevState);
    }, 500);
    return () => {
      clearInterval(blinkInterval);
    };
  }, [response, lastBarValue, shiftHours]);

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
    if (index < series.lenght - 1) {
      if (value < targetList / 3) return primary.incomplete;
      if (value < targetList / 2) return primary.pending;
      return primary.complete;
    } else {
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
            xMax: 8, // End at the index of "10-11"
            borderColor: "#241773",
            borderWidth: 3,
            label: {
              content: "Target: 85", // This is where you specify the label text
              enabled: true,
              position: "start", // Change to 'start' or 'center'
              backgroundColor: "#241773",
              yAdjust: -15,
              xAdjust: -5,
            },
            onEnter: (e) => showTooltip(e, "Target: 85"),
            onLeave: hideTooltip,
          },
        },
      },
    },
  };

  return (
    <Card className="mb-4" style={{ position: "relative", padding: "20px" }}>
      <div
        id={id === "single" ? "single" : "chart"}
        style={{
          position: "relative",
          width: "100%",
          height: id === "single" ? "50vh" : "45vh",
        }}
      >
        <Bar
          data={data}
          options={options}
          style={{ width: "100%", height: "300px" }}
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
              {/* {visibleQRCodeIndex === index ? (
                <QRCodeCanvas
                  value={
                    "MES~LEMES MM~S0V MT~11T3 MO~L9N023103009 SN~PG03MQD5 INS~ ID~1S11T3S0V900PG03MQD5"
                  }
                  size={50}
                />
              ) : ( */}
              <button
                className="btn-one"
                style={{
                  background:
                    visibleQRCodeIndex === (index + 5)
                      ? "#4d5a81"
                      : "rgb(220, 223, 224)",
                  width: "10px",
                  height: "5px",
                }}
                onClick={() => handleButtonClick(index + 5)}
              ></button>
              {/* )} */}
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
