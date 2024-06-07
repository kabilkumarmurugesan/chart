import React, { useEffect, useState } from "react";
import BarChart from "../charts/BarChart";
import { Box, Card, Grid, Typography, useTheme } from "@mui/material";
import BasicTable from "../Table/Table";
import BasicAction from "../Card/BasicAction";
import BarChartCopy from "../charts/BarChartCopy";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import SingleChart from "../charts/SingleChart";

const AppContainer = () => {
  const theme = useTheme();
  const { primary } = theme.palette;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 2); // Adjusted to 2 slides
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SwitchTransition>
      <CSSTransition
        key={currentSlide}
        timeout={600}
        classNames="zoom-fade"
        unmountOnExit
      >
        <Box
          className="zoom-fade-container"
          sx={{ background: primary.main, fontWeight: "bold", height: "100vh" }}
        >
          {currentSlide === 0 ? (
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ minWidth: 275 }}>
                    {" "}
                    <Typography
                      sx={{ p: 1 }}
                      style={{
                        fontFamily: "cursive",
                        fontSize: "20px",
                      }}
                    >
                      Date - 29/05/2024
                    </Typography>{" "}
                    <hr />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        p: 1,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {" "}
                      <Typography
                        sx={{ p: 1 }}
                        style={{
                          fontFamily: "cursive",
                          fontSize: "15px",
                        }}
                      >
                        Time - 09:00 AM - 05:30PM (shift 2)
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                          sx={{ p: 1 }}
                          style={{
                            fontFamily: "cursive",
                            fontSize: "15px",
                          }}
                        >
                          OverTime 07:30PM
                        </Typography>
                      </Box>
                    </Box>{" "}
                    <hr />
                    <BarChart />
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ minWidth: 275 }}>
                    {" "}
                    <Typography
                      sx={{ p: 1 }}
                      style={{
                        fontFamily: "cursive",
                        fontSize: "20px",
                      }}
                    >
                      Date - 30/05/2024
                    </Typography>
                    <hr />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        p: 1,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{ p: 1 }}
                        style={{
                          fontFamily: "cursive",
                          fontSize: "15px",
                        }}
                      >
                        Time - 09:00 AM - 05:30PM(shift 1)
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                          sx={{ p: 1 }}
                          style={{
                            fontFamily: "cursive",
                            fontSize: "15px",
                          }}
                        >
                          OverTime 07:30PM
                        </Typography>
                      </Box>{" "}
                    </Box>
                    <hr />
                    <BarChartCopy animations={false} />
                  </Card>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                  <BasicTable />
                </Grid>
                <Grid item xs={12} md={6}>
                  <BasicTable />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                  <BasicAction />
                </Grid>
                <Grid item xs={12} md={6}>
                  <BasicAction />
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box sx={{ p: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={7} md={8}>
                  <Card sx={{ minWidth: 275 }}>
                    <BarChartCopy
                      animations={{
                        tension: {
                          duration: 10000,
                          easing: "linear",
                          from: 1,
                          to: 0,
                        },
                      }}
                    />
                  </Card>
                </Grid>
                <Grid item xs={5} md={4}>
                  <Grid
                    container
                    spacing={4}
                    // columnSpacing={{ xs: 2, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6} md={6}>
                      <Card sx={{ minWidth: 275, padding: 2 }}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Box>
                            <Typography
                              style={{
                                fontFamily: "cursive",
                                fontSize: "20px",
                              }}
                            >
                              Shift Actual
                            </Typography>
                            <Typography
                              style={{
                                fontFamily: "cursive",
                                fontSize: "20px",
                              }}
                            >
                              15
                            </Typography>
                          </Box>
                          <img
                            src="./checklist.png"
                            alt="GIF"
                            style={{ width: "60px", height: "60px" }}
                          />
                          {/*  <ListAltOutlinedIcon style={{ fontSize: '40px' }} /> */}
                        </Box>
                      </Card>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Card sx={{ minWidth: 275, padding: 2 }}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Box>
                            <Typography
                              style={{
                                fontFamily: "cursive",
                                fontSize: "20px",
                              }}
                            >
                              Shift Target
                            </Typography>
                            <Typography
                              style={{
                                fontFamily: "cursive",
                                fontSize: "20px",
                              }}
                            >
                              15
                            </Typography>
                          </Box>
                          <img
                            src="./target.png"
                            alt="GIF"
                            style={{ width: "60px", height: "60px" }}
                          />
                          {/*  <TrackChangesOutlinedIcon style={{ fontSize: '40px' }} /> */}
                        </Box>
                      </Card>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Card sx={{ minWidth: 275, padding: 2 }}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Box>
                            <Typography
                              style={{
                                fontFamily: "cursive",
                                fontSize: "20px",
                              }}
                            >
                              Shift UPH
                            </Typography>
                            <Typography
                              style={{
                                fontFamily: "cursive",
                                fontSize: "20px",
                              }}
                            >
                              15
                            </Typography>
                          </Box>
                          <img
                            src="./presentation.png"
                            alt="GIF"
                            style={{ width: "60px", height: "60px" }}
                          />
                          {/*  <NorthOutlinedIcon style={{ fontSize: '40px' }} /> */}
                        </Box>
                      </Card>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Card sx={{ minWidth: 275, padding: 2 }}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Box>
                            <Typography
                              style={{
                                fontFamily: "cursive",
                                fontSize: "20px",
                              }}
                            >
                              Shift Down Time
                            </Typography>
                            <Typography
                              style={{
                                fontFamily: "cursive",
                                fontSize: "20px",
                              }}
                            >
                              15
                            </Typography>
                          </Box>
                          <img
                            src="./hourglass.png"
                            alt="GIF"
                            style={{ width: "60px", height: "60px" }}
                          />
                          {/*     <UpdateOutlinedIcon style={{ fontSize: '40px' }} /> */}
                        </Box>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={8}>
                  <SingleChart />
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default AppContainer;
