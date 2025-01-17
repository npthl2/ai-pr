import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CountButtonProps {
    count: number;
    onIncrement: () => void;
}

const StyledButton = styled(Button)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

const CountButton = ({ count, onIncrement }: CountButtonProps) => {
    return (
        <StyledButton
            variant="contained"
            onClick={onIncrement}
        >
            카운트 증가: {count}
        </StyledButton>
    );
};

export default CountButton;