import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const LayoutContainer = styled(Box)({
  width: '100%',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
});

export const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 30,
  paddingRight: 24,
  height: '64px',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const Logo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '& h1': {
    fontSize: '16px',
    fontWeight: 700,
    margin: 0,
  },
});

export const HeaderRight = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginLeft: 'auto',
  '& .MuiIconButton-root': {
    borderRadius: 2,
    borderWidth: 1,
    height: 36,
    width: 36,
    border: '1px solid transparent',
    padding: 0,
    '& .MuiSvgIcon-root': {
      width: 22,
      height: 22,
    },
    '&:hover': {
      borderColor: theme.palette.action.hover,
      backgroundColor: 'initial',
    },
  },
}));
