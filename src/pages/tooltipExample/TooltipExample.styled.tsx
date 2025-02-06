import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TooltipExampleContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

export const TooltipWrapper = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(4),
  margin: 'auto',
}));
