import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MainContainer = styled(Box)({
  display: 'flex',
  minWidth: '1720px',
  maxWidth: '2560px',
  height: 'calc(100vh - 64px)',
});

export const MainContent = styled(Box)({
  flexGrow: 1,
});
