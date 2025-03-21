// src/api/queries/modifyService/useModifyServiceQuery.ts
import { Service as BaseService } from '@pages/registration/sections/contract/types';
import { AdditionalService as BaseAdditionalService } from '@pages/registration/sections/contract/types';
import { ServiceModifiableResponse } from '@model/modifyService/ModifyServiceModel';
import { useReactQuery } from '@hooks/useReactQuery';
import serviceModificationService from '@api/services/serviceModificationService';
import registrationContractService, {
  ServiceResponse,
} from '@api/services/registrationContractService';
import { CommonResponse } from '@model/common/CommonResponse';

// SelectService 컴포넌트에서 사용할 Service 타입 확장
export interface Service extends BaseService {
  releaseDate: string;
}

// SelectService 컴포넌트에서 사용할 AdditionalService 타입 확장
export interface AdditionalService extends BaseAdditionalService {
  releaseDate: string;
}

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
    releaseDate: serviceResponse.validStartDateTime || '',
  };
};

// ServiceResponse를 AdditionalService로 변환하는 매핑 함수
const mapServiceResponseToAdditionalService = (
  serviceResponse: ServiceResponse,
): AdditionalService => {
  return {
    serviceId: serviceResponse.serviceId,
    serviceName: serviceResponse.serviceName,
    serviceValue: Number(serviceResponse.serviceValue),
    serviceValueType: serviceResponse.serviceValueType,
    exclusiveServiceIds: serviceResponse.exclusiveServiceIds || [],
    releaseDate: serviceResponse.validStartDateTime || '',
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
        isChangedToday: false,
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
    staleTime: 1000 * 60 * 5, // 5분
  });
};

// 부가 서비스 목록 조회 쿼리
export const useAdditionalServicesQuery = () => {
  return useReactQuery({
    queryKey: ['additionalServices'],
    queryFn: () => registrationContractService.getAdditionalServices(),
    select: (response: CommonResponse<ServiceResponse[]>) => {
      if (typeof response.data === 'string') return [];
      return response.data ? response.data.map(mapServiceResponseToAdditionalService) : [];
    },
    staleTime: 1000 * 60 * 5, // 5분
  });
};

// 현재 고객의 서비스 정보 조회 API 쿼리
export const useCustomerCurrentServiceQuery = (contractId: string) => {
  return useReactQuery({
    queryKey: ['customerCurrentService', contractId],
    queryFn: (): CustomerCurrentServiceResponse => {
      if (!contractId) {
        throw new Error('계약 정보가 없습니다.');
      }

      // MOCK API 응답
      // 실제 구현 시 아래 코드를 API 호출로 대체
      // const { data } = await axios.get(`/api/contracts/${contractId}/current-service`);

      // 임시 데이터 - 현재 서비스와 이전 서비스 정보
      return {
        currentService: {
          serviceId: '3',
          serviceName: '5G 라이트 요금제',
          serviceValue: 69000,
          serviceValueType: 'monthly',
          releaseDate: '2023-02-01',
        },
        previousService: {
          serviceId: '5',
          serviceName: 'LTE 무제한 요금제',
          serviceValue: 85000,
          serviceValueType: 'monthly',
          releaseDate: '2022-12-01',
        },
      };
    },
    enabled: !!contractId,
    staleTime: 1000 * 60 * 5, // 5분
  });
};

// 아래 함수들은 현재 사용되지 않지만, 향후 실제 API 연동 시 사용될 수 있어 주석 처리하여 보존합니다.
// export interface ServiceResponse {
//   serviceId: string;
//   serviceName: string;
//   serviceValue: string;
//   serviceValueType: string;
//   validStartDateTime?: string;
//   exclusiveServiceIds?: string[];
// }

// const mapServiceResponseToService = (serviceResponse: ServiceResponse): Service => {
//   return {
//     serviceId: serviceResponse.serviceId,
//     serviceName: serviceResponse.serviceName,
//     serviceValue: Number(serviceResponse.serviceValue),
//     serviceValueType: serviceResponse.serviceValueType,
//     releaseDate: serviceResponse.validStartDateTime || '',
//   };
// };

// const mapServiceResponseToAdditionalService = (
//   serviceResponse: ServiceResponse,
// ): AdditionalService => {
//   return {
//     serviceId: serviceResponse.serviceId,
//     serviceName: serviceResponse.serviceName,
//     serviceValue: Number(serviceResponse.serviceValue),
//     serviceValueType: serviceResponse.serviceValueType,
//     exclusiveServiceIds: serviceResponse.exclusiveServiceIds,
//     releaseDate: serviceResponse.validStartDateTime || '',
//   };
// };
