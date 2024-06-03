import React, { useEffect, useState } from "react";
import BarChart from "./charts/BarChart";
import { Box, Card, Grid } from "@mui/material";
import BasicTable from "./Table/Table";
import BarChartCopy from "./charts/BarChartCopy";
import SingleChart from "./charts/SingleChart";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "../MainLayout.css"; // Ensure this CSS file is correctly linked
import IconButton from "@mui/material/IconButton";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const MainLayout = () => {
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
                  <Card sx={{ minWidth: 275,}}>
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

export default MainLayout;

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

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
      }}
    >
      {theme.palette.mode} mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
}

export function ToggleColorMode() {
  const [mode, setMode] = useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MainLayout />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
