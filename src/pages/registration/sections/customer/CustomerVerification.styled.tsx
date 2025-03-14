import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import Button from '@components/Button';

export const VerificationContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: '12px 24px',
  height: '52px',
}));

export const VerificationContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
});

export const VerificationGroup = styled(Box)<{ gap?: string }>(({ gap }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: gap || '8px',
}));

export const VerificationLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  variant: 'h6',
}));

export const VerificationStatus = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'success',
})<{
  success?: boolean;
}>(({ theme, success }) => ({
  color: success ? theme.palette.success.main : theme.palette.error.main,
  variant: 'h6',
}));

export const VerificationCheckButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  height: 28,
  padding: '0px 8px',
}));
