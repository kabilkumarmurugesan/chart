import React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import BasicTable from "../Table/Table";
import BarChart from "../charts/BarChart";
import BarChartCopy from "../charts/BarChartCopy";

const ShiftHeader = ({ date, time }) => {
  return (
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
        <b> Date:</b> {date}
      </Typography>{" "}
      <Typography
        style={{
          fontSize: "15px",
        }}
      >
        <b>Time:</b>{time}
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
    </Box>
  );
};

export default ShiftHeader;
