import { styled } from '@mui/material/styles';

export const LoginContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
});

export const FormContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    width: '300px',
}));

export const AlertContainer = styled('div')({
    height: '48px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
}); 