import { useQuery } from '@tanstack/react-query';
import memoService from '@api/services/memoService';
import { isMemosResponse } from '@model/Memo';

export const useMemosQuery = (customerId: number) => {
  return useQuery({
    queryKey: ['memos', customerId],
    queryFn: () => memoService.getMemos(customerId),
    select: (response) => {
      if (isMemosResponse(response.data)) {
        return response.data;
      }
      return [];
    },
  });
};
