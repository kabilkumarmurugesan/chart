import React from "react";
import { Card, Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";

const MetricsCard = ({ data }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Card>
      <Box
        sx={{
          width: "100%",
        }}
      >
        {data.map((metric, index) => (
          <Box
            key={index}
            className="overalltarget"
            sx={{
              backgroundColor: metric.background,
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: index < 3 && "2px solid #fff",
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontSize: "15px" }}>
              {metric.label}
              <br />
              <b style={{ fontSize: "30px" }}>{metric.value}</b>
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default MetricsCard;
