import { styled } from '@mui/material/styles';
import { Snackbar, Box, Typography } from '@mui/material';

export const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '300px',
  backgroundColor: '#333',
  borderRadius: '8px',
  textAlign: 'center',
  boxShadow: theme.shadows[3],
  padding: '16px 24px',
}));

export const SnackbarContentBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const SnackbarText = styled(Typography)({
  color: '#fff',
  fontSize: '16px',
});
