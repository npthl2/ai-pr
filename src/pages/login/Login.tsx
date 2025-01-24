import { useNavigate } from 'react-router-dom';
import useAuthStore from '@stores/AuthStore';
import { useState } from 'react';
import AuthService from '@/services/AuthService';
import { LoginContainer } from './Login.styled';
import LoginAlert from './components/LoginAlert';
import LoginForm from './components/LoginForm';
import { LoginError } from './Login.model';
import { LoginRequestParams } from '@/model/Auth';
import axios, { AxiosError } from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState<LoginRequestParams>({
    emailAddress: '',
    password: '',
  });
  const [error, setError] = useState<LoginError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleLogin = async () => {
    if (!formData.emailAddress || !formData.password) {
      setError({ field: 'general', message: '이메일과 비밀번호를 모두 입력해주세요.' });
      return;
    }

    try {
      setIsLoading(true);
      const response = await AuthService.login(formData);
      if (response.successOrNot === 'Y' && response.data) {
        login();
        navigate('/', { replace: true });
      } else {
        setError({
          field: 'general',
          message: typeof response.data === 'string' ? response.data : '로그인에 실패했습니다.',
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ data?: string }>;
        setError({
          field: 'general',
          message:
            `로그인에 실패했습니다. (${axiosError.response?.data?.data})` ||
            `로그인에 실패했습니다. (${axiosError.message})` ||
            '로그인에 실패했습니다.',
        });
      } else {
        setError({
          field: 'general',
          message: '로그인에 실패했습니다.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginAlert error={error} />
      <LoginForm
        formData={formData}
        isLoading={isLoading}
        onSubmit={handleLogin}
        onChange={handleChange}
      />
    </LoginContainer>
  );
};

export default Login;
