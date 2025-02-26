import { useMutation } from '@tanstack/react-query';
import authService from '@api/services/authService';
import { LoginRequestParams, LoginResponse } from '@model/Auth';
import { AxiosError } from 'axios';
import useAuthStore from '@stores/AuthStore';
import useMemberStore from '@stores/MemberStore';
import { useNavigate } from 'react-router-dom';
import { CommonResponse } from '@model/common/CommonResponse';

type LoginErrorResponse = {
  errorMessage: string;
};

export const useLoginMutation = () => {
  const { setAccessToken } = useAuthStore();
  const { setMemberInfo } = useMemberStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: LoginRequestParams) => {
      const response = await authService.login(data);
      if (response.successOrNot !== 'Y') {
        const errorData = response.data as unknown as LoginErrorResponse;
        const errorMessage = errorData?.errorMessage || '아이디 또는 비밀번호가 일치하지 않습니다.';
        throw new Error(errorMessage);
      }
      return response;
    },
    onSuccess: (response: CommonResponse<LoginResponse>) => {
      if (response.data && typeof response.data !== 'string') {
        setAccessToken(response.data.accessToken);
        setMemberInfo(response.data.memberInfo);
        navigate('/', { replace: true });
      }
    },
    onError: (_error: AxiosError) => {
      throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
    },
  });
};
