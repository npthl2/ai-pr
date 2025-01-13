import { useState, useMemo } from 'react';
import { Button, Box, IconButton, createTheme, ThemeProvider } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import viteLogo from '/vite.svg';
import reactLogo from './assets/react.svg';
import { styled } from '@mui/material/styles';

// Box 컴포넌트를 styled 방식으로 커스터마이징
const StyledBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '40px',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary
}));

// 로고들을 감싸는 컨테이너 추가
const LogoContainer = styled(Box)({
  display: 'flex',
  gap: '20px',
  alignItems: 'center'
});

// 이미지를 위한 styled 컴포넌트 추가
const LogoImage = styled('img')({
  height: '6em'
});

// 테마 토글 버튼을 위한 컨테이너
const ThemeToggleContainer = styled(Box)({
  position: 'absolute',
  top: '20px',
  right: '20px'
});

function App() {
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  // 테마 설정
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledBox>
        <ThemeToggleContainer>
          <IconButton onClick={toggleTheme} color="inherit">
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
        >
          카운트 증가: {count}
        </Button>
      </StyledBox>
    </ThemeProvider>
  );
}

export default App;
  