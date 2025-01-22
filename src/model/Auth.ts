import { CommonResponse } from './common/CommonResponse';

export interface LoginRequestParams {
  username: string;
  password: string;
}

export interface LoginSuccess {
  message: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export interface LoginResponse extends CommonResponse<LoginSuccess> {}
export interface GetUserResponse extends CommonResponse<User> {}
export interface LogoutResponse extends CommonResponse<void> {}
