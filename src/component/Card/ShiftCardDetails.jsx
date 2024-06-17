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
        background: '#3b4c7d8a',
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
