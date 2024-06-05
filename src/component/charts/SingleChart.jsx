import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { socket } from "../socket";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, useTheme } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SingleBarChart = () => {
  const theme = useTheme();
  const { primary } = theme.palette;
  const [lastBarValue, setLastBarValue] = useState(50); // Initial value for the last bar of PRODUCT A
  const [isBlinking, setIsBlinking] = useState(true);
  const [visibleQRCodeIndex, setVisibleQRCodeIndex] = useState(null);

  useEffect(() => {
    socket.on("dataUpdate", (data) => {
      let dataT = Object.values(data)[0];
      setLastBarValue(dataT[0].total_count);
    });

    const blinkInterval = setInterval(() => {
      setIsBlinking((prevState) => !prevState);
    }, 1000);

    const increaseValuesInterval = setInterval(() => {
      setLastBarValue((prev) => prev + 1); // Increase PRODUCT A's last bar value
    }, 10000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(increaseValuesInterval);
    };
  }, []);

  const getColor = (value) => {
    if (value < 30) return primary.incomplete;
    if (value < 80) return primary.pending;
    return primary.complete;
  };
  const data = {
    labels: ["03-04"], // Only last bar label
    datasets: [
      {
        label: "PRODUCT A",
        data: [lastBarValue], // Only last bar value
        backgroundColor: [getColor(lastBarValue)],
        borderColor: [getColor(lastBarValue)],
        borderWidth: 20,
        barThickness: 24,
      },
      {
        label: "PRODUCT B",
        data: [10], // Only last bar value
        backgroundColor: isBlinking ? "rgba(255, 127, 14, 0.6)" : "#0000000a",
        borderColor: isBlinking ? "rgba(255, 127, 14, 0.6)" : "#0000000a",
        borderWidth: 20,
        barThickness: 24,
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
        min: 0,
        max: 100,
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false, // Disable legend
      },
    },
  };

  const handleButtonClick = (index) => {
    setVisibleQRCodeIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <Card
      className="mb-4"
      style={{ height: "100%", position: "relative", padding: "20px" }}
    >
      <div id="chart">
        <Bar
          data={data}
          options={options}
          height={90}
          style={{ width: "100%" }}
        />
        <div
          className="qr-code-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            paddingTop: "15px",
          }}
        >
          {data.labels.map((_label, index) => (
            <div key={index} style={{ padding: "10px" }}>
              {visibleQRCodeIndex === index ? (
                <QRCodeCanvas
                  value={
                    "MES~LEMES MM~S0V MT~11T3 MO~L9N023103009 SN~PG03MQD5 INS~ ID~1S11T3S0V900PG03MQD5"
                  }
                  size={50}
                />
              ) : (
                <button
                  className="btn-orange"
                  style={{ width: "50px" }}
                  onClick={() => handleButtonClick(index)}
                >
                  QR
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SingleBarChart;
