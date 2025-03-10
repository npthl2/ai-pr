import { RegistrationRequest } from '@model/RegistrationInfo';
import baseService from './baseService';
import { CommonResponse, CommonStatus } from '@model/common/CommonResponse';

interface RegistrationStatus {
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
}

const registrationService = {
  // 계약 정보를 registrationinfo 및 outbox 테이블에 저장
  saveRegistration(data: RegistrationRequest): Promise<CommonResponse<string>> {
    // 개발 단계에서는 실제 API 호출 대신 임시 응답 반환
    if (process.env.NODE_ENV === 'development') {
      const mockResponse: CommonResponse<string> = {
        successOrNot: 'Y',
        statusCode: CommonStatus.SUCCESS,
        data: 'TEMP_ID_' + new Date().getTime()
      };
      return Promise.resolve(mockResponse);
    }
    
    return baseService.post<string, RegistrationRequest>('/api/registration/save', data);
  },
  
  // 저장 상태 조회
  getRegistrationStatus(contractId: string): Promise<RegistrationStatus> {
    // 개발 단계에서는 실제 API 호출 대신 임시 응답 반환
    if (process.env.NODE_ENV === 'development') {
      return Promise.resolve({ status: 'PENDING' });
    }
    
    return baseService.get<RegistrationStatus>(`/api/registration/status/${contractId}`)
      .then((response: CommonResponse<RegistrationStatus>) => {
        if (!response.data) {
          return { status: 'PENDING' };
        }
        
        // response.data가 문자열인 경우 처리
        if (typeof response.data === 'string') {
          return { status: 'PENDING' };
        }
        
        // 타입 안전성을 위해 status 값을 검증
        const status = response.data.status;
        if (status === 'COMPLETED' || status === 'FAILED' || status === 'PENDING') {
          return { status };
        }
        
        return { status: 'PENDING' };
      });
  },
};

export default registrationService;