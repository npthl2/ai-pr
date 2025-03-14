import {
  RegistrationRequest,
  RegistrationResponseData,
  RegistrationStatusResponseData,
  RegistrationStatus,
} from '@model/RegistrationInfo';
import {
  InvoiceCreateRequestParams,
  InvoiceRetrieveResponse,
  Invoice,
} from '@model/registration/Invoice';

import baseService from './baseService';
import { CommonResponse } from '@model/common/CommonResponse';
import { REGISTRATION_STATUS } from '@constants/RegistrationConstants';

const registrationService = {

  getInvoiceList(customerId: string): Promise<CommonResponse<InvoiceRetrieveResponse>> {
    return baseService.get(`/cca-be/v1/invoice/${customerId}`);
  },
  createInvoice(data: InvoiceCreateRequestParams): Promise<CommonResponse<Invoice | string>> {
    return baseService.post<Invoice, InvoiceCreateRequestParams>('/cca-be/v1/invoice', data);
  },

  // 계약 정보를 registrationInfo 및 outbox 테이블에 저장
  saveRegistration(data: RegistrationRequest): Promise<CommonResponse<RegistrationResponseData>> {
    return baseService.post<RegistrationResponseData, RegistrationRequest>(
      '/cca-be/v1/registration-common',
      data,
    );
  },

  // 저장 상태 조회
  getRegistrationStatus(
    businessProcessId: string,
  ): Promise<CommonResponse<RegistrationStatusResponseData>> {
    return baseService.get<RegistrationStatusResponseData>(
      `/cca-be/v1/registration-common/${businessProcessId}`,
    );
  },

  // 저장 상태 조회 및 데이터 변환 (오류 처리 포함)
  async getRegistrationStatusWithMapping(
    businessProcessId: string,
  ): Promise<RegistrationStatus> {
    try {
      const response = await this.getRegistrationStatus(businessProcessId);

      // 응답 데이터가 없거나 객체가 아닌 경우 PENDING 상태 반환
      if (!response.data || typeof response.data !== 'object') {
        return { status: REGISTRATION_STATUS.PENDING } as RegistrationStatus;
      }

      const statusData = response.data;

      // 응답 데이터 변환 및 반환
      return {
        // 상태 매핑
        status:
          statusData.status === 'COMPLETED'
            ? REGISTRATION_STATUS.COMPLETED
            : statusData.status === 'FAILED'
              ? REGISTRATION_STATUS.FAILED
              : REGISTRATION_STATUS.PENDING,
        // 선택적 필드 추가
        ...(statusData.contractId ? { contract_id: statusData.contractId } : {}),
        ...(statusData.reason ? { reason: statusData.reason } : {}),
      } as RegistrationStatus;
    } catch (error) {
      console.error('상태 조회 중 오류 발생:', error);
      return { status: REGISTRATION_STATUS.PENDING } as RegistrationStatus;
    }
  },
};

export default registrationService;
