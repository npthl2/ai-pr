import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ChipExampleContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));
