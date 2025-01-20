import { useState } from 'react';
import viteLogo from '/vite.svg';
import reactLogo from '../../assets/react.svg';
import CountButton from './components/CountButton';
import { HomeContainer, LogoContainer, LogoImage } from './Home.styled';

function Home() {
    const [count, setCount] = useState(0);

    return (
        <HomeContainer>
            <LogoContainer>
                <LogoImage src={viteLogo} alt="Vite logo" />
                <LogoImage src={reactLogo} alt="React logo" />
            </LogoContainer>
            <CountButton
                count={count}
                onIncrement={() => setCount(prev => prev + 1)}
            />
        </HomeContainer>
    );
}

export default Home; 