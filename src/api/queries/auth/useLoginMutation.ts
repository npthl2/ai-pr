import { useMutation } from '@tanstack/react-query';
import authService from '@api/services/authService';
import { LoginRequestParams, LoginResponse } from '@model/Auth';
import { AxiosError } from 'axios';
import useAuthStore from '@stores/AuthStore';
import useMemberStore from '@stores/MemberStore';
import { useNavigate } from 'react-router-dom';
import { CommonResponse } from '@model/common/CommonResponse';

export const useLoginMutation = () => {
  const { setAccessToken } = useAuthStore();
  const { setMemberInfo } = useMemberStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequestParams) => authService.login(data),
    onSuccess: (response: CommonResponse<LoginResponse>) => {
      if (response.successOrNot === 'Y' && response.data && typeof response.data !== 'string') {
        setAccessToken(response.data.accessToken);
        setMemberInfo(response.data.memberInfo);
        navigate('/', { replace: true });
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error('Login failed:', error.response?.data?.message || error.message);
    },
  });
};
