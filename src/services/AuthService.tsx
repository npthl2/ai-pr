import { AxiosResponse } from 'axios';
import axiosInstance from '../api/axios';
import { LoginRequest, User } from '@/model/auth';

const AuthService = {
    async login(data: LoginRequest): Promise<User> {
        const response: AxiosResponse<User> = await axiosInstance.post('https://dummyjson.com/auth/login', {
            username: data.username,
            password: data.password,
        });
        return response.data;
    },

    async getCurrentUser(): Promise<User> {
        const response: AxiosResponse<User> = await axiosInstance.get('https://dummyjson.com/auth/me');
        return response.data;
    },

    // DummyJSON에는 실제 로그아웃 엔드포인트가 없지만, 클라이언트 측에서 처리하기 위해 유지
    async logout(): Promise<void> {
        // 클라이언트 측 정리 작업만 수행
    }
};

export default AuthService; 