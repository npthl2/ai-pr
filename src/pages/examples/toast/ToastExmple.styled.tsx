import { styled } from '@mui/material/styles';

export const ToastExampleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  gap: theme.spacing(2),
}));
