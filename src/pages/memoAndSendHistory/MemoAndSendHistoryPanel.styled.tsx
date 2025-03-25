import { styled } from '@mui/material/styles';
import { Box, Drawer, Container } from '@mui/material';
import { Button } from '@components/Button';

export const PanelDrawer = styled(Drawer)({
  zIndex: 2000,
});

export const PanelContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: '700px',
  },
  [theme.breakpoints.up('lg')]: {
    width: '900px',
  },
}));

export const OverlayBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'calc(100% - 700px)',
  },
  [theme.breakpoints.up('lg')]: {
    width: 'calc(100% - 900px)',
  },
  height: '100%',
}));

export const PanelCloseButton = styled(Button)({
  margin: '8px 8px 8px 0',
});

export const PanelBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});
