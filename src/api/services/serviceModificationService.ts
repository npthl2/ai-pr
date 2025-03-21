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
  ServiceModificationRequest, 
  ServiceModificationResponse
} from '@model/modifyService/ModifyServiceModel';

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
      `/ctt-be/v1/contract/service-modify/contract/${contractId}/check`
    );
  },

  /**
   * 요금제 변경 요청 API
   * 
   * 선택한 신규 요금제와 부가서비스로 요금제 변경을 요청합니다.
   * 변경 요청은 즉시 처리되거나 처리 대기 상태가 될 수 있으며,
   * 응답으로 변경 이력 ID와 처리 상태를 반환합니다.
   * 
   * @path POST /contracts/{contractId}/service-modification
   * @param data - 요금제 변경 요청 정보 (계약ID, 신규 요금제ID, 부가서비스ID 목록)
   * @returns 요금제 변경 응답 (변경 이력 ID, 변경 일자, 처리 상태)
   */
  requestServiceModification(
    data: ServiceModificationRequest
  ): Promise<CommonResponse<ServiceModificationResponse>> {
    return baseService.post<ServiceModificationResponse, ServiceModificationRequest>(
      `/ctt-be/v1/contracts/${data.contractId}/service-modification`,
      data
    );
  },

  /**
   * 요금제 변경 이력 조회 API
   * 
   * 특정 계약에 대한 요금제 변경 이력을 조회합니다.
   * 최근 변경 이력부터 시간순으로 정렬된 결과를 반환합니다.
   * 
   * @path GET /contracts/{contractId}/service-modification-history
   * @param contractId - 계약 ID
   * @returns 요금제 변경 이력 응답 목록
   */
  getServiceModificationHistory(
    contractId: string
  ): Promise<CommonResponse<ServiceModificationResponse[]>> {
    return baseService.get<ServiceModificationResponse[]>(
      `/ctt-be/v1/contracts/${contractId}/service-modification-history`
    );
  }
};

export default serviceModificationService; 