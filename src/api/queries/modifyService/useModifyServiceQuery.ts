// src/api/queries/modifyService/useModifyServiceQuery.ts
import { useSuspenseQuery } from '@tanstack/react-query';
import registrationContractService, { ServiceResponse } from '@api/services/registrationContractService';
import { CommonResponse } from '@model/common/CommonResponse';
import { Service as BaseService } from '@pages/registration/sections/contract/types';
import { AdditionalService as BaseAdditionalService } from '@pages/registration/sections/contract/types';

// SelectService 컴포넌트에서 사용할 Service 타입 확장
export interface Service extends BaseService {
  releaseDate: string;
}

// SelectService 컴포넌트에서 사용할 AdditionalService 타입 확장
export interface AdditionalService extends BaseAdditionalService {
  releaseDate: string;
}

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
    releaseDate: serviceResponse.validStartDateTime,
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
    releaseDate: serviceResponse.validStartDateTime,
  };
};