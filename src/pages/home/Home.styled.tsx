import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const HomeContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(5),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2.5),
  alignItems: 'center',
}));

export const LogoImage = styled('img')(({ theme }) => ({
  height: '6em',
  '&:hover': {
    filter: `drop-shadow(0 0 2em ${theme.palette.primary.main}80)`,
  },
}));
