import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { MUIWrapperContext } from "../MUIWrapper";
import CachedIcon from '@mui/icons-material/Cached';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function AppHeader({ handleRefresh, refreshRate, ShowShift, handleShiftUpdate }) {
  const theme = useTheme();
  const { toggleColorMode } =
    React.useContext(MUIWrapperContext);

  return (
    <Box style={{
      fontFamily: "sans-serif",
      textAlign: "center",
      fontWeight: "bold",
    }}
      sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar sx={{ height: 70 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{
              fontFamily: "sans-serif",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            LENOVO 24Hr UPH DASHBOARD
          </Typography>
          <Box sx={{
            p: 2, cursor: 'pointer'
          }} onClick={(e) => { handleShiftUpdate(e) }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box >
                {ShowShift === 'All' ? 'Shift'
                  : 'Day'}
              </Box>
              <CalendarMonthIcon />
            </Stack>
          </Box>

          <IconButton
            sx={{ fontSize: "1rem" }}
            onClick={handleRefresh}
            color="inherit"
            disableTouchRipple
            disableRipple
          >{refreshRate === 15000 ? '30' : '15'} sec
            <CachedIcon />
          </IconButton>
          <IconButton
            sx={{ fontSize: "1rem" }}
            onClick={toggleColorMode}
            color="inherit"
            disableTouchRipple
            disableRipple
          >
            {theme.palette.mode === "dark" ? (
              <span
                role="img"
                aria-label="sun"
                style={{
                  fontFamily: "sans-serif",
                  textAlign: "center",
                }}
              >
                Light ☀️
              </span>
            ) : (
              <span
                role="img"
                aria-label="moon"
                style={{
                  fontFamily: "sans-serif",
                  textAlign: "center",
                }}
              >
                Dark 🌚
              </span>
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
