// src/api/queries/modifyService/useModifyServiceQuery.ts
import { Service as BaseService } from '@pages/registration/sections/contract/types';
import {
  ServiceModifiableResponse,
  AdditionalService,
} from '@model/modifyService/ModifyServiceModel';
import { useReactQuery } from '@hooks/useReactQuery';
import serviceModificationService, {
  ServiceResponseWithExclusiveQuery,
} from '@api/services/serviceModificationService';
import registrationContractService, {
  ServiceResponse,
} from '@api/services/registrationContractService';
import { CommonResponse } from '@model/common/CommonResponse';
import { ServiceAgeCheckResponse } from '@model/modifyService/ModifyServiceModel';

// SelectService 컴포넌트에서 사용할 Service 타입 확장
export interface Service extends BaseService {
  releaseDate: string;
}

// CustomerCurrentServiceResponse 타입 정의
export interface CustomerCurrentServiceResponse {
  currentService: Service;
  previousService?: Service;
}

// ServiceResponse를 Service로 변환하는 매핑 함수
const mapServiceResponseToService = (serviceResponse: ServiceResponse): Service => {
  return {
    serviceId: serviceResponse.serviceId,
    serviceName: serviceResponse.serviceName,
    serviceValue: Number(serviceResponse.serviceValue),
    serviceValueType: serviceResponse.serviceValueType,
    releaseDate: serviceResponse.validStartDatetime,
  };
};

// ServiceResponse를 AdditionalService로 변환하는 매핑 함수
const mapServiceResponseToAdditionalService = (
  serviceResponse: ServiceResponseWithExclusiveQuery,
): AdditionalService => {
  return {
    serviceId: serviceResponse.serviceId,
    serviceName: serviceResponse.serviceName,
    serviceType: 'ADDITIONAL',
    serviceValue: Number(serviceResponse.serviceValue),
    serviceValueType: serviceResponse.serviceValueType,
    exclusiveServiceIds: serviceResponse.exclusiveServiceIds || [],
    releaseDate: serviceResponse.validStartDatetime,
    availableAgeMin: serviceResponse.availableAgeMin?.toString(),
    availableAgeMax: serviceResponse.availableAgeMax?.toString(),
    hasAgeRestriction: serviceResponse.hasAgeRestriction,
    exclusive: serviceResponse.exclusive,
  };
};

/**
 * 요금제 변경 가능 여부 확인 쿼리 훅
 *
 * 고객의 계약 ID를 기반으로 현재 요금제 변경이 가능한지 여부를 확인하는 API를 호출합니다.
 * ServiceModification 컴포넌트에서 화면 진입 시 자동으로 호출되며,
 * 당월 요금제 변경 이력이 있는 경우 등 변경이 불가능한 상황에 대한 정보를 반환합니다.
 *
 * @param contractId - 계약 ID
 * @param enabled - 쿼리 자동 실행 여부 (기본값: false)
 * @returns 요금제 변경 가능 여부 확인 쿼리 결과
 *          - data: 요금제 변경 가능 여부 정보 (isModifiable, message 등)
 *          - isLoading: 로딩 상태
 *          - isError: 에러 발생 여부
 *          - error: 에러 정보
 */
export const useCheckServiceModifiableQuery = (contractId: string, enabled: boolean = false) => {
  return useReactQuery({
    queryKey: ['checkServiceModifiable', contractId],
    queryFn: () => serviceModificationService.checkServiceModifiable(contractId),
    select: (response: CommonResponse<ServiceModifiableResponse>) => {
      if (response.successOrNot === 'Y' && response.data && typeof response.data !== 'string') {
        return response.data;
      }

      // 응답이 성공적이지 않거나 data가 문자열인 경우 기본 에러 메시지 반환
      return {
        isModifiable: false,
        message:
          typeof response.data === 'string'
            ? response.data
            : '요금제 변경 가능 여부 확인 중 오류가 발생했습니다.',
        isRollbackAvailable: false,
        previousService: null,
      };
    },
    enabled: enabled && !!contractId, // API 호출 활성화 조건: enabled가 true이고 contractId가 존재하는 경우에만
    staleTime: 1000 * 60 * 5, // 5분
  });
};

// 서비스 목록 조회 쿼리
export const useServicesQuery = () => {
  return useReactQuery({
    queryKey: ['services'],
    queryFn: () => registrationContractService.getServices(),
    select: (response: CommonResponse<ServiceResponse[]>) => {
      if (typeof response.data === 'string') return [];
      return response.data ? response.data.map(mapServiceResponseToService) : [];
    },
  });
};

// 부가 서비스 목록 조회 쿼리
export const useAdditionalServicesWithExclusiveQuery = (
  age: number,
  serviceId: string,
  enabled: boolean = false,
) => {
  return useReactQuery({
    queryKey: ['additionalServicesWithExclusive', age, serviceId],
    queryFn: () =>
      serviceModificationService.getAdditionalServicesWithExclusiveQuery(age, serviceId),
    select: (response: CommonResponse<ServiceResponseWithExclusiveQuery[]>) => {
      if (typeof response.data === 'string') return [];
      return response.data ? response.data.map(mapServiceResponseToAdditionalService) : [];
    },
    enabled: enabled && !!age && !!serviceId,
  });
};

/**
 * 요금제 변경 나이 제한 확인 쿼리 훅
 *
 * 고객의 계약 ID와 변경하려는 서비스 ID를 기반으로
 * 나이 제한으로 인해 해당 요금제로 변경이 가능한지 여부를 확인하는 API를 호출합니다.
 *
 * @param age - 계약 ID
 * @param serviceId - 변경하려는 서비스 ID
 * @returns 요금제 변경 나이 제한 확인 쿼리 결과
 */
export const useCheckServiceAgeRestrictionQuery = (
  age: string,
  serviceId: string,
  enabled: boolean = false,
) => {
  return useReactQuery({
    queryKey: ['checkServiceAgeRestriction', age, serviceId],
    queryFn: () =>
      serviceModificationService.checkServiceAgeRestriction({
        age,
        serviceId,
      }),
    select: (response: CommonResponse<ServiceAgeCheckResponse>) => {
      if (typeof response.data === 'string') return [];
      return response.data;
    },
    enabled: enabled && !!age && !!serviceId,
  });
};
