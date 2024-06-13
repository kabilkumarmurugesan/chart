import React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import BasicTable from "./Table/Table";
import BarChart from "./charts/BarChart";
import BarChartCopy from "./charts/BarChartCopy";

export const FullShift = ({ yseterdate, formatDate }) => {
  return (
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
  );
};
