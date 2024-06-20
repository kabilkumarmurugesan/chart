import React, { createContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

export const MUIWrapperContext = createContext({
  toggleColorMode: () => {},
});

export default function MUIWrapper({ children }) {
  const [mode, setMode] = useState('light');
  const primaryLight = {
    main: '#fcfcfe',
    pending: '#ffec31',
    complete: '#3D860B',
    incomplete: '#e1140a',
  };
  const primaryDark = {
    main: '#121212',
    pending: '#ffec31',
    complete: '#3D860B',
    incomplete: '#ff3199',
  };

  const secondaryLight = {
    main: '#ffffff',
  };
  const secondaryDark = {
    main: '#272727',
  };

  const toggleColorMode = useMemo(
    () => () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: mode === 'light' ? primaryLight : primaryDark,
          secondary: mode === 'light' ? secondaryLight : secondaryDark,
        },
      }),
    [mode],
  );

  return (
    <MUIWrapperContext.Provider value={{ toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </MUIWrapperContext.Provider>
  );
}
