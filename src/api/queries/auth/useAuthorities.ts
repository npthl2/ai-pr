import { useQuery } from '@tanstack/react-query';
import authService from '@api/services/authService';
import useAuthStore from '@stores/AuthStore';

export const useAuthorities = (memberId: string) => {
    const { accessToken } = useAuthStore();

    return useQuery({
        queryKey: ['authorities', memberId],
        queryFn: () => authService.getAuthorities(memberId),
        enabled: !!accessToken && !!memberId,
    });
}; 