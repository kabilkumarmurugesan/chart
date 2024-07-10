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

const labels = ["9PM", "10PM"];

export const data = {
  labels,
  datasets: [
    {
      type: "line",
      label: "Dataset 1",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 2,
      fill: false,
      data: [10, 25],
    },
    {
      type: "bar",
      label: "Dataset 2",
      backgroundColor: "rgb(75, 192, 192)",
      data: [10, 25],
      borderColor: "white",
      borderWidth: 2,
    },
  ],
};

export default function StackedBarLineChartOne() {
  const [dataSet, setDataSet] = useState(data);
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentHour = now.getHours();
      setDataSet((prevData) => {
        let time = `${currentHour % 12 || 12} ${
          currentHour >= 12 ? "PM" : "AM"
        }`;
        // const newLabels = [...labels, now.toLocaleTimeString()];
        const newLabels = [...labels, time];

        const newData = [
          ...prevData.datasets[0].data,
          Math.floor(Math.random() * 10),
        ];

        return {
          ...prevData,
          labels: newLabels,
          datasets: [
            ...prevData.datasets,
            {
              ...prevData.datasets[0],
              data: newData,
            },
          ],
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    setDataSet(data);
  }, []);
  return (
    <div>
      <Chart type="bar" data={dataSet} />
    </div>
  );
}
