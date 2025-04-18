import { Box } from '@mui/material';
import { TabList } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const LNBCustomerListContainer = styled(Box)({
  width: '100%',
  display: 'contents',
});

export const StyledTabList = styled(TabList)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: 'calc(100vh - 200px)',
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  '& .MuiTabs-flexContainer': {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    height: '100%',
    overflow: 'overlay',
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
      borderRadius: '3px',
    },
    '&:hover::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
  },

  '& .MuiTab-root': {
    minHeight: 53,
    padding: '16px 0',
    borderLeft: '4px solid white',
    borderRight: '4px solid white',
    borderRadius: '8px',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

export const CustomerName = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shorter,
    easing: theme.transitions.easing.easeInOut,
  }),
  '&.hovered': {
    transform: 'translateX(-10px)',
  },
  '&.selected': {
    fontWeight: 700,
  },
}));
