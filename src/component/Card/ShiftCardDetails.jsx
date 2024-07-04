import React from "react";
import { Box, Typography } from "@mui/material";
import CommonService from "../../utilities/CommonService";

const ShiftCardDetails = (props) => {
  return (
    <Box
      sx={{
        padding: "13px",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #0000001f",
      }}
    >
      <Typography
        style={{
          fontSize: "16px",
        }}
      >
        {props.title}
      </Typography>
      <Typography
        style={{
          fontSize: "16px",
          marginLeft: "auto",
          fontWeight: "bold",
        }}
      >
        {CommonService.convertIntoKiloPrefix(props.value)}
      </Typography>
      {props.index < 3 && <hr />}
    </Box>
  );
};

export default ShiftCardDetails;
