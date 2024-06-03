import React, { useEffect, useState } from "react";
import BarChart from "../charts/BarChart";
import { Box, Card, Grid } from "@mui/material";
import BasicTable from "../Table/Table";
import BarChartCopy from "../charts/BarChartCopy";
import SingleChart from "../charts/SingleChart";
import { CSSTransition, SwitchTransition } from "react-transition-group";
// import "../MainLayout.css"; // Ensure this CSS file is correctly linked

const AppContainer = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 2);
      // setCurrentSlide((prevSlide) => 1);
    }, 14000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SwitchTransition>
      <CSSTransition
        key={currentSlide}
        timeout={500}
        classNames="zoom-fade"
        unmountOnExit
      >
        <Box className="zoom-fade-container">
          {currentSlide === 0 ? (
            <>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "20px 20px 0px 20px",
                }}
              >
                <Box style={{ flex: "1 1 10%", padding: "20px 20px 0px 20px" }}>
                  <Card sx={{ minWidth: 275  }}>
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: "10px",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        style={{
                          padding: "5px",
                          color: "#ff7f0e",
                          fontWeight: "bold",
                        }}
                      >
                        Shift - 2
                      </Box>
                      <Box
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          padding: "10px",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box style={{ padding: "5px" }}>Data- 29/05/2024</Box>
                        <Box style={{ padding: "5px" }}>Time - 07:30</Box>
                      </Box>
                    </Box>
                    <BarChart />
                  </Card>{" "}
                </Box>
                <Box style={{ flex: "1 1 10%", padding: "20px 20px 0px 20px" }}>
                  <Card sx={{ minWidth: 275 }}>
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: "10px",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        style={{
                          padding: "5px",
                          color: "#ff7f0e",
                          fontWeight: "bold",
                        }}
                      >
                        Shift - 1
                      </Box>

                      <Box
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          padding: "10px",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box style={{ padding: "5px" }}>Data- 30/05/2024</Box>
                        <Box style={{ padding: "5px" }}>Time - 07:30</Box>{" "}
                      </Box>
                    </Box>
                    <BarChartCopy />
                  </Card>{" "}
                </Box>
              </Box>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "20px",
                  }}
                >
                  <Box style={{ flex: "1 1", padding: "20px" }}>
                    <BasicTable />
                  </Box>
                  <Box style={{ flex: "1 1", padding: "20px" }}>
                    <BasicTable />
                  </Box>
                </Box>
              </Box>
            </>
          ) : (
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "20px",
              }}
            >
              <Box style={{ flex: "1 2 50%", padding: "20px" }}>
                <Card sx={{ minWidth: 275 }}>
                  <BarChartCopy />
                </Card>
              </Box>
              <Box style={{ flex: "1 1", padding: "20px" }}>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                      <CardElement title={"Shift Actual"} value={"15"} />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <CardElement title={"Shift Target"} value={"15"} />
                    </Grid>{" "}
                    <Grid item xs={6} md={6}>
                      <CardElement title={"Shift UPH"} value={"15"} />
                    </Grid>{" "}
                    <Grid item xs={6} md={6}>
                      <CardElement title={"Shift Down Time"} value={"15"} />
                    </Grid>
                  </Grid>
                </Box>
                <Box style={{ flex: "1 2", padding: "20px" }}>
                  <Card sx={{ minWidth: 275, padding: "20px" }}>
                    <SingleChart />
                  </Card>
                </Box>
              </Box>
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
