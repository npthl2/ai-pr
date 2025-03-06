import { useMutation } from '@tanstack/react-query';
import authService from '@api/services/authService';
import { AxiosError } from 'axios';
import useAuthStore from '@stores/AuthStore';
import useMemberStore from '@stores/MemberStore';
// import { useNavigate } from 'react-router-dom';

export const useLogoutMutation = () => {
  const { logout } = useAuthStore();
  const { clearMemberInfo } = useMemberStore();
  // const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: (response) => {
      if (response.successOrNot === 'Y') {
        logout();
        clearMemberInfo();
        // navigate('/login', { replace: true });
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error('Logout failed:', error.response?.data?.message || error.message);
    },
  });
};
