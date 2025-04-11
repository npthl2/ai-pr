import { Box, styled } from '@mui/material';

export const PromotionDialogContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  margin: '0 auto',
  overflow: 'auto',
  width: '100%',
  height: '100%',
});

export const DialogImageContainer = styled(Box)({
  width: '567px',
  minHeight: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '16px 0',
  margin: '0 auto',
  '& img': {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
});
