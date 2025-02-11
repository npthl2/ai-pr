import { useQueries } from '@tanstack/react-query';
import apiTestService from '@api/services/apiTestService';
import { CommonResponse } from '@model/common/CommonResponse';

export const useApiTestQueries = () => {
  return useQueries({
    queries: [
      {
        queryKey: ['cca-test'],
        queryFn: () => apiTestService.getCcaTest(),
        select: (response: CommonResponse<string>) => response.data,
      },
      {
        queryKey: ['stg-test'],
        queryFn: () => apiTestService.getStgTest(),
        select: (response: CommonResponse<string>) => response.data,
      },
    ],
  });
};
