import { Box, styled } from '@mui/material';

export const TitleContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}));

export const TitleWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const TitleBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}));
