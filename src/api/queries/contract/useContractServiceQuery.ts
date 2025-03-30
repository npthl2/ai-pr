import { UseQueryOptions } from '@tanstack/react-query';

import { CommonResponse } from '@model/common/CommonResponse';
import contractService from '@api/services/contractService';
import { ContractServiceResponse } from '@model/Contract';
import { useReactQuery } from '@hooks/useReactQuery';

export const useContractServiceQuery = (
  contractId: string,
  options?: Omit<
    UseQueryOptions<CommonResponse<ContractServiceResponse>, unknown, ContractServiceResponse>,
    'queryKey' | 'queryFn' | 'select'
  >,
) => {
  return useReactQuery({
    queryKey: ['contractService', contractId],
    queryFn: () => contractService.getContractService(contractId),
    select: (response: CommonResponse<ContractServiceResponse>) => {
      if (response.successOrNot === 'N') return { additionalService: [] };
      if (typeof response.data === 'string') return { additionalService: [] };
      return response.data || { additionalService: [] };
    },
    staleTime: 0,
    gcTime: 0,
    ...options,
  });
};
