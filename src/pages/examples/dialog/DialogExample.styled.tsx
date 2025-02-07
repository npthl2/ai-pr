import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DialogExampleContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  alignItems: 'center',
}));

export const DialogWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
}));
