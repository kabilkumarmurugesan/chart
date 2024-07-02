import React, { useState, useContext } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { MUIWrapperContext } from "../MUIWrapper";
import SyncIcon from "@mui/icons-material/Sync";
import SyncDisabledIcon from "@mui/icons-material/SyncDisabled";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import logo from "../../asset/img/Logo.png";
import ShiftContext from "./shiftContext";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
    boxSizing: "border-box",
  },
}));

export default function AppHeader() {
  const {
    handleShiftUpdate,
    handleRefresh,
    handleShiftDateUpdate,
    handleOnShift,
    handleShiftTarget,
    handleRefreshStatus,
    isSystem,
    refreshRate,
    ShowShift,
    ShowShiftDate,
    refreshStatus,
    shiftHours,
  } = useContext(ShiftContext);
  const theme = useTheme();
  const { toggleColorMode } = useContext(MUIWrapperContext);
  const [showMenu, setShowMenu] = useState(true);

  return (
    <Box
      id="app-header"
      style={{
        fontFamily: "sans-serif",
        textAlign: "center",
        fontWeight: "bold",
        background: "#04affb",
        color: "#fff",
      }}
    >
      <AppBar
        position="static"
        color="default"
        onMouseEnter={() => setShowMenu(false)}
        onMouseLeave={() => setShowMenu(true)}
      >
        <Toolbar sx={{ height: 65, padding: "0px 10px 0px 0px" }}>
          <Box style={{ margin: "0px 0px 0px -40px" }}>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "74%",
                height: "100%",
              }}
            />
          </Box>
          <Typography
            component="div"
            sx={{ flexGrow: 1 }}
            style={{
              fontFamily: "sans-serif",
              textAlign: "left",
              fontWeight: "bold",
              fontSize: "28px",
              paddingLeft: "10px",
            }}
          >
            SMART MFG PRODUCTIVITY DASHBOARD
          </Typography>
          <Box
            sx={{
              pl: 1,
              display: showMenu ? "none" : "flex",
              flexDirection: "row",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box>Target UPH:</Box>
              <Box>M</Box>
              <AntSwitch
                onChange={(e) => handleShiftTarget(e)}
                checked={isSystem}
                inputProps={{ "aria-label": "ant design" }}
              />
              <Box>S</Box>
            </Stack>
          </Box>
          <Box
            sx={{
              pl: 1,
              display: showMenu ? "none" : "flex",
              flexDirection: "row",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box>Shift (Hrs):</Box>
              <Box> 9</Box>
              <AntSwitch
                onChange={(e) => handleOnShift(e)}
                checked={shiftHours}
                inputProps={{ "aria-label": "ant design" }}
              />
              <Box>12</Box>
            </Stack>
          </Box>
          <Box
            sx={{
              pl: 1,
              display: showMenu ? "none" : "flex",
              flexDirection: "row",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box>Refresh (sec):</Box>
              <Box> 30</Box>
              <AntSwitch
                onChange={(e) => handleRefresh(e)}
                checked={refreshRate !== 30000}
                inputProps={{ "aria-label": "ant design" }}
              />
              <Box>45</Box>
            </Stack>
          </Box>
          <Box sx={{ p: 1, display: showMenu && "none", cursor: "pointer" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.paper",
                color: "text.secondary",
                "& span": {
                  m: 0.8,
                },
              }}
            >
              <span
                onClick={(e) => {
                  handleShiftDateUpdate(e);
                }}
                style={{
                  color:
                    ShowShiftDate === "Today"
                      ? "#eeaa0a"
                      : theme.palette.mode === "dark"
                      ? "white"
                      : "#646363bf",
                }}
              >
                Today
              </span>
              <Divider orientation="vertical" variant="middle" flexItem />
              <span
                onClick={(e) => {
                  handleShiftDateUpdate(e);
                }}
                style={{
                  color:
                    ShowShiftDate === "Yesterday"
                      ? "#eeaa0a"
                      : theme.palette.mode === "dark"
                      ? "white"
                      : "#646363bf",
                }}
              >
                Yesterday
              </span>
            </Box>
          </Box>
          <Box sx={{ p: 1, display: showMenu && "none", cursor: "pointer" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.paper",
                color: "text.secondary",
                "& span": {
                  m: 0.8,
                },
              }}
            >
              <span
                onClick={(e) => {
                  handleShiftUpdate("Shift");
                }}
                style={{
                  color:
                    ShowShift === "Shift"
                      ? "#eeaa0a"
                      : theme.palette.mode === "dark"
                      ? "#efeeeee0"
                      : "#646363bf",
                }}
              >
                Shift
              </span>
              <Divider orientation="vertical" variant="middle" flexItem />
              <span
                onClick={(e) => {
                  handleShiftUpdate("Day");
                }}
                style={{
                  color:
                    ShowShift === "Day"
                      ? "#eeaa0a"
                      : theme.palette.mode === "dark"
                      ? "#efeeeee0"
                      : "#646363bf",
                }}
              >
                Day
              </span>
            </Box>
          </Box>
          <IconButton
            sx={{ display: showMenu && "none", fontSize: "1rem" }}
            onClick={handleRefreshStatus}
            color="inherit"
            disableTouchRipple
            disableRipple
          >
            {refreshStatus ? <SyncIcon /> : <SyncDisabledIcon />}
          </IconButton>
          <IconButton
            sx={{ fontSize: "1rem", display: showMenu && "none" }}
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
          </IconButton>{" "}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
