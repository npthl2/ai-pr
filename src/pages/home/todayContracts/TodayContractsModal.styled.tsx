import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@components/Dialog';

export const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    width: '1384px',
  },
  zIndex: '1600 !important',
});

export const ContentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});
