import { createTheme } from '@mui/material/styles';
import typography from './config/typography';

export const getTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: {
      primary: {
        main: mode === 'dark' ? '#3F51B5' : '#05151F',
      },
      grey: {
        50: '#F7F9FA',
        100: '#E5E8EB',
        200: '#D1D6DA',
        300: '#B8BFC6',
        400: '#9FA7B0',
        500: '#868F99',
        600: '#6E7782',
        700: '#585F69',
        800: '#3F464E',
        900: '#272E35',
      },
      mode,
    },
    typography,
  });
};

// lebel 추가 필요
