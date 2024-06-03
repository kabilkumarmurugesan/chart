import React, { useEffect, useState } from "react";
import BarChart from "./charts/BarChart";
import { Box, Card, Grid, Typography } from "@mui/material";
import BasicTable from "./Table/Table";
import BasicAction from "./Card/BasicAction";
import BarChartCopy from "./charts/BarChartCopy";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "../MainLayout.css"; // Ensure this CSS file is correctly linked

const MainLayout = () => {
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
        timeout={500}
        classNames="zoom-fade"
        unmountOnExit
      >
        <Box className="zoom-fade-container">
          {currentSlide === 0 ? (
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ minWidth: 275 }}>
                    <Typography sx={{ p: 1 }}>Date - 29/05/2024</Typography>
                    <hr />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        p: 2,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ p: 1 }}>
                        Time - 09:00 AM - 05:30PM
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography sx={{ p: 1 }}>OT: 07:30PM</Typography>
                      </Box>
                    </Box>
                    <BarChart />
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ minWidth: 275 }}>
                    <Typography sx={{ p: 1 }}>Date - 30/05/2024</Typography>
                    <hr />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        p: 2,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {" "}
                      <Typography sx={{ p: 1 }}>
                        Time - 09:00 AM - 05:30PM
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography sx={{ p: 1 }}>OT: 07:30PM</Typography>
                      </Box>
                    </Box>
                    <BarChartCopy />
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
              <Grid container spacing={2} direction="column-reverse">
                <Grid item xs={12}>
                  <Card sx={{ minWidth: 275 }}>
                    <BarChartCopy />
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                      <Card sx={{ minWidth: 275 }}>
                        <Typography sx={{ p: 2 }}>Shift Actual: 15</Typography>
                      </Card>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Card sx={{ minWidth: 275 }}>
                        <Typography sx={{ p: 2 }}>Shift Target: 15</Typography>
                      </Card>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Card sx={{ minWidth: 275 }}>
                        <Typography sx={{ p: 2 }}>Shift UPH: 15</Typography>
                      </Card>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Card sx={{ minWidth: 275 }}>
                        <Typography sx={{ p: 2 }}>
                          Shift Down Time: 15
                        </Typography>
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

export default MainLayout;
