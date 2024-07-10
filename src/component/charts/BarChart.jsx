import React, { useState, useEffect } from "react";
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
  shiftType,
  targetList,
  targetOne,
  handleButtonClick,
}) => {
  const theme = useTheme();
  const { primary } = theme.palette;
  const [series, setSeries] = useState([]);
  const [seriesLabel, setSeriesLabel] = useState({});
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
    let targetListMap =
      shiftType === "1st" || shiftType === undefined
        ? targetList
        : targetList.slice(1);
    let preT = 0;
    if (targetListMap) {
      targetListMap.forEach((item, i) => {
        temp[`model_${i}`] = item.model;
        temp[`target_${i}`] = item.target;
        let timeT = CommonService.timeDifferenceInHours(item.time) + 0.5;
        temp[`time_${i}`] = timeT;
        let xMin = i === 0 ? i - 1 : i > 1 ? preT : temp[`time_${i - 1}`];
        let xMax = i === 0 ? timeT : preT + timeT;
        preT = xMax;
        annotations[`label${i}`] = {
          type: "label",
          xValue: i === 0 ? timeT - 3 : timeT - timeT / 2,
          yValue: item.target + 8,
          content: [`${item.model}: ${Math.round(item.target)}`],
          padding: 3,
          borderColor: "#423595f0",
          backgroundColor: "#423595f0",
          color: "#fff",
          font: {
            weight: "bold",
            size: 15,
          },
        };

        annotations[`line${i}`] = {
          type: "line",
          yMin: item.target,
          yMax: item.target,
          xMin: xMin,
          xMax: xMax,
          borderColor: "#241773",
          borderWidth: 4,
        };
      });

      setAnnotationsList(annotations);
    }
  }, [targetList, shiftType]);

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
        backgroundColor: primary.complete,
        borderColor: primary.complete,
        borderWidth: 1, // Reduced borderWidth to avoid white line
        barThickness: 35,
        datalabels: {
          display: (con) => {
            return con.dataset.data[con.dataIndex] > 0;
          },
          align: "center",
          color: "white",
          borderColor: series.map(getColor),
          borderWidth: 1,
          borderRadius: 2,
          backgroundColor: series.map(getColor),
          formatter: (value) => {
            return value;
          },
          font: {
            weight: "bold",
            size: 15,
          },
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
        suggestedMax: 140,
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
          {response.map((label, index) => (
            <div key={index} style={{ padding: "10px" }}>
              <button
                className="btn-one"
                style={{
                  background:
                    visibleQRCodeIndex === label.id
                      ? "#4d5a81"
                      : "rgb(220, 223, 224)",
                  width: "10px",
                  height: "5px",
                }}
                onClick={() =>
                  handleButtonClick(
                    visibleQRCodeIndex === label.id ? null : label.id,
                    "charts"
                  )
                }
              ></button>
            </div>
          ))}
        </div>
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
