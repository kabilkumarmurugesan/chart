import React from 'react';
import { Box, Typography } from '@mui/material';

const ShiftCardDetails = (props) => {
  return (
    <Box
      sx={{
        padding: '13px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'left',
        borderBottom: '1px solid #0000001f',
      }}
    >
      <Typography
        style={{
          fontSize: '16px',
        }}
      >
        {props.title}:{props.value}
      </Typography>
      {props.index < 3 && <hr />}
    </Box>
  );
};

export default ShiftCardDetails;
