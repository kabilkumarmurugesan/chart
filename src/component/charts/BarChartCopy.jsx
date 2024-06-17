import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { QRCodeCanvas } from 'qrcode.react';
import { socket } from '../socket';
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
import '../../asset/css/BarChartCopy.css';
import { Card, useTheme } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
);

const BarChartCopy = ({ categories, response, animations, id, shiftHours }) => {
  const theme = useTheme();
  const { primary } = theme.palette;
  const [isBlinking, setIsBlinking] = useState(true);
  const [lastBarValue, setLastBarValue] = useState(10); // Initial value for the last bar of PRODUCT A
  const [categoriesList, setCategories] = useState(categories);
  const [targetList, setTargetList] = useState(90);
  const [emtSeries, setEmtSeries] = useState(
    shiftHours ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 5] : [0, 0, 0, 0, 0, 5],
  );
  const [series, setSeries] = useState([]);
  const [visibleQRCodeIndex, setVisibleQRCodeIndex] = useState(null);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    setCategories(categories);
  }, [categories]);

  useEffect(() => {
    let temp = [];
    let emt = [];
    let terget = [];
    response &&
      response.updatedData.map((item) => {
        temp.push(item.y);
        item.target && terget.push(parseInt(item.target));
        emt.push(0);
      });
    const sum = terget.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    const average = sum / terget.length;
    setTargetList(average);
    setSeries(temp);
    setEmtSeries(emt);
  }, [response, shiftHours]);

  useEffect(() => {
    socket.on('dataUpdate', (data) => {
      let Tcategories = [...categoriesList];
      if (data.timeRange !== Tcategories[Tcategories.length - 1]) {
        Tcategories.push(data.timeRange);
        setCategories(Tcategories);
      }
      let intit = parseInt(data.totalCount);
      setLastBarValue(intit);
    });

    const blinkInterval = setInterval(() => {
      setIsBlinking((prevState) => !prevState);
    }, 500);

    return () => {
      clearInterval(blinkInterval);
    };
  }, [categoriesList]);

  useEffect(() => {
    let Tcategories = [...categoriesList];
    let emt = emtSeries;
    emt[Tcategories.length - 1] = 5;
    setEmtSeries(emt);
    let tempSeries = [...series];
    tempSeries[Tcategories.length - 1] = lastBarValue;
    setSeries(tempSeries);
  }, [categoriesList, shiftHours, lastBarValue]);

  const handleButtonClick = (index) => {
    getUpdateData();
    setVisibleQRCodeIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const getUpdateData = async () => {
    const url = 'http://localhost:8001/api/v1/general/1';
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then((updatedData) => {
        console.log('Data updated:', updatedData);
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
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

  const getColor = (value, index) => {
    if (index < series.lenght - 1) {
      if (value < targetList / 3) return primary.incomplete;
      if (value < targetList / 2) return primary.pending;
      return primary.complete;
    } else {
      return primary.complete;
    }
  };

  const data = {
    labels: categoriesList,
    datasets: [
      {
        label: 'PRODUCT A',
        data: series,
        backgroundColor: series.map(getColor),
        borderColor: series.map(getColor),
        borderWidth: 35,
        barThickness: 34,
      },
      {
        label: 'PRODUCT B',
        data: emtSeries,
        backgroundColor: (context) => {
          const index = context.dataIndex;
          return index === categoriesList.length - 1 && isBlinking
            ? '#fff'
            : primary.complete;
        },
        borderColor: (context) => {
          const index = context.dataIndex;
          return index === categoriesList.length - 1 && isBlinking
            ? '#fff'
            : primary.complete;
        },
        borderWidth: 35,
        barThickness: 34,
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
        ticks: {
          stepSize: 20, // Set the step size for the y-axis labels and grid lines
        },
        stacked: true,
        beginAtZero: true,
      },
    },
    animations: animations,
    plugins: {
      legend: {
        display: false, // Disable legend
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: targetList,
            yMax: targetList,
            xMin: -1, // Start from the beginning of the chart
            xMax: 8, // End at the index of "10-11"
            borderColor: '#241773',
            borderWidth: 3,
            label: {
              content: 'Target: 85', // This is where you specify the label text
              enabled: true,
              position: 'start', // Change to 'start' or 'center'
              backgroundColor: '#241773',
              yAdjust: -15,
              xAdjust: -5,
            },
            onEnter: (e) => showTooltip(e, 'Target: 85'),
            onLeave: hideTooltip,
          },
        },
      },
    },
  };

  return (
    <Card className="mb-4" style={{ position: 'relative', padding: '20px' }}>
      <div
        id={id === 'single' ? 'single' : 'chart'}
        style={{
          position: 'relative',
          width: '100%',
          height: id === 'single' ? '50vh' : '45vh',
        }}
      >
        <Bar
          data={data}
          options={options}
          style={{ width: '100%', height: '300px' }}
        />
        <div
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
              {visibleQRCodeIndex === index && id !== 'single' ? (
                <QRCodeCanvas
                  value={
                    'MES~LEMES MM~S0V MT~11T3 MO~L9N023103009 SN~PG03MQD5 INS~ ID~1S11T3S0V900PG03MQD5'
                  }
                  size={50}
                />
              ) : (
                <button
                  className="btn-one"
                  style={{
                    width: '10px',
                    backgroundColor:
                      id === 'single' && visibleQRCodeIndex === index
                        ? 'rgb(77, 90, 129)'
                        : 'rgb(220, 223, 224)',
                    height: '5px',
                  }}
                  onClick={() => handleButtonClick(index)}
                ></button>
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
    </Card>
  );
};

export default BarChartCopy;
