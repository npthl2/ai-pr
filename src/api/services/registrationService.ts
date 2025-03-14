import {
  RegistrationRequest,
  RegistrationResponseData,
  RegistrationStatusResponseData,
} from '@model/RegistrationInfo';
import baseService from './baseService';
import { CommonResponse } from '@model/common/CommonResponse';

const registrationService = {
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
};

export default registrationService;
