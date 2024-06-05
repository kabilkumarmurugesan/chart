import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { QRCodeCanvas } from "qrcode.react";
import { socket } from "../socket";
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

const BarChartCopy = (props) => {
  const theme = useTheme();
  const { primary } = theme.palette;
  const [isBlinking, setIsBlinking] = useState(true);
  const [lastBarValue, setLastBarValue] = useState(20); // Initial value for the last bar of PRODUCT A
  const [categories, setCategories] = useState([
    "09-10",
    "10-11",
    "11-12",
    "12-01",
    "01-02",
    "02-03",
    "03-04",
  ]);

  const [series, setSeries] = useState([75, 80, 90, 95, 95, 95, lastBarValue]);
  const [visibleQRCodeIndex, setVisibleQRCodeIndex] = useState(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    socket.on("dataUpdate", (data) => {
      let Tcategories = [...categories];
      let temp = Object.keys(data);
      let dataT = data[temp[0]];
      if (temp[0] !== Tcategories[Tcategories.length - 1]) {
        Tcategories.push(temp[0]);
        setCategories(Tcategories);
      }
      setLastBarValue(dataT[0].total_count);
    });

    const blinkInterval = setInterval(() => {
      setIsBlinking((prevState) => !prevState);
    }, 1000);

    // Increase the last bar value for PRODUCT A every 10 seconds
    const increaseValuesInterval = setInterval(() => {
      setLastBarValue((prev) => prev + 1); // Increase PRODUCT A's last bar value
    }, 10000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(increaseValuesInterval);
    };
  }, [categories]);

  useEffect(() => {
    setSeries([75, 80, 90, 95, 95, 95, lastBarValue]);
  }, [lastBarValue]);

  const handleButtonClick = (index) => {
    setVisibleQRCodeIndex((prevIndex) => (prevIndex === index ? null : index));
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
      {
        label: "PRODUCT B",
        data: [0, 0, 0, 0, 0, 0, 10],
        backgroundColor: (context) => {
          const index = context.dataIndex;
          return index === 6 && isBlinking
            ? "rgba(255, 127, 14, 0.6)"
            : "#0000000a";
        },
        borderColor: (context) => {
          const index = context.dataIndex;
          return index === 6 && isBlinking
            ? "rgba(255, 127, 14, 0.6)"
            : "#0000000a";
        },
        borderWidth: 20,
        barThickness: 24,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
    animations: props.animations,
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
  };

  return (
    <Card className="mb-4" style={{ position: "relative", padding: "20px" }}>
      <div id="chart">
        <Bar
          data={data}
          options={options}
          height={90}
          style={{ width: "100%" }}
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
              {visibleQRCodeIndex === index ? (
                <QRCodeCanvas
                  value={
                    "MES~LEMES MM~S0V MT~11T3 MO~L9N023103009 SN~PG03MQD5 INS~ ID~1S11T3S0V900PG03MQD5"
                  }
                  size={50}
                />
              ) : (
                <button
                  className="btn-orange"
                  style={{ width: "50px" }}
                  onClick={() => handleButtonClick(index)}
                >
                  QR
                </button>
              )}
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
