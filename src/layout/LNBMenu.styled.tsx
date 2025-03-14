import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@components/Button';

export const LNBMenuContainer = styled(Box)({
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
});

export const MainMenu = styled(Box)(({ theme }) => ({
  width: 92,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRight: `1px solid ${theme.palette.divider}`,
  padding: '20px 8px',
  gap: 10,
  alignItems: 'center',
  flexShrink: 0,
}));

export const SubMenu = styled(Box)(({ theme }) => ({
  width: 220,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRight: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  transformOrigin: 'left',
}));

export const SubMenuHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '13px 16px',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const SubMenuTitle = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 700,
  color: theme.palette.text.secondary,
}));

export const CloseButton = styled(Button)(({ theme }) => ({
  minWidth: 'auto',
  padding: '4px',
  '& .MuiSvgIcon-root': {
    fontSize: 20,
    color: theme.palette.action.active,
    transform: 'rotate(180deg)',
  },
}));

export const SubMenuContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 0',
});

export const SubMenuItem = styled(Button)(({ theme }) => ({
  width: '100%',
  height: 48,
  padding: '12px 16px',
  justifyContent: 'space-between',
  borderRadius: 0,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.selected': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiTypography-root': {
    color: theme.palette.text.primary,
  },
}));

export const LNBMenuItem = styled(Button)(({ theme }) => ({
  width: 56,
  height: 56,
  padding: '16px',
  justifyContent: 'center',
  borderRadius: 8,
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
  '&.selected': {
    backgroundColor: theme.palette.primary.main,
    '& .MuiSvgIcon-root': {
      color: theme.palette.common.white,
    },
  },
  '& .MuiSvgIcon-root': {
    fontSize: 24,
    color: theme.palette.text.primary,
  },
}));

export const StarIconButton = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  padding: '4px',
  '&:hover': {
    backgroundColor: 'transparent',
  },
});
