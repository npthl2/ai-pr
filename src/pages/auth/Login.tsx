import { useState } from 'react';
import { useLoginMutation } from '@api/queries/auth/useLoginMutation';
import { LoginRequestParams } from '@model/Auth';
import {
  LoginContainer,
  LogoText,
  FormContainer,
  TitleContainer,
  Title,
  Subtitle,
} from './Login.styled';
import LoginForm from './components/LoginForm';
import { LoginError } from './Login.model';
import { getTheme } from '@theme/theme';

const Login = () => {
  // 로그인 폼 데이터 상태
  const [formData, setFormData] = useState<LoginRequestParams>({
    loginId: '',
    password: '',
  });
  // 각 필드별 및 일반 오류 메시지를 관리하는 상태
  const [errors, setErrors] = useState<LoginError>({});

  const loginMutation = useLoginMutation();

  // 입력값 변경 시 해당 필드의 오류 및 일반 오류를 초기화
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined, general: undefined }));
  };

  // 입력 필드에서 포커스 아웃 시, 값이 없으면 해당 필드의 오류 메시지를 설정
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        [name]: name === 'loginId' ? 'ID를 입력해주세요.' : 'Password를 입력해주세요.',
      }));
    }
  };

  // 로그인 버튼 클릭 시 실행되는 핸들러
  const handleLogin = async () => {
    // 입력값 검증
    if (!formData.loginId && !formData.password) {
      setErrors({ general: 'ID와 Password를 모두 입력해주세요.' });
      return;
    }
    if (!formData.loginId) {
      setErrors({ loginId: 'ID를 입력해주세요.' });
      return;
    }
    if (!formData.password) {
      setErrors({ password: 'Password를 입력해주세요.' });
      return;
    }

    try {
      await loginMutation.mutateAsync(formData);
    } catch (err) {
      if (err instanceof Error) {
        setErrors({ general: err.message });
      } else {
        setErrors({ general: '시스템 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
      }
    }
  };

  return (
    <LoginContainer>
      <LogoText theme={getTheme('light')}>R&R</LogoText>
      <FormContainer>
        <TitleContainer>
          <Title theme={getTheme('light')}>Welcome to R&R!</Title>
          <Subtitle theme={getTheme('light')}>Log in</Subtitle>
        </TitleContainer>
        <LoginForm
          formData={formData}
          isLoading={loginMutation.isPending}
          errors={errors}
          onSubmit={handleLogin}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormContainer>
    </LoginContainer>
  );
};

export default Login;
