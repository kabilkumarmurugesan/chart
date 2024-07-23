import React, { useEffect, useState } from "react";
import AppHeader from "../../component/Layout/AppHeader";
// import RadioBtn from "../../component/RadioBtn";
import { useTheme } from "@emotion/react";
import StackedBarLineChart from "../../component/charts/StackedBarLineChart";
import CommonService from "../../utilities/CommonService";
import ShiftHeader from "../../component/Shift/ShiftHeader";
import ENV from "../../utilities/ENV";

export default function LineCoverage() {
  const theme = useTheme();
  const { primary } = theme.palette;
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [todayDate, setTodayDate] = useState(
    CommonService.formatDate(new Date())
  );
  const [intervals, setIntervals] = useState(60000);
  const [dataSet, setDataSet] = useState({
    L1: {
      labels: ["9 AM"],
      datasets: [
        {
          type: "line",
          label: "Current Chart",
          borderColor: primary.complete,
          borderWidth: 2,
          fill: false,
          data: [10],
          datalabels: {
            display: (con) => {
              if (con.dataIndex < 2) {
                return false;
              } else {
                return con.dataset.data[con.dataIndex] > 0;
              }
            },
            align: "top",
            color: "white",
            backgroundColor: "rgb(77, 90, 129)",
            borderWidth: 1,
            borderRadius: 2,
            padding: 4,
            formatter: (value) => {
              return value;
            },
            font: {
              weight: "bold",
              size: 15,
            },
          },
        },
        {
          type: "bar",
          label: "Shift Chart",
          backgroundColor: "#3D860B",
          data: [10],
          borderColor: "white",
          borderWidth: 1, // Reduced borderWidth to avoid white line
          barThickness: 45,
          datalabels: {
            display: (con) => {
              return con.dataset.data[con.dataIndex] > 0;
            },
            align: "center",
            color: "white",
            borderWidth: 1,
            borderRadius: 2,
            backgroundColor: "rgb(75, 192, 192)",
            padding: 4,
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
    },
    L2: {
      labels: ["9 AM"],
      datasets: [
        {
          type: "line",
          label: "Current Chart",
          borderColor: primary.complete,
          borderWidth: 2,
          fill: false,
          data: [10],
          datalabels: {
            display: (con) => {
              if (con.dataIndex < 2) {
                return false;
              } else {
                return con.dataset.data[con.dataIndex] > 0;
              }
            },
            align: "top",
            color: "white",
            backgroundColor: "rgb(77, 90, 129)",
            borderWidth: 1,
            borderRadius: 2,
            padding: 4,
            formatter: (value) => {
              return value;
            },
            font: {
              weight: "bold",
              size: 15,
            },
          },
        },
        {
          type: "bar",
          label: "Shift Chart",
          backgroundColor: "#3D860B",
          data: [10],
          borderColor: "white",
          borderWidth: 1, // Reduced borderWidth to avoid white line
          barThickness: 45,
          datalabels: {
            display: (con) => {
              return con.dataset.data[con.dataIndex] > 0;
            },
            align: "center",
            color: "white",
            borderWidth: 1,
            borderRadius: 2,
            backgroundColor: "rgb(75, 192, 192)",
            padding: 4,
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
    },
    L3: {
      labels: ["9 AM"],
      datasets: [
        {
          type: "line",
          label: "Current Chart",
          borderColor: primary.complete,
          borderWidth: 2,
          fill: false,
          data: [10],
          datalabels: {
            display: (con) => {
              if (con.dataIndex < 2) {
                return false;
              } else {
                return con.dataset.data[con.dataIndex] > 0;
              }
            },
            align: "top",
            color: "white",
            backgroundColor: "rgb(77, 90, 129)",
            borderWidth: 1,
            borderRadius: 2,
            padding: 4,
            formatter: (value) => {
              return value;
            },
            font: {
              weight: "bold",
              size: 15,
            },
          },
        },
        {
          type: "bar",
          label: "Shift Chart",
          backgroundColor: "#3D860B",
          data: [10],
          borderColor: "white",
          borderWidth: 1, // Reduced borderWidth to avoid white line
          barThickness: 45,
          datalabels: {
            display: (con) => {
              return con.dataset.data[con.dataIndex] > 0;
            },
            align: "center",
            color: "white",
            borderWidth: 1,
            borderRadius: 2,
            backgroundColor: "rgb(75, 192, 192)",
            padding: 4,
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
    },
  });

  useEffect(() => {
    let line = ["L1", "L2", "L3"];
    line.forEach((item) => getProductData(item));
  }, []);

  const getProductData = async (line) => {
    try {
      const response = await ENV.get(`getLastThreeHour?line=${line}`);
      const result = response.data.data;
      setCurrentHour(new Date().getHours());
      setDataSet((prevData) => {
        let initialLabel = [];
        const newLineData = [];
        const newBarData = [];
        result.forEach((res) => {
          let time = res.start_time.split(":");
          let temp = `${time[0] % 12 || 12} ${time[0] >= 12 ? "PM" : "AM"}`;
          initialLabel.push(temp);
          newLineData.push(res.totalcount);
          newBarData.push(res.totalcount);
        });
        let lte = {};
        lte[line] = {
          labels: [...initialLabel],
          datasets: [
            {
              ...prevData[line].datasets[0],
              data: newLineData,
            },
            {
              ...prevData[line].datasets[1],
              data: newBarData,
            },
          ],
        };
        return {
          ...prevData,
          [line]: lte[line],
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  // const handleInterval = (event) => {
  //   event.persist();
  //   setIntervals(event.target.value);
  // };

  return (
    <>
      <AppHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "calc(36vh - 50px)",
          }}
        >
          <ShiftHeader
            date={todayDate}
            time={`${dataSet.L1.labels[0]} - ${currentHour}`}
          />
          <StackedBarLineChart
            type={"line"}
            data={dataSet.L1}
            intervals={intervals}
            line={"L1"}
          />
        </div>
        <div
          style={{
            width: "100%",
            height: "calc(36vh - 50px)",
          }}
        >
          <div>Line 2</div>
          <StackedBarLineChart
            type={"line"}
            data={dataSet.L2}
            intervals={intervals}
            line={"L2"}
          />
        </div>
        <div
          style={{
            width: "100%",
            height: "calc(36vh - 50px)",
          }}
        >
          <div>Line 3</div>
          <StackedBarLineChart
            type={"line"}
            data={dataSet.L3}
            intervals={intervals}
            line={"L3"}
          />
        </div>
      </div>
    </>
  );
}
