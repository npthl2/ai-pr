import todayContractsService from '@api/services/todayContractsService';
import { useReactQuery } from '@hooks/useReactQuery';
import { ContractDataWithCustomer } from '@model/CustomerContract';
import { CommonResponse } from '@model/common/CommonResponse';

export const useTodayContracts = (memberId: string) => {
  return useReactQuery({
    queryKey: ['todayContracts', memberId],
    queryFn: () => todayContractsService.getTodayContracts(),
    select: (response: CommonResponse<ContractDataWithCustomer[]>) => {
      if (response?.data && Array.isArray(response.data)) {
        return response.data;
      }
      return [];
    },
  });
};
