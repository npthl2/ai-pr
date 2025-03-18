import { Box, IconButton, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ContentsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
});

export const Header = styled(Box)({
  width: '100%',
  height: 48,
  backgroundColor: '#E5E8EB',
  padding: '5px 10px',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  paddingBottom: 0,
});

export const ContentsBG = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.background.default,
  overflow: 'auto',
}));

export const StyledTabs = styled(Tabs)({
  minHeight: 43,
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  '& .MuiTabs-flexContainer': {
    gap: '1px',
  },
  marginBottom: -1,
});

export const StyledTab = styled(Tab)({
  minHeight: 43,
  padding: '11.5px 16px',
  color: '#566474',
  backgroundColor: 'transparent',
  textTransform: 'none',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  '& .MuiTab-wrapper': {
    alignItems: 'flex-start',
  },
  '&.Mui-selected': {
    color: '#272E35',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px 12px 0 0',
    position: 'relative',
    zIndex: 1,
    height: 44,
    boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.08)',
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      width: 12,
      height: 12,
      backgroundColor: '#E5E8EB',
      boxShadow: 'inset 0px -4px 8px rgba(0, 0, 0, 0.08)',
    },
    '&::before': {
      left: -12,
      borderTopRightRadius: 12,
      borderBottomLeftRadius: 12,
      transform: 'translateY(1px)',
    },
    '&::after': {
      right: -12,
      borderTopLeftRadius: 12,
      borderBottomRightRadius: 12,
      transform: 'translateY(1px)',
    },
  },
  '&:not(.Mui-selected):hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export const TabLabel = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  width: '100%',
  justifyContent: 'space-between',
});

export const TabCloseButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  padding: 2,
  '& .MuiSvgIcon-root': {
    fontSize: 16,
    color: '#566474',
  },
  '&:hover': {
    backgroundColor: theme.palette.grey[50],
  },
}));

export const TabActions = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  alignSelf: 'center',
  gap: 4,
  height: '100%',
  paddingBottom: 8,
});

export const ActionButton = styled(IconButton)({
  padding: 6,
  '& .MuiSvgIcon-root': {
    fontSize: 16,
    color: '#566474',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export const CloseAllButton = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  cursor: 'pointer',
  padding: '6px 8px',
  borderRadius: 4,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 16,
    color: '#566474',
  },
  '& .MuiTypography-root': {
    color: '#566474',
  },
});

export const ContentHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  height: 59,
}));

export const StarIconButton = styled(Box)(({ theme }) => ({
  minWidth: 'auto',
  color: theme.palette.action.active,
  '&:hover': {
    backgroundColor: 'transparent',
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  padding: '4px',
}));
