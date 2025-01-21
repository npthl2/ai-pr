import axios from 'axios';
import useAuthStore from '../stores/AuthStore';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// 토큰은 시큐어 쿠키에 저장되어있다고 가정하여 withCredentials 옵션을 추가함
export const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청 인터셉터: DummyJSON API URL 처리(예시를 위해 추가한 것으로 실제 개발시에는 삭제 필요)
axiosInstance.interceptors.request.use(
  (config) => {
    // 완전한 URL(https://dummyjson.com)이 포함된 경우
    if (config.url?.includes('https://dummyjson.com')) {
      config.baseURL = ''; // baseURL을 비워서 전체 URL을 그대로 사용
      config.withCredentials = false; // DummyJSON API는 쿠키 인증 사용 안함
    } else {
      config.baseURL = baseURL; // 기본 baseURL 사용
      config.withCredentials = true; // 쿠키 인증 사용
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { logout } = useAuthStore.getState();

    if (error.response?.status === 401) {
      logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
