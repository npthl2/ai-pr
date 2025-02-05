import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SelectExampleContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

export const SelectWrapper = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: theme.spacing(3),
  width: '100%',
  '& > *': {
    minWidth: '250px',
  },
}));

export const ComponentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const ComponentTitle = styled(Typography)({
  fontWeight: 500,
  gridColumn: '1 / -1',
});
