import { Alert } from '@mui/material';
import { AlertContainer } from '../Login.styled';
import { LoginError } from '../Login.model';

interface LoginAlertProps {
    error: LoginError | null;
}

const LoginAlert = ({ error }: LoginAlertProps) => {
    if (!error) return <AlertContainer />;

    return (
        <AlertContainer>
            <Alert
                severity={error.field === 'general' ? 'error' : 'warning'}
                sx={{ width: '100%' }}
            >
                {error.message}
            </Alert>
        </AlertContainer>
    );
};

export default LoginAlert; 