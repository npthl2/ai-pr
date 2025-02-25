import { styled } from '@mui/material/styles';
import { Box, Drawer } from '@mui/material';
import { Button } from '@components/Button';

export const PanelDrawer = styled(Drawer)({
  zIndex: 10000,
});

export const PanelCloseButton = styled(Button)({
  margin: '8px 8px 8px 0',
});

export const PanelBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});
