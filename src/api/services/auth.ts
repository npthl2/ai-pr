import { LoginRequestParams, User } from '@/model/Auth';
import { CommonResponse } from '@/model/common/CommonResponse';
import baseService from './baseService';

export const authService = {
  login(data: LoginRequestParams): Promise<CommonResponse<User>> {
    return baseService.post<User, LoginRequestParams>('/v1/session', data);
  },
};
