import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const UserSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  paddingLeft: 45,
  '& h1': {
    fontSize: '16px',
    fontWeight: 700,
    margin: 0,
  },
});

export const Navigation = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  paddingLeft: 24,
});
