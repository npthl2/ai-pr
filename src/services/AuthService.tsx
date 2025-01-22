import { baseDummyService } from './BaseService';
import { LoginRequestParams, LogoutResponse, User } from '@model/Auth';

const AuthService = {
  async login(data: LoginRequestParams): Promise<User> {
    return await baseDummyService.post<User, LoginRequestParams>('/auth/login', data);
  },

  async getCurrentUser(): Promise<User> {
    return await baseDummyService.get<User>('/auth/me');
  },

  async logout(): Promise<LogoutResponse> {
    return {
      isSuccess: true,
      status: 200,
      data: undefined,
      message: '로그아웃 되었습니다.',
    };
  },
};

export default AuthService;
