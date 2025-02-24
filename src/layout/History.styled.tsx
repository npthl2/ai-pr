import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const HistoryContainer = styled(Box)(({ theme }) => ({
  width: 320,
  backgroundColor: theme.palette.background.paper,
  borderRadius: '10px',
  boxShadow: theme.shadows[3],
  overflow: 'hidden',
  zIndex: 1,
}));

export const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
});

export const Content = styled(Box)({
  padding: '16px',
  minHeight: 200,
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
