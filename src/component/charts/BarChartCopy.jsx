/* import React, { useState, useEffect } from "react";

/* import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { QRCodeCanvas } from "qrcode.react";
import SingleChart from "./SingleChart"; // Import the SingleChart component
import { socket } from "../socket";
import { CCard } from "@coreui/react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const BarChartCopy = () => {
  const [isBlinking, setIsBlinking] = useState(true);
  const [lastBarValue, setLastBarValue] = useState(20); // Initial value for the last bar of PRODUCT A
  const [showSingleChart, setShowSingleChart] = useState(false); // State to control showing SingleChart
  const [categories, setCategories] = useState([
    "9-10",
    "10-11",
    "11-12",
    "12-01",
    "01-02",
    "02-03",
    "03-04",
  ]);

  const [series, setSeries] = useState([87, 87, 90, 95, 95, 95, lastBarValue]);

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

    return () => clearInterval(blinkInterval);
  }, [categories]);

  useEffect(() => {
    setSeries([87, 87, 90, 95, 95, 95, lastBarValue]);
  }, [lastBarValue]);

  const handleClick = (elements) => {
    if (elements.length > 0 && elements[0].index === 6) {
      // If the last bar is clicked, show the SingleChart component
      setShowSingleChart(true);
    }
  };

  const data = {
    labels: categories,
    datasets: [
      {
        label: "PRODUCT A",
        data: series,
        backgroundColor: "rgba(31, 119, 180, 0.6)",
        borderColor: "rgba(31, 119, 180, 1)",
        borderWidth: 1,
      },
      {
        label: "PRODUCT B",
        data: [0, 0, 0, 0, 0, 0, 10],
        backgroundColor: (context) => {
          const index = context.dataIndex;
          return index === 6 && isBlinking ? "rgba(255, 127, 14, 0.6)" : "rgba(98, 181, 229, 0.6)";
        },
        borderColor: (context) => {
          const index = context.dataIndex;
          return index === 6 && isBlinking ? "rgba(255, 127, 14, 1)" : "rgba(98, 181, 229, 1)";
        },
        borderWidth: 1,
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
            xMax: 1, // End at the index of "10-11"
            borderColor: "#00E396",
            borderWidth: 5,
            label: {
              content: "Target: 85",
              enabled: true,
              position: "end",
              backgroundColor: "#00E396",
            },
          },
          line2: {
            type: "line",
            yMin: 100,
            yMax: 100,
            xMin: 2, // Start at the index of "11-12"
            xMax: 6, // End at the index of "03-04"
            borderColor: "#775DD0",
            borderWidth: 10,
            label: {
              content: "Target: 100",
              enabled: true,
              position: "end",
              backgroundColor: "#775DD0",
            },
          },
        },
      },
    },
    onClick: (event, elements) => {
      handleClick(elements);
    },
  };

  return (
    <CCard className="mb-4" style={{ position: "relative", padding: "20px" }}>
      <div>
        {!showSingleChart ? (
          <div id="chart">
            <Bar data={data} options={options} height={350} />
            <div
              id="qr-code"
              style={{
                position: "absolute",
                bottom: "-50px",
                right: "40px",
                paddingBottom: "50px",
              }}
            >
              <QRCodeCanvas value="Hi Welcome to Lenovo" size={50} />
            </div>
          </div>
        ) : (
          <SingleChart lastBarValue={lastBarValue} /> // Render SingleChart with lastBarValue
        )}
      </div>
    </CCard>
  );
};

export default BarChartCopy; */

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { QRCodeCanvas } from "qrcode.react";
import SingleChart from "./SingleChart"; // Import the SingleChart component
import { socket } from "../socket";
import { CCard } from "@coreui/react";
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
  const [isBlinking, setIsBlinking] = useState(true);
  const [lastBarValue, setLastBarValue] = useState(20); // Initial value for the last bar of PRODUCT A
  const [showSingleChart, setShowSingleChart] = useState(false); // State to control showing SingleChart
  const [categories, setCategories] = useState([
    "9-10",
    "10-11",
    "11-12",
    "12-01",
    "01-02",
    "02-03",
    "03-04",
  ]);

  const [series, setSeries] = useState([87, 87, 90, 95, 95, 95, lastBarValue]);

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
    setSeries([87, 87, 90, 95, 95, 95, lastBarValue]);
  }, [lastBarValue]);

  const handleClick = (elements) => {
    if (elements.length > 0 && elements[0].index === 6) {
      // If the last bar is clicked, show the SingleChart component
      setShowSingleChart(true);
    }
  };

  const data = {
    labels: categories,
    datasets: [
      {
        label: "PRODUCT A",
        data: series,
        backgroundColor: "rgba(31, 119, 180, 0.6)",
        borderColor: "rgba(31, 119, 180, 1)",
        borderWidth: 1,
      },
      {
        label: "PRODUCT B",
        data: [0, 0, 0, 0, 0, 0, 10],
        backgroundColor: (context) => {
          const index = context.dataIndex;
          return index === 6 && isBlinking
            ? "rgba(255, 127, 14, 0.6)"
            : "rgba(98, 181, 229, 0.6)";
        },
        borderColor: (context) => {
          const index = context.dataIndex;
          return index === 6 && isBlinking
            ? "rgba(255, 127, 14, 1)"
            : "rgba(98, 181, 229, 1)";
        },
        borderWidth: 1,
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
            borderColor: "#00E396",
            borderWidth: 7,
            label: {
              content: "Target: 85",
              enabled: true,
              position: "end",
              backgroundColor: "#00E396",
            },
          },
          line2: {
            type: "line",
            yMin: 100,
            yMax: 100,
            xMin: 2, // Start at the index of "11-12"
            xMax: 6, // End at the index of "03-04"
            borderColor: "#775DD0",
            borderWidth: 10,
            label: {
              content: "Target: 100",
              enabled: true,
              position: "end",
              backgroundColor: "#775DD0",
            },
          },
        },
      },
    },
    onClick: (event, elements) => {
      handleClick(elements);
    },
  };

  return (
    <CCard
      className="mb-4"
      style={{ position: "relative", padding: "20px 20px 60px 20px" }}
    >
      <div>
        {!showSingleChart ? (
          <div id="chart">
            <Bar
              data={data}
              options={options}
              height={100}
              style={{ width: "100%" }}
            />
            <div
              className={
                props.type === "overview"
                  ? "qr-code-flow"
                  : "close-qr-code-flow"
              }
            >
              <QRCodeCanvas value="Hi Welcome to Lenovo" size={50} />
            </div>
          </div>
        ) : (
          <SingleChart lastBarValue={lastBarValue} /> // Render SingleChart with lastBarValue
        )}
      </div>
    </CCard>
  );
};

export default BarChartCopy;
