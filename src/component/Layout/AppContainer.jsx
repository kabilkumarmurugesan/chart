import React, { useEffect, useState } from "react";
import BarChart from "../charts/BarChart";
import { Box, Card, Grid, Typography, useTheme } from "@mui/material";
import BasicTable from "../Table/Table";
import BasicAction from "../Card/BasicAction";
import BarChartCopy from "../charts/BarChartCopy";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { ShiftCardDetails } from "../Card/ShiftCardDetails";
// import SingleChart from "../charts/SingleChart";

const ShiftCardDetailList = [
  { title: "MODEL", value: 155 },
  { title: "MOTHLY ORDER", value: 135 },
  { title: "P.M TARGET", value: 135 },
  { title: "P.M ACTUAL", value: 135 },
];
const AppContainer = ({ ShowShift, refreshRate }) => {
  const theme = useTheme();
  const { primary } = theme.palette;
  const [currentSlide, setCurrentSlide] = useState(0);
  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const yseterdate = yesterday.toLocaleDateString("en-US"); // MM/DD/YYYY in US English

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 2); // Adjusted to 2 slides
    }, refreshRate);
    return () => clearInterval(interval);
  }, [refreshRate]);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
          {currentSlide === 0 && ShowShift === "All" ? (
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ minWidth: 275 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {" "}
                      <Typography
                        sx={{ p: 1 }}
                        style={{
                          textAlign: "left",
                          fontSize: "15px",
                        }}
                      >
                        <b> Date:</b> {yseterdate}
                      </Typography>{" "}
                      <Typography
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        <b>Time:</b> 09:00 AM - 05:30PM
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                          sx={{ p: 1 }}
                          style={{
                            fontSize: "15px",
                          }}
                        >
                          <b> OT:</b> 07:30PM
                        </Typography>
                      </Box>
                    </Box>{" "}
                    <BarChart />
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ minWidth: 275 }}>
                    {" "}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        pl: 1,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {" "}
                      <Typography
                        sx={{ p: 1 }}
                        style={{
                          textAlign: "left",
                          fontSize: "15px",
                        }}
                      >
                        <b>Date:</b> {formatDate(new Date())}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        <b>Time:</b> 09:00 AM - 05:30PM
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                          sx={{ p: 1 }}
                          style={{
                            fontSize: "15px",
                          }}
                        >
                          <b> OT:</b> 07:30PM
                        </Typography>
                      </Box>{" "}
                    </Box>
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
            </Box>
          ) : (
            <Box sx={{ p: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={6} md={10}>
                  <Card sx={{ minWidth: 275 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        pl: 1,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{ p: 1 }}
                        style={{
                          textAlign: "left",
                          fontSize: "15px",
                        }}
                      >
                        <b> Date:</b> {yseterdate}
                      </Typography>{" "}
                      <Typography
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        <b>Time:</b> 09:00 AM - 05:30PM
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                          sx={{ p: 1 }}
                          style={{
                            fontSize: "15px",
                          }}
                        >
                          <b> OT:</b> 07:30PM
                        </Typography>
                      </Box>
                    </Box>{" "}
                    <BarChartCopy
                      id={"single"}
                      animations={{
                        tension: {
                          duration: 1000,
                          easing: "linear",
                          from: 1,
                          to: 0,
                        },
                      }}
                    />
                  </Card>
                </Grid>
                <Grid item xs={4} md={2}>
                  <Card>
                    <Grid container spacing={4}>
                      <Grid
                        item
                        xs={6}
                        md={12}
                        sx={{
                          background: "#241773",
                          color: "#fff",
                          borderBottom: "2px solid #fff",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100px", // Match this height to the other Boxes
                          }}
                        >
                          <Box>
                            <Typography
                              style={{
                                fontSize: "15px",
                              }}
                            >
                              SHIFT TARGET <br />
                              <b
                                style={{
                                  fontSize: "30px",
                                }}
                              >
                                {" "}
                                115
                              </b>
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        md={12}
                        sx={{
                          borderBottom: "2px solid #fff",
                          background: "#3d860b",
                          color: "#fff",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "80px", // Set a fixed height or a percentage value
                          }}
                        >
                          <Box>
                            <Typography
                              style={{
                                fontSize: "15px",
                              }}
                            >
                              SHIFT ACTUAL<br></br>
                              <b
                                style={{
                                  fontSize: "30px",
                                }}
                              >
                                {" "}
                                150
                              </b>
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        md={12}
                        sx={{
                          background: "#483456",
                          borderBottom: "2px solid #fff",
                          color: "#fff",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "80px", // Match this height to the other Boxes
                          }}
                        >
                          <Box>
                            <Typography
                              style={{
                                fontSize: "15px",
                              }}
                            >
                              SHIFT UPH
                              <br />
                              <b
                                style={{
                                  fontSize: "30px",
                                }}
                              >
                                {" "}
                                125
                              </b>
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        md={12}
                        sx={{
                          background: "#e1140a",
                          color: "#fff",
                          borderBottom: "2px solid #fff",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "25px", // Match this height to the other Boxes
                          }}
                        >
                          <Box>
                            <Typography
                              style={{
                                fontSize: "15px",
                              }}
                            >
                              DOWN TIME <br />
                              <b
                                style={{
                                  fontSize: "30px",
                                }}
                              >
                                145
                              </b>
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <Grid item xs={6} md={10}>
                  <BasicTable />
                </Grid>{" "}
                <Grid item xs={4} md={2}>
                  <Card>
                    <Grid container spacing={1}>
                      {ShiftCardDetailList.map((item, index) => (
                        <Grid item xs={6} md={12} key={index}>
                          <ShiftCardDetails {...item} index={index} />
                        </Grid>
                      ))}
                    </Grid>
                  </Card>
                </Grid>
                <Grid item xs={6} md={10}>
                  <BasicAction />
                </Grid>
                {/* <Grid item xs={12} md={8}>
                <SingleChart />
              </Grid> */}
              </Grid>
            </Box>
          )}
        </Box>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default AppContainer;
