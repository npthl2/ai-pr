import { useQueries } from '@tanstack/react-query';
import apiTestService from '@api/services/apiTestService';

export const useApiTestQueries = () => {
  return useQueries({
    queries: [
      {
        queryKey: ['cca-test'],
        queryFn: () => apiTestService.getCcaTest(),
      },
      {
        queryKey: ['stg-test'],
        queryFn: () => apiTestService.getStgTest(),
      },
    ],
  });
};
