import { styled } from '@mui/material/styles';

export const LoginContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    gap: theme.spacing(2),
}));

export const FormContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    width: '300px',
}));

export const AlertContainer = styled('div')(({ theme }) => ({
    height: theme.spacing(6),
    width: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
})); 