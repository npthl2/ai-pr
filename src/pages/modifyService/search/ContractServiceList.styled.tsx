import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 596,
  height: 278,
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  padding: '16px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
}));

export const ModalTitle = styled(Box)({
  height: 60,
});

export const TableHeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '14px',
  color: theme.palette.text.secondary,
}));

export const ContentWrapper = styled(Box)({
  height: 150,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginBottom: '4px',
});

export const ButtonContainer = styled(Box)({
  height: 68,
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
});
