import { Outlet } from 'react-router-dom';
import { Box, IconButton, ThemeProvider, CssBaseline } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { styled } from '@mui/material/styles';
import useThemeStore from '@stores/ThemeStore';
import { getTheme } from '@/theme/theme';
import { useMemo } from 'react';

const ThemeToggleContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2.5),
  right: theme.spacing(2.5),
}));

const Layout = () => {
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <ThemeToggleContainer>
          <IconButton onClick={toggleMode} color='inherit'>
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </ThemeToggleContainer>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
