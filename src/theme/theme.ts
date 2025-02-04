import { createTheme } from '@mui/material/styles';
import typography from './config/typography';
import { colors } from './config/colors';

export const getTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#1A2C37' : '#05151F',
        light: mode === 'dark' ? '#2A3F4D' : '#1A2C37',
        dark: mode === 'dark' ? '#05151F' : '#000F14',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: mode === 'dark' ? '#FF4D54' : '#FE2E36',
        light: mode === 'dark' ? '#FF6B71' : '#FF4D54',
        dark: mode === 'dark' ? '#FE2E36' : '#E62932',
        contrastText: '#FFFFFF',
      },
      grey: colors.grey[mode],
    },
    typography,
  });
};
