import { CommonResponse } from './common/CommonResponse';

export interface LoginRequestParams {
  loginId: string;
  password: string;
}

export interface MemberInfo {
  memberId: string;
  memberName: string;
  classOfPosition: string;
  memberGroup: string;
  authorities: string[];
}

export interface LoginResponse {
  accessToken: string;
  memberInfo: MemberInfo;
}

export interface Authority {
  authorityId: string;
  authorityName: string;
  description: string;
}

export interface AuthoritiesResponse {
  memberId: string;
  authorities: Authority[];
}

export interface ApiError {
  message: string;
}

export interface LogoutResponse {
  message: string;
}

export interface LoginApiResponse extends CommonResponse<LoginResponse> {}
export interface LogoutApiResponse extends CommonResponse<LogoutResponse> {}
export interface AuthoritiesApiResponse extends CommonResponse<AuthoritiesResponse> {}
