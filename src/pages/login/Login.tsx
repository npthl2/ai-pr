import { useState } from 'react';
import { useLoginMutation } from '@api/queries/auth/useLoginMutation';
import memberService from '@api/services/memberService';
import { LoginContainer } from './Login.styled';
import LoginForm from './components/LoginForm';
import { AxiosError } from 'axios';
import { LoginRequestParams, User } from '@model/Auth';
import { LoginError } from './Login.model';
import useAuthStore from '@stores/AuthStore';
import useMemberStore from '@stores/MemberStore';

const Login = () => {
  // 로그인 폼 데이터 상태
  const [formData, setFormData] = useState<LoginRequestParams>({
    memberId: '',
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
        [name]: name === 'memberId' ? 'ID를 입력해주세요.' : 'Password를 입력해주세요.',
      }));
    }
  };

  // 로그인 버튼 클릭 시 실행되는 핸들러
  const handleLogin = async () => {
    // 값이 비어 있는 경우 일반 오류 메시지 설정
    if (!formData.memberId || !formData.password) {
      setErrors({ general: 'ID와 Password를 모두 입력해주세요.' });
      return;
    }

    try {
      // 1. 로그인 API 호출 후 반환값을 변수에 할당
      const loginResponse = await loginMutation.mutateAsync(formData);
      const user: User = loginResponse.data; // 로그인 API에서 받은 사용자 기본 정보
      
      // 2. 추가로 사용자 권한 정보를 호출하여 가져옴
      const authResponse = await memberService.getMemberAuth(user.memberId);
      const permissions = authResponse.data; // MemberAuth 타입 (Permission 배열)

      // 3. 사용자 기본 정보와 권한 정보를 합쳐 user 객체 구성
      const userWithAuth: User = {
        ...user,
        auth: permissions, // User 타입에 auth 필드가 있다면 이와 같이 추가
      };

      // 4. 스토어 업데이트: 인증 상태와 사용자 정보를 설정
      useAuthStore.getState().login();
      useMemberStore.getState().setUser(userWithAuth);
      
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrors({
          general: err.response?.data?.data || err.message || '로그인에 실패했습니다.',
        });
      } else {
        setErrors({
          general: '로그인에 실패했습니다.',
        });
      }
    }
  };

  return (
    <LoginContainer>
      <LoginForm
        formData={formData}
        isLoading={loginMutation.isPending}
        errors={errors}
        onSubmit={handleLogin}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </LoginContainer>
  );
};

export default Login;
