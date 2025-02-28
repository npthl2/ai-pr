import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MainContainer = styled(Box)({
  display: 'flex',
  width: '100%',
  height: 'calc(100vh - 64px)',
  overflow: 'hidden',
});

export const MainContent = styled(Box)({
  flexGrow: 1,
  overflow: 'auto',
});
