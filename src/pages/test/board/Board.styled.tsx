import { styled } from '@mui/material/styles';

export const BoardListContainer = styled('div')(() => ({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#fff',
}));

export const LoadingMessage = styled('div')(() => ({
  fontSize: '1.2em',
  color: '#666',
}));

export const ErrorMessage = styled('div')(() => ({
  color: 'red',
  fontSize: '1.2em',
  fontWeight: 'bold',
}));

export const BoardRegistButton = styled('button')(() => ({
  padding: '10px 15px',
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#45a049',
  },
}));
