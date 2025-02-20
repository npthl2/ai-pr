import { LoginRequestParams, User } from '@model/Auth';
import { CommonResponse } from '@model/common/CommonResponse';
import baseService from './baseService';

const authService = {
  login(data: LoginRequestParams): Promise<CommonResponse<User>> {
    return baseService.post<User, LoginRequestParams>('/api/v1/session', data);
  },
};

export default authService;
