import { useSuspenseQuery } from '@tanstack/react-query';
import registrationContractService from '@api/services/registrationContractService';
import { CommonResponse } from '@model/common/CommonResponse';
import { ServiceResponse } from '@api/services/registrationContractService';
import { AdditionalService, Service } from '@pages/registration/sections/contract/types';

// 서비스 목록 조회 쿼리
export const useServicesQuery = () => {
  return useSuspenseQuery({
    queryKey: ['services'],
    queryFn: () => registrationContractService.getServices(),
    select: (response: CommonResponse<ServiceResponse[]>) => {
      if (typeof response.data === 'string') return [];
      return response.data ? response.data.map(mapServiceResponseToService) : [];
    },
  });
};

// 부가 서비스 목록 조회 쿼리
export const useAdditionalServicesQuery = () => {
  return useSuspenseQuery({
    queryKey: ['additionalServices'],
    queryFn: () => registrationContractService.getAdditionalServices(),
    select: (response: CommonResponse<ServiceResponse[]>) => {
      if (typeof response.data === 'string') return [];
      return response.data ? response.data.map(mapServiceResponseToAdditionalService) : [];
    },
  });
};

const mapServiceResponseToService = (serviceResponse: ServiceResponse): Service => {
  return {
    serviceId: serviceResponse.serviceId,
    serviceName: serviceResponse.serviceName,
    serviceValue: Number(serviceResponse.serviceValue),
    serviceValueType: serviceResponse.serviceValueType,
  };
};

const mapServiceResponseToAdditionalService = (
  serviceResponse: ServiceResponse,
): AdditionalService => {
  return {
    serviceId: serviceResponse.serviceId,
    serviceName: serviceResponse.serviceName,
    serviceValue: Number(serviceResponse.serviceValue),
    serviceValueType: serviceResponse.serviceValueType,
    exclusiveServiceIds: serviceResponse.exclusiveServiceIds,
  };
};
