import React from 'react';
import { Box, Card, Typography, Grid } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import emoj from '../../asset/gif/emoj.png';
import BarChart from '../charts/BarChart';
import BarChartCopy from '../charts/BarChartCopy';
import ShiftHeader from './ShiftHeader';
import DownTimeAction from '../Card/DownTimeAction';

const FullShiftOverall = ({
  yesterdayDate,
  secoundResponse,
  firstResponse,
  categories,
  shiftHours,
  lastBarValue,
  handleSlidechage,
  visibleQRCodeIndex,
  setVisibleQRCodeIndex,
  todayDate,
  downTimeAction,
}) => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container rowSpacing={3} spacing={4}>
        <Grid item xs={12} md={10}>
          <Grid container rowSpacing={2}>
            <Grid item xs={12} md={12} sx={{ height: '34vh' }}>
              <Card sx={{ minWidth: 275 }}>
                <ShiftHeader
                  date={yesterdayDate}
                  time={'09:00 PM - 05:30 AM'}
                />
                <BarChart
                  height={'22vh'}
                  setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                  handleSlidechage={handleSlidechage}
                  visibleQRCodeIndex={visibleQRCodeIndex}
                  categories={categories}
                  response={firstResponse}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={12} sx={{ height: '34vh' }}>
              <Card sx={{ minWidth: 275 }}>
                <ShiftHeader date={todayDate} time={'09:00 AM - 05:30 PM'} />
                <BarChartCopy
                  height={'24vh'}
                  setVisibleQRCodeIndex={setVisibleQRCodeIndex}
                  handleSlidechage={handleSlidechage}
                  lastBarValue={lastBarValue}
                  animations={false}
                  response={secoundResponse}
                  categories={categories}
                  visibleQRCodeIndex={visibleQRCodeIndex}
                  shiftHours={shiftHours}
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4} md={2}>
          <Card>
            <Box className="grid-container">
              <Box
                className="grid-items"
                style={{
                  background: '#241773',
                  color: '#fff',
                  borderBottom: '2px solid #fff',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography
                      style={{
                        fontSize: '15px',
                      }}
                    >
                      SHIFT TARGET <br />
                      <b
                        style={{
                          fontSize: '30px',
                        }}
                      >
                        {' '}
                        115
                      </b>
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                className="grid-items"
                style={{
                  borderBottom: '2px solid #fff',
                  background: '#3d860b',
                  color: '#fff',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // height: "80px", // Set a fixed height or a percentage value
                  }}
                >
                  <Box>
                    <Typography
                      style={{
                        fontSize: '15px',
                      }}
                    >
                      SHIFT ACTUAL<br></br>
                      <b
                        style={{
                          fontSize: '30px',
                        }}
                      >
                        {' '}
                        150
                      </b>
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                className="grid-items"
                style={{
                  background: '#483456',
                  borderBottom: '2px solid #fff',
                  color: '#fff',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // height: "80/px", // Match this height to the other Boxes
                  }}
                >
                  <Box>
                    <Typography
                      style={{
                        fontSize: '15px',
                      }}
                    >
                      SHIFT UPH
                      <br />
                      <b
                        style={{
                          fontSize: '30px',
                        }}
                      >
                        {' '}
                        125
                      </b>
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                className="grid-items"
                style={{
                  background: '#e1140a',
                  color: '#fff',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // height: "25px", // Match this height to the other Boxes
                  }}
                >
                  <Box>
                    <Typography
                      style={{
                        fontSize: '15px',
                      }}
                    >
                      DOWN TIME <br />
                      <b
                        style={{
                          fontSize: '30px',
                        }}
                      >
                        145
                      </b>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={6} md={12}>
          <Grid container spacing={4}>
            <Grid item xs={6} md={10}>
              <DownTimeAction data={downTimeAction} />
            </Grid>
            <Grid item xs={4} md={2}>
              {visibleQRCodeIndex === null ? (
                <img style={{ width: '54%' }} alt="emoj" src={emoj} />
              ) : (
                <Card>
                  <QRCodeCanvas
                    value={
                      'MES~LEMES MM~S0V MT~11T3 MO~L9N023103009 SN~PG03MQD5 INS~ ID~1S11T3S0V900PG03MQD5'
                    }
                    size={150}
                  />
                </Card>
              )}
            </Grid>
          </Grid>{' '}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FullShiftOverall;
