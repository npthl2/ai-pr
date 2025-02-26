import { useQuery } from '@tanstack/react-query';
import memoService from '@api/services/memoService';
import { isMemosResponse } from '@model/Memo';

export const useMemosQuery = (customerId: string, page: number) => {
  return useQuery({
    queryKey: ['memos', customerId, page],
    queryFn: () => memoService.getMemos(customerId, page),
    select: (response) => {
      if (isMemosResponse(response.data)) {
        return response.data;
      }
      return [];
    },
  });
};
