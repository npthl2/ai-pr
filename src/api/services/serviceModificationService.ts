// src/api/services/serviceModificationService.ts
/**
 * 요금제 변경 관련 API 서비스
 *
 * 요금제 변경 가능 여부 확인, 요금제 변경 요청, 요금제 변경 이력 조회 등의
 * API 호출을 처리하는 서비스입니다.
 *
 * @module serviceModificationService
 */

import { CommonResponse } from '@model/common/CommonResponse';
import baseService from './baseService';
import {
  ServiceModifiableResponse,
  ServiceAgeCheckRequest,
  ServiceAgeCheckResponse,
} from '@model/modifyService/ModifyServiceModel';

export interface ServiceResponseWithExclusiveQuery {
  serviceId: string;
  serviceName: string;
  serviceType: string;
  serviceValueType: string;
  serviceValue: string;
  exclusiveServiceIds: string[];
  validStartDatetime: string;
  validEndDatetime: string;
  availableAgeMin?: number;
  availableAgeMax?: number;
  hasAgeRestriction: boolean;
  exclusive: boolean;
}

/**
 * 요금제 변경 관련 API 서비스 객체
 */
const serviceModificationService = {
  /**
   * 요금제 변경 가능 여부 확인 API
   *
   * 고객의 계약 ID를 기반으로 현재 요금제 변경이 가능한지 여부를 확인합니다.
   * 당월 이력이 있는 경우 변경이 불가능하며, 기타 요금 미납, 서비스 정지 등의 사유로도
   * 변경이 제한될 수 있습니다.
   *
   * @path GET /v1/contract/service-modify/contract/{contractId}/check
   * @param contractId - 계약 ID
   * @returns 요금제 변경 가능 여부 응답 (successOrNot, statusCode, data 구조)
   */
  checkServiceModifiable(contractId: string): Promise<CommonResponse<ServiceModifiableResponse>> {
    return baseService.get<ServiceModifiableResponse>(
      `/ctt-be/v1/contract/service-modify/${contractId}/check`,
    );
  },

  /**
   * 요금제 변경 나이 제한 확인 API
   *
   * 고객의 계약 ID와 변경하려는 서비스 ID를 기반으로
   * 나이 제한으로 인해 해당 요금제로 변경이 가능한지 여부를 확인합니다.
   *
   * @path POST /v1/contract/service-modify/age/check
   * @param data - 확인 요청 정보 (계약ID, 서비스ID)
   * @returns 요금제 변경 나이 제한 확인 응답
   */
  checkServiceAgeRestriction(
    data: ServiceAgeCheckRequest,
  ): Promise<CommonResponse<ServiceAgeCheckResponse>> {
    return baseService.post<ServiceAgeCheckResponse, ServiceAgeCheckRequest>(
      `/ctt-be/v1/contract/service-modify/age/check`,
      data,
    );
  },

  /**
   * 부가 서비스 목록 조회(나이 정보 추가)
   * @path GET /additional-services/age-exclusive
   * @param age - 고객 나이
   * @param serviceId - 서비스 ID
   * @returns 부가 서비스 목록
   */
  getAdditionalServicesWithExclusiveQuery(
    age: number,
    serviceId: string,
  ): Promise<CommonResponse<ServiceResponseWithExclusiveQuery[]>> {
    return baseService.get<ServiceResponseWithExclusiveQuery[]>(
      `/ctt-be/v1/additional-services/age-exclusive?age=${age}&serviceId=${serviceId}`,
    );
  },
};

export default serviceModificationService;
