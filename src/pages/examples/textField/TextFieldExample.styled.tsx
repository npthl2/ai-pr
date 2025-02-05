import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TextFieldExampleContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

export const TextFieldWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  width: '100%',
}));

export const ComponentTitle = styled(Typography)({
  fontWeight: 500,
  gridColumn: '1 / -1',
});
