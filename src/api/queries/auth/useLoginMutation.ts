import { useMutation } from '@tanstack/react-query';
import authService from '@/api/services/authService';
import { LoginRequestParams } from '@/model/Auth';
import { AxiosError } from 'axios';
import useAuthStore from '@stores/AuthStore';
import { useNavigate } from 'react-router-dom';

export const useLoginMutation = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequestParams) => authService.login(data),
    onSuccess: (response) => {
      if (response.successOrNot === 'Y' && response.data) {
        login();
        navigate('/', { replace: true });
      }
    },
    onError: (error: AxiosError) => {
      console.error('Login failed:', error);
    },
  });
};
