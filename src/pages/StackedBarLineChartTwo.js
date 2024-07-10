import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const initialLabels = ["9 AM"];

export const initialData = {
  labels: initialLabels,
  datasets: [
    {
      type: "line",
      label: "Current Chart",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 2,
      fill: false,
      data: [10],
    },
    {
      type: "bar",
      label: "Shift Chart",
      backgroundColor: "rgb(75, 192, 192)",
      data: [10],
      borderColor: "white",
      borderWidth: 2,
    },
  ],
};

export default function StackedBarLineChartTwo() {
  const [dataSet, setDataSet] = useState(initialData);
  const inow = new Date();
  const [nextHr, setNextHr] = useState(inow.getHours() + 1);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const currentHour = now.getHours();
      setDataSet((prevData) => {
        const newLabels = [...prevData.labels, new Date().toLocaleTimeString()];
        let redom = Math.floor(Math.random() * 5);
        const newLineData = [...prevData.datasets[0].data, redom];
        const newBarData = [...prevData.datasets[1].data, redom];

        if (now.getHours() === nextHr) {
          setNextHr(now.getHours() + 1);
          let barvalue = newLineData.filter((i) => i !== 0);
          newBarData.push(barvalue.length);
          let time = `${currentHour % 12 || 12} ${
            currentHour >= 12 ? "PM" : "AM"
          }`;
          initialLabels.push(time);
          return {
            labels: [...initialLabels],
            datasets: [
              {
                ...prevData.datasets[0],
                data: newBarData,
              },
              {
                ...prevData.datasets[1],
                data: newBarData,
              },
            ],
          };
        } else {
          return {
            labels: newLabels,
            datasets: [
              {
                ...prevData.datasets[0],
                data: newLineData,
              },
              {
                ...prevData.datasets[1],
                data: newBarData,
              },
            ],
          };
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Chart type="bar" data={dataSet} />
    </div>
  );
}
