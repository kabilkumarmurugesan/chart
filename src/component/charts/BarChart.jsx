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
import CommonService from "../../utilities/CommonService";

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
  targetOne,
}) => {
  const theme = useTheme();
  const { primary } = theme.palette;
  const [series, setSeries] = useState([]);
  const [seriesLabel, setSeriesLabel] = useState({});
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);
  const [annotationsList, setAnnotationsList] = useState({
    label1: {
      type: "label",
      xValue: categories.length / 2,
      yValue: targetOne + 5,
      content: [`Target: ${Math.round(targetOne)}`],
    },
    line1: {
      type: "line",
      yMin: targetOne,
      yMax: targetOne,
      xMin: -1,
      xMax: categories.length,
      borderColor: "#241773",
      borderWidth: 4,
      label: {
        content: `Target: ${Math.round(targetOne)}`, // Specify the label text
        enabled: true,
        position: "start", // Change to 'start' or 'center'
        backgroundColor: "#241773",
        yAdjust: -15,
        xAdjust: -5,
      },
    },
  });

  useEffect(() => {
    let temp = {};
    let annotations = {};
    if (targetList) {
      targetList.map((item, i) => {
        temp[`model_${i}`] = item.model;
        temp[`target_${i}`] = item.target;
        let timeT = CommonService.timeDifferenceInHours(item.time);
        temp[`time_${i}`] = timeT;
        let xMin = i === 0 ? i - 1 : temp[`time_${i - 1}`];
        let xMax = i === 0 ? timeT : temp[`time_${i - 1}`] + timeT;

        annotations[`label${i}`] = {
          type: "label",
          xValue: categories.length / timeT,
          yValue: item.target + 3,
          content: [`${item.model}: ${Math.round(item.target)}`],
        };

        annotations[`line${i}`] = {
          type: "line",
          yMin: item.target,
          yMax: item.target,
          xMin: xMin,
          xMax: xMax,
          borderColor: "#241773",
          borderWidth: 4,
          label: {
            content: `${item.model}: ${Math.round(item.target)}`, // Specify the label text
            enabled: true,
            position: "start", // Change to 'start' or 'center'
            backgroundColor: "#241773",
            yAdjust: -15,
            xAdjust: -5,
            font: {
              size: 22,
            },
          },
          onEnter: (e) =>
            showTooltip(e, `${item.model}: ${Math.round(item.target)}`),
          onLeave: hideTooltip,
        };
      });

      setAnnotationsList(annotations);
    }
  }, [targetList]);

  useEffect(() => {
    const temp = [];
    const seriesLabels = {};

    if (response !== undefined) {
      response.forEach((item) => {
        temp.push(item.y !== "-" ? item.y : 0);
        seriesLabels[item.x] = item.product_id;
      });
    }

    setSeries(temp);
    setSeriesLabel(seriesLabels);
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
    if (value < targetOne / 3) return primary.incomplete;
    if (value < targetOne / 2) return primary.pending;
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
        enabled: true,
        mode: "nearest",
        intersect: true,
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
        displayColors: false,
      },
      legend: {
        display: false,
      },
      annotation: {
        annotations: annotationsList,
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
          stepSize: 20,
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
          }}
        >
          {data.labels.map((label, index) => (
            <div key={index} style={{ padding: "10px" }}>
              <button
                className="btn-one"
                style={{
                  background:
                    visibleQRCodeIndex === index
                      ? "#4d5a81"
                      : "rgb(220, 223, 224)",
                  width: "10px",
                  height: "5px",
                }}
                onClick={() => handleButtonClick(index)}
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
