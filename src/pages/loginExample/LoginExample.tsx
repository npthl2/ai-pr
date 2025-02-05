import { useState } from 'react';
import { useLoginMutation } from '@/api/queries/auth/useLoginMutation';
import { LoginContainer } from './LoginExample.styled';
import LoginAlert from './components/LoginAlert';
import LoginForm from './components/LoginForm';
import { LoginError } from './LoginExample.model';
import { LoginRequestParams } from '@/model/Auth';
import { AxiosError } from 'axios';

const Login = () => {
  const [formData, setFormData] = useState<LoginRequestParams>({
    emailAddress: '',
    password: '',
  });
  const [error, setError] = useState<LoginError | null>(null);
  const loginMutation = useLoginMutation();

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
      await loginMutation.mutateAsync(formData);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError({
          field: 'general',
          message: err.response?.data?.data || err.message || '로그인에 실패했습니다.',
        });
      } else {
        setError({
          field: 'general',
          message: '로그인에 실패했습니다.',
        });
      }
    }
  };

  return (
    <LoginContainer>
      <LoginAlert error={error} />
      <LoginForm
        formData={formData}
        isLoading={loginMutation.isPending}
        onSubmit={handleLogin}
        onChange={handleChange}
      />
    </LoginContainer>
  );
};

export default Login;
