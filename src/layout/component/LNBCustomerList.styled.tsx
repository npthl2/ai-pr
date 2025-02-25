import { Box } from '@mui/material';
import { TabList } from '@mui/lab';
import { styled } from '@mui/material/styles';

export const LNBCustomerListContainer = styled(Box)({
  width: '100%',
  display: 'contents',
});

export const StyledTabList = styled(TabList)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  '& .MuiTabs-flexContainer': {
    gap: '20px',
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
