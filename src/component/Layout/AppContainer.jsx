import React, { useEffect, useState } from "react";
import BarChart from "../charts/BarChart";
import { Box, Card, Grid, Typography, useTheme } from "@mui/material";
import BasicTable from "../Table/Table";
import BasicAction from "../Card/BasicAction";
import BarChartCopy from "../charts/BarChartCopy";
import { CSSTransition, SwitchTransition } from "react-transition-group";
// import SingleChart from "../charts/SingleChart";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const AppContainer = ({ refreshRate }) => {
  const theme = useTheme();
  const { primary } = theme.palette;
  const [shift, setShift] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  let dateString = yesterday.toLocaleDateString("en-US"); // MM/DD/YYYY in US English
  const [yseterdate, setYestrdate] = useState(dateString);

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

  const handleOnShift = (e) => {
    setShift(e.target.checked);
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
          {currentSlide === 0 ? (
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2}>
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
                    <Box sx={{
                      pl: 1,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: 'right',
                    }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography>Report:</Typography>
                        <Typography>6Hrs</Typography>
                        <AntSwitch
                          onChange={(e) => handleOnShift(e)}
                          checked={shift}
                          inputProps={{ "aria-label": "ant design" }}
                        />
                        <Typography>9Hrs</Typography>
                      </Stack>
                    </Box>
                    <hr />
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
                    <Box sx={{
                      pl: 1,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: 'right',
                    }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography>Report:</Typography>
                        <Typography>6Hrs</Typography>
                        <AntSwitch
                          onChange={(e) => handleOnShift(e)}
                          checked={shift}
                          inputProps={{ "aria-label": "ant design" }}
                        />
                        <Typography>9Hrs</Typography>
                      </Stack>
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
                <Box sx={{
                  pl: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: 'right',
                }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Report:</Typography>
                    <Typography>6Hrs</Typography>
                    <AntSwitch
                      onChange={(e) => handleOnShift(e)}
                      checked={shift}
                      inputProps={{ "aria-label": "ant design" }}
                    />
                    <Typography>9Hrs</Typography>
                  </Stack>
                </Box>
                <Grid item xs={4} md={2}>
                  <Card sx={{ height: "100%" }}>
                    <Grid container spacing={3}>
                      <Grid item xs={6} md={12}>
                        <Box
                          sx={{
                            padding: "24px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "30px", // Match this height to the other Boxes
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
                        <hr />
                      </Grid>

                      <Grid item xs={6} md={12}>
                        <Box
                          sx={{
                            padding: "22px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "30px", // Set a fixed height or a percentage value
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
                        <hr />
                      </Grid>
                      <Grid item xs={6} md={12}>
                        <Box
                          sx={{
                            padding: "24px",
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
                        <hr />
                      </Grid>
                      <Grid item xs={6} md={12}>
                        <Box
                          sx={{
                            padding: "24px",
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
