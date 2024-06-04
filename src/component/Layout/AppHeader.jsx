import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { MUIWrapperContext } from "../MUIWrapper";

export default function AppHeader() {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;
  const { locale, setLocale, toggleColorMode } =
    React.useContext(MUIWrapperContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar sx={{ height: 80 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}
          style={{fontFamily:"sans-serif",textAlign:"center", fontStyle:"oblique", fontWeight:"bold"}}>
            LENOVA 24Hr UPH DASHBOARD
          </Typography>

          <IconButton
            sx={{ fontSize: "1rem" }}
            onClick={toggleColorMode}
            color="inherit"
            disableTouchRipple
            disableRipple
          >
            {theme.palette.mode === "dark" ? (
              <span role="img" aria-label="sun" style={{fontFamily:"sans-serif",textAlign:"center", fontStyle:"oblique"}}>
                Light ☀️
              </span>
            ) : (
              <span role="img" aria-label="moon" style={{fontFamily:"sans-serif",textAlign:"center", fontStyle:"oblique"}}>
                Dark 🌚
              </span>
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
