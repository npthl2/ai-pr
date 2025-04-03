import todayContractsService from '@api/services/todayContractsService';
import { ContractData } from '@model/Contract';
import { CommonResponse } from '@model/common/CommonResponse';
import { useQuery } from '@tanstack/react-query';

export const useTodayContracts = () => {
  return useQuery({
    queryKey: ['todayContracts'],
    queryFn: () => todayContractsService.getTodayContracts(),
    select: (response: CommonResponse<ContractData[]>) => {
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }
      return [];
    },
  });
};
