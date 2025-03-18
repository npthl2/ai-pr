import { Box } from '@mui/material';
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
