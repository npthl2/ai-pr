import { useState } from 'react';
import { Button, Box } from '@mui/material';
import viteLogo from '/vite.svg';
import reactLogo from './assets/react.svg';
import { styled } from '@mui/material/styles';

// Box 컴포넌트를 styled 방식으로 커스터마이징
const StyledBox = styled(Box)({
  backgroundColor: 'black',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '40px'
});

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

function App() {
  const [count, setCount] = useState(0);

  return (
    <StyledBox>
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
  );
}

export default App;
  