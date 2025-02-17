import { styled } from '@mui/material/styles';

export const BoardItemContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  border: '1px solid #ddd',
  margin: '10px 0',
  borderRadius: '8px',
  backgroundColor: theme.palette.background.default,
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
}));

export const Title = styled('h3')(() => ({
  fontSize: '1.4em',
  marginBottom: '8px',
}));

export const Content = styled('p')(() => ({
  color: '#333',
  marginBottom: '8px',
  fontSize: '1em',
}));

export const Date = styled('span')(() => ({
  fontSize: '0.9em',
  color: '#888',
}));
