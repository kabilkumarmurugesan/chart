import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const ShiftHeader = (props) => {
  const { date, cardData, time, overTimeRange } = props;

  const [overTime, setOverTime] = useState(cardData.overTime);

  useEffect(() => {
    props.isCurrentShift &&
      props.cardData &&
      setOverTime(
        overTimeRange
          ? overTimeRange
          : cardData?.overTime !== undefined
          ? cardData?.overTime
          : formatAMPM(new Date())
      );
  }, [cardData]);

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
        <b>Shift Time: </b>
        {time}
      </Typography>
      {props.cardData && (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography
            sx={{ p: 1 }}
            style={{
              fontSize: "15px",
            }}
          >
            <b> OT: </b> {overTime}{" "}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ShiftHeader;
