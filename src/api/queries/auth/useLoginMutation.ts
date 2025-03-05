import { useMutation } from '@tanstack/react-query';
import authService from '@api/services/authService';
import { LoginRequestParams, LoginResponse, RawLoginResponse } from '@model/Auth';
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
        const errorMessage = errorData?.errorMessage || '로그인 계정 정보가 올바르지 않습니다.';
        throw new Error(errorMessage);
      }
      return response;
    },
    onSuccess: (response: CommonResponse<LoginResponse>) => {
      if (response.data && typeof response.data !== 'string') {

        const rawData = response.data as unknown as RawLoginResponse;
        
        const loginResponse: LoginResponse = {
          accessToken: rawData.accessToken,
          memberInfo: {
            ...rawData.member,
            authorities: rawData.authorities,
          },
    
        };
        setAccessToken(loginResponse.accessToken, loginResponse.memberInfo);
        setMemberInfo(loginResponse.memberInfo);
        navigate('/', { replace: true });
      }
    },
    onError: (_error: AxiosError) => {
      throw new Error('로그인 계정 정보가 올바르지 않습니다.');
    },
  });
};
