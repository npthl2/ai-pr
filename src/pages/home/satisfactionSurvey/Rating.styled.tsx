import { Box, styled } from '@mui/material';

export const StarIconButton = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&:hover': { backgroundColor: 'transparent' },
});

export const RatingContainer = styled(Box)({ display: 'flex', alignItems: 'center', gap: '8px' });
