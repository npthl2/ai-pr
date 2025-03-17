import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { CommonResponse } from '@model/common/CommonResponse';
import contractService from '@api/services/contractService';
import { AvailableCustomerContractResponse } from '@model/Contract';

export const useAvailableCustomerContractQuery = (
  contractTabId: string,
  customerId: string,
  options?: Omit<
    UseQueryOptions<CommonResponse<AvailableCustomerContractResponse>, unknown, number>,
    'queryKey' | 'queryFn' | 'select'
  >,
) => {
  return useQuery({
    queryKey: ['availableCustomerContract', contractTabId, customerId],
    queryFn: () => contractService.getAvailableCustomerContractCount(customerId),
    select: (data: CommonResponse<AvailableCustomerContractResponse>) => {
      if (typeof data.data === 'string') return 0;
      return data.data?.availableCount || 0;
    },
    ...options,
  });
};
