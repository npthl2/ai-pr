import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TableExampleContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  alignItems: 'center',
}));

export const TableWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 800,
  marginBottom: theme.spacing(4),
}));
