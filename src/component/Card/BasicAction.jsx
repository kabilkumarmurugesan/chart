import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

const BasicAction = () => {
  return (
    <Card>
      {/* <CardHeader title="Action - Supervised Inputs" /> */}
      <CardHeader title="Down Time - Inputs" />
      <CardContent>
        <Typography variant="h6">D.T - 10 mins</Typography>
        <Typography variant="body2" color="textSecondary">
          power issue
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BasicAction;
