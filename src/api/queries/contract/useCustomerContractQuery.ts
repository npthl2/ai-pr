import { CommonResponse } from '@model/common/CommonResponse';
import contractService from '@api/services/contractService';
import { CustomerContractResponse } from '@model/Contract';
import { useReactQuery } from '@hooks/useReactQuery';
import { UseQueryOptions } from '@tanstack/react-query';

export const useCustomerContractQuery = (
  customerId: string,
  options?: Omit<
    UseQueryOptions<CommonResponse<CustomerContractResponse>, unknown, CustomerContractResponse>,
    'queryKey' | 'queryFn' | 'select'
  >,
) => {
  return useReactQuery({
    queryKey: ['customerContract', customerId],
    queryFn: () => contractService.getCustomerContract(customerId),
    select: (response: CommonResponse<CustomerContractResponse>) => {
      if (response.successOrNot === 'N') return { contracts: [] };
      if (typeof response.data === 'string') return { contracts: [] };
      return response.data || { contracts: [] };
    },
    staleTime: 0,
    gcTime: 0,
    ...options,
  });
};
