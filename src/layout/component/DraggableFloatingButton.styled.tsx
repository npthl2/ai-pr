import { Box, CircularProgress, Fab } from '@mui/material';
import { red } from '@mui/material/colors';
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

export const ProgressWrapper = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 8,
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '18.2px',
    height: '18.2px',
    borderRadius: '50%',
    border: '1.92px solid white',
  },
});

export const StyledCircularProgress = styled(CircularProgress)({
  position: 'absolute',
  '& .MuiCircularProgress-svg': {
    position: 'relative',
    zIndex: 1,
  },
  '& .MuiCircularProgress-circle': {
    strokeWidth: 4,
  },
});

export const CountLabel = styled('span')({
  position: 'absolute',
  top: -20,
  right: -20,
  width: '14px',
  height: '14px',
  backgroundColor: red[400],
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '11px',
  fontWeight: 500,
  zIndex: 2,
});
