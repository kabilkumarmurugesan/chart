import React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import BasicTable from "../Table/Table";
import BarChart from "../charts/BarChart";
import BarChartCopy from "../charts/BarChartCopy";
import ShiftHeader from "./ShiftHeader";

const FullShift = ({ yseterdate, formatDate }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ minWidth: 275 }}>
            <ShiftHeader date={yseterdate} time={"09:00 PM - 05:30AM"} />
            <BarChart />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ minWidth: 275 }}>
            <ShiftHeader
              date={formatDate(new Date())}
              time={"09:00 AM - 05:30PM"}
            />
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

export default FullShift;
