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
  registerables,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import "chartjs-plugin-annotation";
import "../../asset/css/BarChartLive.css";
import { Card, useTheme } from "@mui/material";
import "chartjs-plugin-datalabels";
import ChartDataLabels from "chartjs-plugin-datalabels";
import CommonService from "../../utilities/CommonService";
import { useSelector } from "react-redux";

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

const BarChartLive = ({
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
  handleButtonClick,
  visibleQRCodeIndex,
  isCurrentShift,
  targetOne,
  shiftType,
}) => {
  const theme = useTheme();
  const { primary } = theme.palette;
  const targetList = useSelector((state) => state.shiftTarget.data);
  const [isBlinking, setIsBlinking] = useState(true);
  const [blinkingIndex, setBlinkingIndex] = useState(0);
  const [categoriesList, setCategories] = useState(categories);
  const [emtSeries, setEmtSeries] = useState([]);
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
          xValue: i === 0 ? i : timeT - xMax / 3,
          yValue: item.target + 8,
          content: [`${item.model}: ${Math.round(item.target)}`],
          borderColor: "#423595f0",
          backgroundColor: "#423595f0",
          padding: 3,
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

  // const handleButtonClick = (index) => {
  //   setVisibleQRCodeIndex((prevIndex) => (prevIndex === index ? null : index));
  //   // getUpdateData();
  //   id !== "single" && handleSlidechange();
  // };

  // const getUpdateData = async () => {
  //   const url = "http://localhost:8001/api/v1/general/1";
  //   const options = {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   fetch(url, options)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .catch((error) => {
  //       console.error("Error updating data:", error);
  //     });
  // };

  const getColor = (value, index) => {
    if (blinkingIndex === index) {
      return primary.complete;
    } else {
      if (value < targetOne / 3) {
        return primary.incomplete;
      }
      if (value < targetOne / 2) {
        return primary.pending;
      }
      return primary.complete;
    }
  };

  const data = {
    labels: categoriesList,
    datasets: [
      {
        label: "PRODUCT A",
        data: series,
        backgroundColor: primary.complete,
        borderColor: primary.complete,
        borderWidth: 1,
        barThickness: 34,
        datalabels: {
          display: (con) => {
            return con.dataset.data[con.dataIndex] > 0;
          },
          align: "center",
          color: "white",
          borderColor: series.map(getColor),
          borderWidth: 1,
          borderRadius: 2,
          padding: 4,
          backgroundColor: series.map(getColor),
          formatter: (value) => {
            // CommonService.convertIntoKiloPrefix(value)
            return value;
          },
          font: {
            weight: "bold",
            size: 15,
          },
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
        borderWidth: 1,
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
        suggestedMax: 140,
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
        annotations: annotationsList,
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
          {/* {JSON.stringify(response)} */}
          {response.map((label, index) => (
            <div key={index} style={{ padding: "5px" }}>
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
                    id
                  )
                }
              ></button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default BarChartLive;
