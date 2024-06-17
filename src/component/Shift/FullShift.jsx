import React from "react";
import { Box, Card, Grid } from "@mui/material";
import BasicTable from "../Table/Table";
import BarChart from "../charts/BarChart";
import BarChartCopy from "../charts/BarChartCopy";
import ShiftHeader from "./ShiftHeader";

const FullShift = ({
  yesterdate,
  formatDate,
  secoundResponse,
  firstResponse,
  categories,
  shiftHours,
}) => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ minWidth: 275 }}>
            <ShiftHeader date={yesterdate} time={"09:00 PM - 05:30AM"} />
            <BarChart categories={categories} response={firstResponse} />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ minWidth: 275 }}>
            <ShiftHeader
              date={formatDate(new Date())}
              time={"09:00 AM - 05:30PM"}
            />
            <BarChartCopy
              animations={false}
              response={secoundResponse}
              categories={categories}
              shiftHours
            />
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          {firstResponse !== undefined && (
            <BasicTable response={firstResponse} />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {secoundResponse !== undefined && (
            <BasicTable response={secoundResponse.updatedData} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FullShift;
