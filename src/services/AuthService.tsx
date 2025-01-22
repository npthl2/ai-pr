import { AxiosResponse } from 'axios';
import axiosInstance from '../api/axios';
import { GetUserResponse, LoginRequestParams, LoginResponse, LogoutResponse } from '@model/Auth';

const AuthService = {
  async login(data: LoginRequestParams): Promise<LoginResponse> {
    const response: AxiosResponse<LoginResponse> = await axiosInstance.post(
      'https://dummyjson.com/auth/login',
      { ...data },
    );

    if (!response.data.isSuccess) {
      throw new Error('로그인에 실패했습니다.');
    }

    return response.data;
  },

  async getCurrentUser(): Promise<GetUserResponse> {
    const response: AxiosResponse<GetUserResponse> = await axiosInstance.get(
      'https://dummyjson.com/auth/me',
    );

    if (!response.data.isSuccess) {
      throw new Error('사용자 정보를 가져오는데 실패했습니다.');
    }

    return response.data;
  },

  // DummyJSON에는 실제 로그아웃 엔드포인트가 없지만, 클라이언트 측에서 처리하기 위해 유지
  async logout(): Promise<LogoutResponse> {
    // 클라이언트 측 정리 작업만 수행
    // 예시를 위해 목업으로 처리
    return {
      isSuccess: true,
      status: 200,
      data: undefined,
    };
  },
};

export default AuthService;
