import React from "react";
import ReactApexChart from "react-apexcharts";
import { Card, CardContent } from "@mui/material";

class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Actual",
          data: [
            {
              x: "09-10",
              y: 1292,
              goals: [
                {
                  name: "Target",
                  value: 5600,
                  strokeHeight: 5,
                  strokeWidth: 55,

                  strokeColor: "#775DD0",
                },
              ],
            },
            {
              x: "10-11",
              y: 4432,
              goals: [
                {
                  name: "Target",
                  value: 5600,
                  strokeHeight: 5,
                  strokeWidth: 55,
                  strokeColor: "#775DD0",
                },
              ],
            },
            {
              x: "11-12",
              y: 5423,
              goals: [
                {
                  name: "Target",
                  value: 5200,
                  strokeHeight: 5,
                  strokeWidth: 55,
                  strokeColor: "#775DD0",
                },
              ],
            },
            {
              x: "12-01",
              y: 6653,
              goals: [
                {
                  name: "Target",
                  value: 5200,
                  strokeHeight: 5,
                  strokeWidth: 55,

                  strokeColor: "#775DD0",
                },
              ],
            },
            {
              x: "01-02",
              y: 8133,
              goals: [
                {
                  name: "Target",
                  value: 5200,
                  strokeHeight: 5,
                  strokeWidth: 55,

                  strokeColor: "#775DD0",
                },
              ],
            },
            {
              x: "02-03",
              y: 7132,
              goals: [
                {
                  name: "Target",
                  value: 5200,
                  strokeHeight: 5,
                  strokeWidth: 55,

                  strokeColor: "#775DD0",
                },
              ],
            },
            {
              x: "03-04",
              y: 7332,
              goals: [
                {
                  name: "Target",
                  value: 5200,
                  strokeHeight: 5,
                  strokeWidth: 55,

                  strokeColor: "#775DD0",
                },
              ],
            },
            {
              x: "04-05",
              y: 6553,
              goals: [
                {
                  name: "Target",
                  value: 5200,
                  strokeHeight: 5,
                  strokeWidth: 55,

                  strokeColor: "#775DD0",
                },
              ],
            },
            {
              x: "05-06",
              y: 6753,
              goals: [
                {
                  name: "Target",
                  value: 5200,
                  strokeHeight: 5,
                  strokeWidth: 55,
                  strokeColor: "#775DD0",
                },
              ],
            },
          ],
        },
      ],

      options: {
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            columnWidth: "60%",
          },
        },
        colors: ["#00E396"],
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ["Actual", "Target"],
          markers: {
            fillColors: ["#00E396", "#775DD0"],
          },
        },
      },
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={350}
          />
        </div>

        <div id="html-dist"></div>
      </div>
    );
  }
}

export default BarChart;
