import { Box, styled } from '@mui/material';

export const TreeContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: '4px',
  height: '100%',
}));

export const TreeHeader = styled(Box)(({}) => ({
  paddingTop: '8px',
  paddingRight: '24px',
  paddingBottom: '8px',
  paddingLeft: '24px',
  display: 'flex',
  alignItems: 'center',
}));
