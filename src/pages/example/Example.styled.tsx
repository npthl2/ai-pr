import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ExampleContainer = styled(Stack)(({ theme }) => ({
    padding: theme.spacing(4),
    alignItems: 'center',
    gap: theme.spacing(2),
})); 