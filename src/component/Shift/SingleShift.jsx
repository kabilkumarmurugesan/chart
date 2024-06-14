import React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import BasicTable from "../Table/Table";
import BasicAction from "../Card/BasicAction";
import BarChartCopy from "../charts/BarChartCopy";
import ShiftCardDetails from "../Card/ShiftCardDetails";
import ShiftHeader from "./ShiftHeader";

const SingleShift = ({ formatDate, ShiftCardDetailList }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={6} md={10}>
          <Card sx={{ minWidth: 275 }}>
            <ShiftHeader
              date={formatDate(new Date())}
              time={"09:00 AM - 05:30PM"}
            />
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
            <Box className="grid-container">
              <Box
                className="grid-item"
                style={{
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
                    // height: "100px", // Match this height to the other Boxes
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
              </Box>
              <Box
                className="grid-item"
                style={{
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
                    // height: "80px", // Set a fixed height or a percentage value
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
              </Box>
              <Box
                className="grid-item"
                style={{
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
                    // height: "80/px", // Match this height to the other Boxes
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
              </Box>
              <Box
                className="grid-item"
                style={{
                  background: "#e1140a",
                  color: "#fff",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // height: "25px", // Match this height to the other Boxes
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
              </Box>
            </Box>
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
      </Grid>
    </Box>
  );
};

export default SingleShift;