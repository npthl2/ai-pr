import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import viteLogo from '/vite.svg';
import reactLogo from '../../assets/react.svg';
import CountButton from './components/CountButton';

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

function Home() {
    const [count, setCount] = useState(0);

    return (
        <StyledBox>
            <LogoContainer>
                <LogoImage src={viteLogo} alt="Vite logo" />
                <LogoImage src={reactLogo} alt="React logo" />
            </LogoContainer>
            <CountButton
                count={count}
                onIncrement={() => setCount(prev => prev + 1)}
            />
        </StyledBox>
    );
}

export default Home; 