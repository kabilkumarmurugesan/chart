import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, IconButton } from "@mui/material";

const ArrowNavigation = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <IconButton
        disabled={props.disabledOne}
        onClick={() => {
          props.handaleEvent();
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton
        disabled={props.disabledTwo}
        onClick={() => props.handaleEvent()}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default ArrowNavigation;
