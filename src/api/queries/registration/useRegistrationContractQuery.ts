import { useSuspenseQuery } from '@tanstack/react-query';
import registrationContractService from '@api/services/registrationContractService';
import { CommonResponse } from '@model/common/CommonResponse';
import {
  ServiceResponse,
  AdditionalServiceResponse,
} from '@api/services/registrationContractService';

// 서비스 목록 조회 쿼리
export const useServicesQuery = () => {
  return useSuspenseQuery({
    queryKey: ['services'],
    queryFn: () => registrationContractService.getServices(),
    select: (response: CommonResponse<ServiceResponse[]>) => {
      if (typeof response.data === 'string') return [];
      return response.data || [];
    },
  });
};

// 부가 서비스 목록 조회 쿼리
export const useAdditionalServicesQuery = () => {
  return useSuspenseQuery({
    queryKey: ['additionalServices'],
    queryFn: () => registrationContractService.getAdditionalServices(),
    select: (response: CommonResponse<AdditionalServiceResponse[]>) => {
      if (typeof response.data === 'string') return [];
      return response.data || [];
    },
  });
};
