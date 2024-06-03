// MUIWrapper.tsx

import { createTheme, ThemeProvider, PaletteMode } from "@mui/material";
import { createContext, useMemo, useState, useEffect } from "react";

export const MUIWrapperContext = createContext({
  toggleColorMode: () => {},
});

export default function MUIWrapper({ children }) {
  const [mode, setMode] = useState("light");
  const [locale, setLocale] = useState([0]);
  const muiWrapperUtils = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  useEffect(() => {
    document.dir = locale.direction;
  }, [locale.direction]);

  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode,
          },
        },
        locale.muiCore
      ),
    [mode, locale]
  );

  return (
    <MUIWrapperContext.Provider
      value={{
        toggleColorMode: muiWrapperUtils.toggleColorMode,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </MUIWrapperContext.Provider>
  );
}
