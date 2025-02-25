import { Box, Fab } from '@mui/material';
import { styled } from '@mui/material/styles';

export const HistoryWrapper = styled(Box)({
  position: 'fixed',
  right: -321,
  display: 'flex',
  alignItems: 'flex-start',
  transform: 'translateX(0)',
  transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
  zIndex: 2,
  '&.show': {
    transform: 'translateX(-320px)',
  },
});

export const FloatingButton = styled(Fab)(({ theme }) => ({
  position: 'relative',
  width: 64,
  height: 56,
  borderRadius: '10px 0 0 10px',
  backgroundColor: theme.palette.primary.light,
  boxShadow: theme.shadows[3],
  minHeight: 'auto',
  marginRight: -8,
  zIndex: 0,
  cursor: 'grab',
  '&:active': {
    cursor: 'grabbing',
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.common.white,
    marginRight: 8,
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));
