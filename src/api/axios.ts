import useAuthStore from '@stores/AuthStore';
import useToastStore from '@stores/ToastStore';
import axios, { InternalAxiosRequestConfig } from 'axios';
import { useNavigate } from 'react-router-dom';

const baseURL = import.meta.env.VITE_API_URL;
const xAuthorizationId = import.meta.env.VITE_X_AUTHORIZATION_ID;
const xAuthorizationRole = import.meta.env.VITE_X_AUTHORIZATION_ROLE;
const xClientIp = import.meta.env.VITE_X_CLIENT_IP;
const isLocal = import.meta.env.DEV;

const { openToast } = useToastStore.getState();

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

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { logout } = useAuthStore.getState();
    const navigate = useNavigate();

    if (error.response?.status === 401) {
      logout();
      window.location.href = '/login';
    }

    // 동시 로그인 시 로그인 페이지 이동
    if (
      error.response?.status === 403 &&
      error.response?.data?.errorCode === 'CMN_SEC_LOGIN_ANOTHER_USER'
    ) {
      logout();
      navigate('/login');
      openToast('다른 사용자가 로그인하여 로그아웃되었습니다.', 'error');

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }

    return Promise.reject(error);
  },
);

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (isLocal) {
      if (xAuthorizationId) {
        config.headers['X-Authorization-Id'] = xAuthorizationId;
      }
      if (xAuthorizationRole) {
        config.headers['X-Authorization-Role'] = xAuthorizationRole;
      }
      if (xClientIp) {
        config.headers['X-Client-IP'] = xClientIp;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.request.use((config) => {
  // URL에서 도메인과 쿼리스트링을 제외한 경로만 추출
  const pathOnly = window.location.pathname + window.location.hash.replace(/\?.*$/, '');
  // 현재 페이지의 경로를 헤더에 추가
  config.headers['Source-Id'] = pathOnly;
  return config;
});

export default axiosInstance;
