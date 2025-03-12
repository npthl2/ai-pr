import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import Button from '@components/Button';
export const VerificationContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: '12px 24px',
  gap: '24px',
  height: '52px',
  display: 'flex',
}));

export const VerificationContent = styled(Box)({
  display: 'flex',
  gap: 16,
  alignItems: 'center',
});

export const VerificationTitle = styled(Typography)({
  variant: 'h4',
});

export const VerificationLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  variant: 'h6',
}));

export const VerificationStatus = styled(Typography)<{ success?: boolean }>(
  ({ theme, success }) => ({
    color: success ? theme.palette.success.main : theme.palette.error.main,
    variant: 'h6',
  }),
);

export const VerificationCheckButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  height: 28,
}));
