import React, { useState, useContext } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { MUIWrapperContext } from '../MUIWrapper';
import CachedIcon from '@mui/icons-material/Cached';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import logo from '../../asset/img/Logo.png';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,.35)'
        : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

export default function AppHeader({
  handleRefresh,
  handleShiftDateUpdate,
  handleShiftUpdate,
  handleOnShift,
  handleOnDownTime,
  refreshRate,
  ShowShift,
  ShowShiftDate,
  shiftHours,
  isDownTime,
}) {
  const theme = useTheme();
  const { toggleColorMode } = useContext(MUIWrapperContext);
  const [showMenu, setShowMenu] = useState(true);

  return (
    <Box
      id="app-header"
      style={{
        fontFamily: 'sans-serif',
        textAlign: 'center',
        fontWeight: 'bold',
        background: '#04affb',
        color: '#fff',
      }}
      // sx={{ flexGrow: 1 }}
    >
      <AppBar
        position="static"
        color="default"
        onMouseEnter={() => setShowMenu(false)}
        onMouseLeave={() => setShowMenu(true)}
      >
        <Toolbar sx={{ height: 65, padding: '0px 10px 0px 0px' }}>
          <Box style={{ width: 180, height: 65 }}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: '100%', height: '100%' }}
            />
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{
              fontFamily: 'sans-serif',
              textAlign: 'left',
              fontWeight: 'bold',
              paddingLeft: '10px',
            }}
          >
            SMART MFG PRODUCTIVITY DASHBOARD
          </Typography>
          <Box
            sx={{
              pl: 1,
              display: showMenu ? 'none' : 'flex',
              flexDirection: 'row',
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box>DownTime Report:</Box>
              <Typography>2Hrs</Typography>
              <AntSwitch
                onChange={(e) => handleOnDownTime(e)}
                checked={isDownTime}
                inputProps={{ 'aria-label': 'ant design' }}
              />
              <Typography>Shift</Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              pl: 1,
              display: showMenu ? 'none' : 'flex',
              flexDirection: 'row',
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box>Report:</Box>
              <Typography>{ShowShift !== 'Day' ? '6Hrs' : '9hrs'}</Typography>
              <AntSwitch
                onChange={(e) => handleOnShift(e)}
                checked={shiftHours}
                inputProps={{ 'aria-label': 'ant design' }}
              />
              <Typography>{ShowShift !== 'Day' ? '9Hrs' : '12hrs'}</Typography>
            </Stack>
          </Box>
          <Box
            sx={{ p: 1, display: showMenu && 'none', cursor: 'pointer' }}
            onClick={(e) => {
              handleShiftDateUpdate(e);
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ width: '75px' }}>
                {ShowShiftDate === 'Yesterday' ? 'Today' : 'Yesterday'}
              </Box>
              <CalendarMonthIcon />
            </Stack>
          </Box>
          <Box
            sx={{ p: 1, display: showMenu && 'none', cursor: 'pointer' }}
            onClick={(e) => {
              handleShiftUpdate(e);
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ width: '45px' }}>
                {ShowShift === 'All' ? 'Shift' : 'Day'}
              </Box>
              <CalendarMonthIcon />
            </Stack>
          </Box>
          <IconButton
            sx={{ display: showMenu && 'none', fontSize: '1rem' }}
            onClick={handleRefresh}
            color="inherit"
            disableTouchRipple
            disableRipple
          >
            <Box>{refreshRate === 15000 ? '30' : '15'} sec</Box>
            <CachedIcon />
          </IconButton>
          <IconButton
            sx={{ fontSize: '1rem', display: showMenu && 'none' }}
            onClick={toggleColorMode}
            color="inherit"
            disableTouchRipple
            disableRipple
          >
            {theme.palette.mode === 'dark' ? (
              <span
                role="img"
                aria-label="sun"
                style={{
                  fontFamily: 'sans-serif',
                  textAlign: 'center',
                }}
              >
                Light ☀️
              </span>
            ) : (
              <span
                role="img"
                aria-label="moon"
                style={{
                  fontFamily: 'sans-serif',
                  textAlign: 'center',
                }}
              >
                Dark 🌚
              </span>
            )}
          </IconButton>{' '}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
