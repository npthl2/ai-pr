import { CommonResponse } from './common/CommonResponse';

export interface LoginRequestParams {
  emailAddress: string;
  password: string;
}

export interface User {
  emailAddress: string;
  memberId: number;
  sessionId: string;
  memberName: string;
}

export interface MemberInfo {
  memberId: string;
  memberName: string;
  classOfPosition: string;
  memberGroup: string;
  authorities: string[];
}

export interface GetUserResponse extends CommonResponse<User> {}
export interface LogoutResponse extends CommonResponse<void> {}
