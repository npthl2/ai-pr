import { useQuery } from '@tanstack/react-query';
import authService from '@api/services/authService';

export const useAuthorities = (memberId: string) => {
  return useQuery({
    queryKey: ['authorities', memberId],
    queryFn: () => authService.getAuthorities(memberId),
    enabled: !!memberId,
  });
};
