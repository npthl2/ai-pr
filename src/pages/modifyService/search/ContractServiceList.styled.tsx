import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

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
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
}));

export const ModalTitle = styled(Box)({
  marginBottom: '8px',
});

export const ContentWrapper = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const ButtonContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
  marginTop: 'auto',
});
