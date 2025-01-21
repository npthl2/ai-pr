import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: {
      mode,
    },
    typography: {
      fontFamily: ['Noto Sans KR', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(','),
    },
  });
};
