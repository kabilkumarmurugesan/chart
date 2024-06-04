import React, { useEffect, useState } from "react";
import BarChart from "../charts/BarChart";
import { Box, Card, Grid, Typography, useTheme } from "@mui/material";
import BasicTable from "../Table/Table";
import BasicAction from "../Card/BasicAction";
import BarChartCopy from "../charts/BarChartCopy";
import { CSSTransition, SwitchTransition } from "react-transition-group";
// import "../MainLayout.css"; // Ensure this CSS file is correctly linked
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import SingleChart from "../charts/SingleChart";

const AppContainer = () => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 2); // Adjusted to 2 slides
    }, 14000);
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
          sx={{ background: primary.main, fontWeight: "bold" }}
        >
          {currentSlide === 0 ? (
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ minWidth: 275 }}>
                    {" "}
                    <Typography
                      sx={{ p: 1 }}
                      style={{ fontFamily: "sans-serif", fontStyle: "oblique" }}
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
                      <Typography sx={{ p: 1 }}>
                        Time - 09:00 AM - 05:30PM (shift 2)
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography sx={{ p: 1 }}>OverTime 07:30PM</Typography>
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
                      style={{ fontFamily: "sans-serif", fontStyle: "oblique" }}
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
                      <Typography sx={{ p: 1 }}>
                        Time - 09:00 AM - 05:30PM(shift 1)
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography sx={{ p: 1 }}>OverTime 07:30PM</Typography>
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
              <Grid
                container
                spacing={2}
                direction="column-reverse"
                sx={{ mt: 2 }}
              >
                <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
                    <SingleChart />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
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
                                fontStyle: "italic",
                                fontSize: "20px",
                              }}
                            >
                              Shift Actual
                            </Typography>
                            <Typography
                              style={{
                                fontFamily: "cursive",
                                fontStyle: "italic",
                                fontSize: "20px",
                              }}
                            >
                              15
                            </Typography>
                          </Box>
                          <img
                            src="./checklist.gif"
                            alt="GIF"
                            style={{ width: "60px", height: "60px" }}
                          />
                          {/*  <ListAltOutlinedIcon style={{ fontSize: '40px' }} /> */}
                        </Box>
                      </Card>
                    </Grid>
                    <Grid item xs={6} md={3}>
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
                                fontStyle: "italic",
                                fontSize: "20px",
                              }}
                            >
                              Shift Target
                            </Typography>
                            <Typography
                              style={{
                                fontFamily: "cursive",
                                fontStyle: "italic",
                                fontSize: "20px",
                              }}
                            >
                              15
                            </Typography>
                          </Box>
                          <img
                            src="./target.gif"
                            alt="GIF"
                            style={{ width: "60px", height: "60px" }}
                          />
                          {/*  <TrackChangesOutlinedIcon style={{ fontSize: '40px' }} /> */}
                        </Box>
                      </Card>
                    </Grid>
                    <Grid item xs={6} md={3}>
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
                                fontStyle: "italic",
                                fontSize: "20px",
                              }}
                            >
                              Shift UPH
                            </Typography>
                            <Typography
                              style={{
                                fontFamily: "cursive",
                                fontStyle: "italic",
                                fontSize: "20px",
                              }}
                            >
                              15
                            </Typography>
                          </Box>
                          <img
                            src="./presentation.gif"
                            alt="GIF"
                            style={{ width: "60px", height: "60px" }}
                          />
                          {/*  <NorthOutlinedIcon style={{ fontSize: '40px' }} /> */}
                        </Box>
                      </Card>
                    </Grid>
                    <Grid item xs={6} md={3}>
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
                                fontStyle: "italic",
                                fontSize: "20px",
                              }}
                            >
                              Shift Down Time
                            </Typography>
                            <Typography
                              style={{
                                fontFamily: "cursive",
                                fontStyle: "italic",
                                fontSize: "20px",
                              }}
                            >
                              15
                            </Typography>
                          </Box>
                          <img
                            src="./hourglass.gif"
                            alt="GIF"
                            style={{ width: "60px", height: "60px" }}
                          />
                          {/*     <UpdateOutlinedIcon style={{ fontSize: '40px' }} /> */}
                        </Box>
                      </Card>
                    </Grid>
                  </Grid>
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

const CardElement = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={8}>
        <Box style={{ padding: "10px" }}>
          <Card sx={{ minWidth: 175 }}>
            <Box>{props.title}</Box>
            <Box style={{ padding: "10px" }}>{props.value}</Box>
          </Card>
        </Box>{" "}
      </Grid>
    </Grid>
  );
};
