import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface FormContainerProps {
  completed?: boolean;
}

export const FormContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'completed',
})<FormContainerProps>(({ theme, completed }) => ({
  width: '100%',
  borderRadius: 8,
  border: completed ? 'none' : `1px solid ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.grey[50],
  padding: 16,
  gap: 16,
  display: 'flex',
  flexDirection: 'column',
  minWidth: 780,
}));

export const FormWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});
