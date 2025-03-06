import { Alert } from '@mui/material';
import { AlertContainer } from '../Login.styled';
import { LoginError } from '../Login.model';

interface LoginAlertProps {
  error: LoginError;
}

const LoginAlert = ({ error }: LoginAlertProps) => {
  // 일반 오류 메시지가 없으면 렌더링 x
  if (!error || !error.general) return null;

  return (
    <AlertContainer>
      <Alert severity='error' sx={{ width: '100%' }}>
        {error.general}
      </Alert>
    </AlertContainer>
  );
};

export default LoginAlert;
