import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FormContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: 8,
  border: `1px solid ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.grey[50],
  padding: 16,
  gap: 16,
}));

export const FormWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

export const LeftSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 24,
});

export const RightSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

export const FieldContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

export const FieldLabel = styled(Typography)(({ theme }) => ({
  minWidth: 60,
  height: 21,
  color: theme.palette.text.secondary,
}));
