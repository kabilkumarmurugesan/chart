import React from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardContent } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

class BarChart extends React.Component {
  constructor(props) {
    super(props);

    const data = [
      { x: "09-10", y: 1292, target: 5600 },
      { x: "10-11", y: 4432, target: 5600 },
      { x: "11-12", y: 5423, target: 5200 },
      { x: "12-01", y: 6653, target: 5200 },
      { x: "01-02", y: 8133, target: 5200 },
      { x: "02-03", y: 7132, target: 5200 },
      { x: "03-04", y: 7332, target: 5200 },
      { x: "04-05", y: 6553, target: 5200 },
      { x: "05-06", y: 6753, target: 5200 },
    ];

    const processedData = data.map((item) => ({
      x: item.x || "",
      y: item.y || 0,
      target: item.target || 0,
    }));

    this.state = {
      data: {
        labels: processedData.map((item) => item.x),
        datasets: [
          {
            label: "Actual",
            data: processedData.map((item) => item.y),
            backgroundColor: "#3D860B",
          },
          {
            label: "Target",
            data: processedData.map((item) => item.target),
            type: "line",
            borderColor: (context) => {
              const index = context.dataIndex;
              if (
                processedData[index] &&
                processedData[index].target !== undefined
              ) {
                return processedData[index].target >= processedData[index].y
                  ? "rgb(4, 142, 254)"
                  : "rgb(30, 239, 44)";
              }
              return "rgb(0, 0, 0)"; // default color if something goes wrong
            },
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              generateLabels: (chart) => {
                return [
                  {
                    text: "Target",
                    fillStyle: "rgb(4, 142, 254)",
                    hidden: false,
                  },
                  {
                    text: "Actual",
                    fillStyle: "#3D860B",
                    hidden: false,
                  },
                ];
              },
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
          title: {
            display: false,
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    };
  }

  render() {
    return (
      <Card>
        <CardContent>
          <Bar data={this.state.data} options={this.state.options} />
        </CardContent>
      </Card>
    );
  }
}

export default BarChart;
