// MUIWrapper.tsx

import { createTheme, ThemeProvider, PaletteMode } from '@mui/material';
import { createContext, useMemo, useState, useEffect } from 'react';

export const MUIWrapperContext = createContext({
  toggleColorMode: () => {},
});

export default function MUIWrapper({ children }) {
  const [mode, setMode] = useState('light');
  const [primary, setPrimary] = useState({
    main: '#fcfcfe',
    pending: '#ffec31',
    complete: '#3D860B',
    incomplete: '#e3004d',
  });
  const [secondary, setSecondary] = useState({
    main: 'rgb(255, 255, 255)',
  });
  const [locale, setLocale] = useState([0]);
  const muiWrapperUtils = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        if (mode !== 'dark') {
          setPrimary((prev) => ({
            main: '#111827',
            incomplete: '#ff3199',
            complete: '#3D860B',
            pending: '#ffec31',
          }));
          setSecondary((prev) => ({
            main: '#1f2937',
          }));
        } else {
          setPrimary((prev) => ({
            main: '#fcfcfe',
            complete: '#3D860B',
            incomplete: '#e3004d',
            pending: '#ffec31',
          }));
          setSecondary((prev) => ({
            main: 'rgb(255, 255, 255)',
          }));
        }
      },
    }),
    [mode],
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
            primary,
            secondary,
          },
        },
        locale.muiCore,
      ),
    [mode, locale],
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
