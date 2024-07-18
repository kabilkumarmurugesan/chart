import React, { useState } from "react";
import AppHeader from "../../component/Layout/AppHeader";
import RadioBtn from "../../component/RadioBtn";
import { useTheme } from "@emotion/react";
import StackedBarLineChartTwo from "../../component/charts/StackedBarLineChartTwo";
import CommonService from "../../utilities/CommonService";
import ShiftHeader from "../../component/Shift/ShiftHeader";

export default function LineCoverage() {
  const theme = useTheme();
  const { primary } = theme.palette;
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [todayDate, setTodayDate] = useState(
    CommonService.formatDate(new Date())
  );
  const [intervals, setIntervals] = useState(15000);
  const [dataSet, setDataSet] = useState({
    labels: ["9 AM", "10 AM", "11 AM"],
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
  });

  const handleInterval = (event) => {
    event.persist();
    setIntervals(event.target.value);
  };

  return (
    <>
      <AppHeader
        type={"head"}
        component={<RadioBtn handleEvent={handleInterval} />}
      />
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
            time={`${dataSet.labels[0]} - ${currentHour}`}
          />
          <StackedBarLineChartTwo type={"line"} intervals={intervals} />
        </div>
        <div
          style={{
            width: "100%",
            height: "calc(36vh - 50px)",
          }}
        >
          <div>Line 2</div>
          <StackedBarLineChartTwo type={"line"} intervals={intervals} />
        </div>
        <div
          style={{
            width: "100%",
            height: "calc(36vh - 50px)",
          }}
        >
          <div>Line 3</div>
          <StackedBarLineChartTwo type={"line"} intervals={intervals} />
        </div>
      </div>
    </>
  );
}
