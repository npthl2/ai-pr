import { styled } from '@mui/material/styles';

export const BoardListContainer = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '800px',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const BoardItem = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
    cursor: 'pointer',
  },
}));

export const BoardTitle = styled('h2')(({ theme }) => ({
  margin: 0,
  marginBottom: theme.spacing(1),
  fontSize: '1.2rem',
  color: theme.palette.text.primary,
}));

export const BoardInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  color: theme.palette.text.secondary,
  fontSize: '0.9rem',
}));
