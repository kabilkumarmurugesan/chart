import React, { useState, useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-plugin-annotation';
import { Card, useTheme } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import '../../asset/BarChartCopy.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
);

const BarChart = (props) => {
  const theme = useTheme(); // Initial value for the last bar of PRODUCT A
  const { primary } = theme.palette;
  const [categories, setCategories] = useState([
    '09-10',
    '10-11',
    '11-12',
    '12-01',
    '01-02',
    '02-03',
    '03-04',
    '04-05',
    '05-06',
  ]);
  const [visibleQRCodeIndex, setVisibleQRCodeIndex] = useState(null);
  const handleButtonClick = (index) => {
    // getUpdateData();
    setVisibleQRCodeIndex((prevIndex) => (prevIndex === index ? null : index));
  };


  const [series, setSeries] = useState([75, 80, 90, 95, 25, 95, 95, 65, 95, 95]);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    getData('L1');
  }, []);

  const getData = async (line) => {
    try {
      const response = await fetch(
        `http://localhost:8001/api/v1/general/shiftdata?line=${line}`,
      );
      const result = await response.json();
      let temp = [];
      let categories = [];
      result.data.map((item) => {
        temp.push(item.y);
        categories.push(item.x);
      });
      setSeries(temp);
      setCategories(categories);
    } catch (error) {
      console.error(`Download error: ${error.message}`);
    }
  };

  const showTooltip = (event, content) => {
    const rect = event.chart.canvas.getBoundingClientRect();
    setTooltipContent(content);
    setTooltipPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
    setTooltipVisible(true);
  };

  const hideTooltip = () => {
    setTooltipVisible(false);
  };

  const getColor = (value) => {
    if (value < 30) return primary.incomplete;
    if (value < 80) return primary.pending;
    return primary.complete;
  };

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'PRODUCT A',
        data: series,
        backgroundColor: series.map(getColor),
        borderColor: series.map(getColor),
        borderWidth: 34,
        barThickness: 35,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Disable legend
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: 95,
            yMax: 95,
            xMin: -1, // Start from the beginning of the chart
            xMax: 6, // End at the index of "10-11"
            borderColor: '#80808099',
            borderWidth: 2,
            label: {
              content: 'Target: 85', // This is where you specify the label text
              enabled: true,
              position: 'start', // Change to 'start' or 'center'
              backgroundColor: '#80808099',
              yAdjust: -15,
              xAdjust: -5,
            },
            onEnter: (e) => showTooltip(e, 'Target: 85'),
            onLeave: hideTooltip,
          },
          // line2: {
          //   type: 'line',
          //   yMin: 100,
          //   yMax: 100,
          //   xMin: 2, // Start at the index of "11-12"
          //   xMax: 6, // End at the index of "03-04"
          //   borderColor: '#80808099',
          //   borderWidth: 3,
          //   label: {
          //     content: 'Target: 100', // This is where you specify the label text
          //     enabled: true,
          //     position: 'start', // Change to 'start' or 'center'
          //     backgroundColor: '#80808099',
          //     yAdjust: -15,
          //     xAdjust: -5,
          //   },
          //   onEnter: (e) => showTooltip(e, 'Target: 100'),
          //   onLeave: hideTooltip,
          // },
        },
      },
    },
    animations: props.animations,
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
        beginAtZero: true,            ticks: {
          stepSize: 20 // Set the step size for the y-axis labels and grid lines
      }
      },
    },
  };

  return (
    <Card className="mb-4" style={{ position: 'relative', padding: '20px' }}>
      <div
        id="charts"
        style={{ position: 'relative', width: '100%', height: '42vh' }}
      >
        <Bar
          data={data}
           options={options}
          style={{ width: '100%', height: '100%' }}
        /><div
          className="qr-code-container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            // paddingTop: "15px",
          }}
        >
          {data.labels.map((label, index) => (
            <div key={index} style={{ padding: '10px' }}>
              {visibleQRCodeIndex === index ? (
                <QRCodeCanvas
                  value={
                    'MES~LEMES MM~S0V MT~11T3 MO~L9N023103009 SN~PG03MQD5 INS~ ID~1S11T3S0V900PG03MQD5'
                  }
                  size={50}
                />
              ) : (
                <button
                  className="btn-one"
                  style={{ width: '10px', height: "5px" }}
                  onClick={() => handleButtonClick(index)}
                >
                </button>
              )}
            </div>
          ))}
        </div>
        {tooltipVisible && (
          <div
            ref={tooltipRef}
            className="custom-tooltip"
            style={{
              position: 'absolute',
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: '#fff',
              padding: '5px',
              borderRadius: '5px',
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {tooltipContent}
          </div>
        )}
      </div>
      <div
        style={{
          padding: '10px',
        }}
      ></div>
    </Card>
  );
};

export default BarChart;
