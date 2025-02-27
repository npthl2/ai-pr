import axios, { InternalAxiosRequestConfig } from 'axios';
//import useAuthStore from '../stores/AuthStore';

const baseURL = import.meta.env.VITE_API_URL;

// 토큰은 시큐어 쿠키에 저장되어있다고 가정하여 withCredentials 옵션을 추가함
export const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // TODO : 토큰 발급 후 헤더에 추가
    config.headers['X-Authorization-Id'] = '0';
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
    // const { logout } = useAuthStore.getState();

    // if (error.response?.status === 401) {
    //   logout();
    //   window.location.href = '/login';
    // }
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.request.use((config) => {
  // URL에서 도메인과 쿼리스트링을 제외한 경로만 추출
  const pathOnly = window.location.pathname + window.location.hash.replace(/\?.*$/, '');
  // 현재 페이지의 경로를 헤더에 추가
  config.headers['Source-Id'] = pathOnly;
  // TO-DO : 수정필요
  config.headers['X-Authorization-Id'] = 'cherry test';
  return config;
});

export default axiosInstance;
