import React from "react";
import { Box, Typography } from "@mui/material";

const ShiftHeader = (props) => {
  const { date, time } = props;

  const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12' && hours > 6
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return props.isCurrentShift && hours > 6 ? strTime : "00:00 ";
  };

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
        <b>Time:</b>
        {time}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography
          sx={{ p: 1 }}
          style={{
            fontSize: "15px",
          }}
        >
          <b> OT:</b> {formatAMPM(new Date())}
        </Typography>
      </Box>
    </Box>
  );
};

export default ShiftHeader;
