import { baseService } from './BaseService';
import { LoginRequestParams, User } from '@model/Auth';
import { CommonResponse } from '@model/common/CommonResponse';

const AuthService = {
  async login(data: LoginRequestParams): Promise<CommonResponse<User>> {
    return await baseService.post<User, LoginRequestParams>('/v1/session', data);
  },
};

export default AuthService;
