import { 
    LoginRequestParams, 
    LoginResponse,
    LogoutResponse,
    AuthoritiesResponse
} from '@model/Auth';
import { CommonResponse } from '@model/common/CommonResponse';
import baseService from './baseService';

const API_AUTH_URL = '/cca-be/v1/auth';

const authService = {
    login(data: LoginRequestParams): Promise<CommonResponse<LoginResponse>> {
        return baseService.post<LoginResponse, LoginRequestParams>(`${API_AUTH_URL}/login`, data);
    },

    logout(): Promise<CommonResponse<LogoutResponse>> {
        return baseService.post<LogoutResponse, undefined>(`${API_AUTH_URL}/logout`, undefined);
    },

    getAuthorities(memberId: string): Promise<CommonResponse<AuthoritiesResponse>> {
        return baseService.get<AuthoritiesResponse>(`${API_AUTH_URL}/authorities/${memberId}`);
    }
};

export default authService;
