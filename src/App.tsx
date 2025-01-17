import { useState, useMemo } from 'react';
import { Box, IconButton, Button, ThemeProvider, CssBaseline } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { styled } from '@mui/material/styles';
import viteLogo from '/vite.svg';
import reactLogo from './assets/react.svg';
import useThemeStore from './stores/ThemeStore';
import { getTheme } from './theme/theme';

const StyledBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(5),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2.5),
  alignItems: 'center',
}));

const LogoImage = styled('img')(({ theme }) => ({
  height: '6em',
  '&:hover': {
    filter: `drop-shadow(0 0 2em ${theme.palette.primary.main}80)`,
  },
}));

const ThemeToggleContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2.5),
  right: theme.spacing(2.5),
}));

function App() {
  const [count, setCount] = useState(0);
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledBox>
        <ThemeToggleContainer>
          <IconButton onClick={toggleMode} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </ThemeToggleContainer>
        <LogoContainer>
          <LogoImage src={viteLogo} alt="Vite logo" />
          <LogoImage src={reactLogo} alt="React logo" />
        </LogoContainer>
        <Button
          variant="contained"
          onClick={() => setCount(prev => prev + 1)}
          sx={{
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          카운트 증가: {count}
        </Button>
      </StyledBox>
    </ThemeProvider>
  );
}

export default App;
