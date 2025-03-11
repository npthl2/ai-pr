import { RegistrationRequest, RegistrationStatus } from '@model/RegistrationInfo';
import { REGISTRATION_STATUS, RegistrationStatusType } from '@constants/RegistrationConstants';
import baseService from './baseService';
import { CommonResponse, CommonStatus } from '@model/common/CommonResponse';

// 개발 환경에서 사용할 임시 상태 저장소
const devStatusMap: Record<string, { status: RegistrationStatusType, createdAt: number }> = {};

const registrationService = {
  // 계약 정보를 registrationinfo 및 outbox 테이블에 저장
  saveRegistration(data: RegistrationRequest): Promise<CommonResponse<string>> {
    // 개발 단계에서는 실제 API 호출 대신 임시 응답 반환
    if (process.env.NODE_ENV === 'development') {
      // 백엔드에서 생성될 business_process_id를 시뮬레이션
      const business_process_id = `BP_${new Date().getTime()}_${Math.floor(Math.random() * 1000)}`;
      
      // 개발 환경에서 상태 추적을 위해 상태 저장
      devStatusMap[business_process_id] = {
        status: REGISTRATION_STATUS.PENDING,
        createdAt: Date.now()
      };
      
      const mockResponse: CommonResponse<string> = {
        successOrNot: 'Y',
        statusCode: CommonStatus.SUCCESS,
        data: business_process_id
      };
      return Promise.resolve(mockResponse);
    }
    
    return baseService.post<string, RegistrationRequest>('/v1/registration-common', data);
  },
  
  // 저장 상태 조회
  getRegistrationStatus(business_process_id: string): Promise<RegistrationStatus> {
    // 개발 단계에서는 실제 API 호출 대신 임시 응답 반환
    if (process.env.NODE_ENV === 'development') {
      console.log('개발 환경 상태 조회:', business_process_id);
      
      // 저장된 상태가 없으면 초기화 후 PENDING 반환
      if (!devStatusMap[business_process_id]) {
        console.log('상태 정보 없음, 초기화 후 PENDING 반환');
        // 상태 정보 초기화
        devStatusMap[business_process_id] = {
          status: REGISTRATION_STATUS.PENDING,
          createdAt: Date.now()
        };
        console.log('devStatusMap 업데이트:', devStatusMap);
        return Promise.resolve({ status: REGISTRATION_STATUS.PENDING });
      }
      
      // 시간에 따라 상태 변경 시뮬레이션
      const statusInfo = devStatusMap[business_process_id];
      const elapsedTime = Date.now() - statusInfo.createdAt;
      console.log('경과 시간:', elapsedTime, '현재 상태:', statusInfo.status);
      
      // 3초 후에 COMPLETED 상태로 변경 (폴링 간격보다 짧게 설정)
      if (elapsedTime > 3000 && statusInfo.status === REGISTRATION_STATUS.PENDING) {
        console.log('상태 변경: PENDING -> COMPLETED');
        statusInfo.status = REGISTRATION_STATUS.COMPLETED;
        console.log('devStatusMap 업데이트:', devStatusMap);
        
        // 개발 환경에서 임의의 계약 ID 생성
        const response = { 
          status: statusInfo.status,
          contract_id: `CONTRACT_${business_process_id.substring(3)}`
        };
        console.log('응답 반환:', response);
        return Promise.resolve(response);
      }
      
      // 상태에 따른 응답 생성
      const response = { 
        status: statusInfo.status,
        // COMPLETED 상태일 때만 계약 ID 포함
        ...(statusInfo.status === REGISTRATION_STATUS.COMPLETED ? {
          contract_id: `CONTRACT_${business_process_id.substring(3)}`
        } : {})
      };
      console.log('응답 반환:', response);
      return Promise.resolve(response);
    }
    
    return baseService.get<RegistrationStatus>(`/v1/registration-common/${business_process_id}`)
      .then((response: CommonResponse<RegistrationStatus>) => {
        if (!response.data) {
          return { status: REGISTRATION_STATUS.PENDING };
        }
        
        // response.data가 문자열인 경우 처리
        if (typeof response.data === 'string') {
          return { status: REGISTRATION_STATUS.PENDING };
        }
        
        // 타입 안전성을 위해 status 값을 검증
        const status = response.data.status;
        if (status === REGISTRATION_STATUS.COMPLETED || status === REGISTRATION_STATUS.FAILED || status === REGISTRATION_STATUS.PENDING) {
          // contract_id가 있으면 함께 반환
          return { 
            status,
            ...(response.data.contract_id ? { contract_id: response.data.contract_id } : {}),
            ...(response.data.reason ? { reason: response.data.reason } : {})
          };
        }
        
        return { status: REGISTRATION_STATUS.PENDING };
      });
  },
};

export default registrationService;