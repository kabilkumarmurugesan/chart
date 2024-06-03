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
  const { locale, setLocale, toggleColorMode } =
    React.useContext(MUIWrapperContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar sx={{ height: 80 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LENOVA 24Hr UPH DASHBOAD
          </Typography>

          <IconButton
            sx={{ fontSize: "1rem" }}
            onClick={toggleColorMode}
            color="inherit"
            disableTouchRipple
            disableRipple
          >
            {theme.palette.mode === "dark" ? (
              <span role="img" aria-label="sun">
                Go Light ☀️
              </span>
            ) : (
              <span role="img" aria-label="moon">
                Go Dark 🌚
              </span>
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
