import { RegistrationInfo } from '@stores/registration/RegistrationStore';
import baseService from './baseService';
import { CommonResponse } from '@model/common/CommonResponse';

const registrationService = {
  // 계약 정보를 registrationinfo 및 outbox 테이블에 저장
  saveRegistration(data: RegistrationInfo): Promise<CommonResponse<string>> {
    return baseService.post<string, RegistrationInfo>('/v1/registration/save', data);
  },
};

export default registrationService;
