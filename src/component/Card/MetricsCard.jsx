import React from 'react';
import { Card, Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';

const MetricsCard = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  const metrics = [
    { label: 'OVERALL TARGET', value: 155, background: '#241773' },
    { label: 'OVERALL ACTUAL', value: 120, background: '#3d860b' },
    { label: 'OVERALL UPH', value: 125, background: '#483456' },
    { label: 'DOWN TIME', value: 30, background: '#e1140a' },
  ];

  return (
    <Card>
      <Box
        sx={{
          width: '100%',
        }}
      >
        {metrics.map((metric, index) => (
          <Box
            sx={{
              backgroundColor: metric.background,
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottom: index < 3 && '2px solid #fff',
              padding: 5,
              height: '100%',
              textAlign: 'center',
            }}
          >
            <Typography sx={{ fontSize: '15px' }}>
              {metric.label}
              <br />
              <b style={{ fontSize: '30px' }}>{metric.value}</b>
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default MetricsCard;
