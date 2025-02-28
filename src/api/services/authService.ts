import { LoginRequestParams, LogoutResponse, AuthoritiesResponse } from '@model/Auth';
import { CommonResponse } from '@model/common/CommonResponse';

import baseService from './baseService';

const API_AUTH_URL = '/cca-be/v1/auth';

const authService = {
  // TODO : 로그인 처리 후 토큰 발급 로직 샘플
  login(data: LoginRequestParams) {
    // return baseService.post<LoginResponse, LoginRequestParams>(`${API_AUTH_URL}/login`, data);
    return Promise.resolve({
      successOrNot: 'Y',
      statusCode: 'SUCCESS',
      data: {
        accessToken: 'mock-token',
        memberInfo: {
          memberId: data.loginId,
          memberName: 'testuser',
          classOfPosition: 'test-class',
          memberGroup: 'test-group',
          authorities: ['ROLE_SEARCH_TEL_NO'],
        },
      },
    });
  },

  logout(): Promise<CommonResponse<LogoutResponse>> {
    return baseService.post<LogoutResponse, undefined>(`${API_AUTH_URL}/logout`, undefined);
  },

  getAuthorities(memberId: string): Promise<CommonResponse<AuthoritiesResponse>> {
    return baseService.get<AuthoritiesResponse>(`${API_AUTH_URL}/authorities/${memberId}`);
  },
};

export default authService;
