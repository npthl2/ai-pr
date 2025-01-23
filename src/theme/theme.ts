import { createTheme } from '@mui/material/styles';
import typography from './config/typography';

export const getTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: {
      primary: {
        main: '#3F51B5',
      },
      mode,
    },
    typography,
  });
};

// lebel 추가 필요
