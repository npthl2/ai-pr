import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ButtonExampleContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(4),
  gap: theme.spacing(2),
}));
