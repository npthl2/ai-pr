import { RegistrationRequest, RegistrationResponseData, RegistrationStatusResponseData } from '@model/RegistrationInfo';
import baseService from './baseService';
import { CommonResponse } from '@model/common/CommonResponse';

const registrationService = {
  // 계약 정보를 registrationInfo 및 outbox 테이블에 저장
  saveRegistration(data: RegistrationRequest): Promise<CommonResponse<RegistrationResponseData>> {
    // // 개발 단계에서는 실제 API 호출 대신 임시 응답 반환
    // if (process.env.NODE_ENV === 'development') {
    //   // 백엔드에서 생성될 business_process_id를 시뮬레이션
    //   const business_process_id = `BP_${new Date().getTime()}_${Math.floor(Math.random() * 1000)}`;
      
    //   // 개발 환경에서 상태 추적을 위해 상태 저장
    //   devStatusMap[business_process_id] = {
    //     status: REGISTRATION_STATUS.PENDING,
    //     createdAt: Date.now()
    //   };
      
    //   const mockResponse: CommonResponse<string> = {
    //     successOrNot: 'Y',
    //     statusCode: CommonStatus.SUCCESS,
    //     data: business_process_id
    //   };
    //   return Promise.resolve(mockResponse);
    // }
    
    console.log('실제 백엔드 API 호출 시도:', '/cca-be/v1/registration-common');
    return baseService.post<RegistrationResponseData, RegistrationRequest>('/cca-be/v1/registration-common', data);
  },
  
  // 저장 상태 조회
  getRegistrationStatus(business_process_id: string): Promise<CommonResponse<RegistrationStatusResponseData>> {
    // 개발 단계에서는 실제 API 호출 대신 임시 응답 반환
    // if (process.env.NODE_ENV === 'development') {
    //   console.log('개발 환경 상태 조회:', business_process_id);
      
    //   // 저장된 상태가 없으면 초기화 후 PENDING 반환
    //   if (!devStatusMap[business_process_id]) {
    //     console.log('상태 정보 없음, 초기화 후 PENDING 반환');
    //     // 상태 정보 초기화
    //     devStatusMap[business_process_id] = {
    //       status: REGISTRATION_STATUS.PENDING,
    //       createdAt: Date.now()
    //     };
    //     console.log('devStatusMap 업데이트:', devStatusMap);
    //     return Promise.resolve({
    //       successOrNot: 'Y',
    //       statusCode: CommonStatus.SUCCESS,
    //       data: {
    //         status: REGISTRATION_STATUS.PENDING
    //       }
    //     });
    //   }
      
    //   // 시간에 따라 상태 변경 시뮬레이션
    //   const statusInfo = devStatusMap[business_process_id];
    //   const elapsedTime = Date.now() - statusInfo.createdAt;
    //   console.log('경과 시간:', elapsedTime, '현재 상태:', statusInfo.status);
      
    //   // 3초 후에 COMPLETED 상태로 변경 (폴링 간격보다 짧게 설정)
    //   if (elapsedTime > 3000 && statusInfo.status === REGISTRATION_STATUS.PENDING) {
    //     console.log('상태 변경: PENDING -> COMPLETED');
    //     statusInfo.status = REGISTRATION_STATUS.COMPLETED;
    //     console.log('devStatusMap 업데이트:', devStatusMap);
        
    //     // 개발 환경에서 임의의 계약 ID 생성
    //     const mockResponse: CommonResponse<RegistrationStatusResponseData> = {
    //       successOrNot: 'Y',
    //       statusCode: CommonStatus.SUCCESS,
    //       data: { 
    //         status: 'COMPLETED',
    //         contractId: `CT_${business_process_id.substring(15)}`
    //       }
    //     };
    //     console.log('응답 반환:', mockResponse);
    //     return Promise.resolve(mockResponse);
    //   }
      
    //   // 상태에 따른 응답 생성
    //   const mockResponse: CommonResponse<RegistrationStatusResponseData> = {
    //     successOrNot: 'Y',
    //     statusCode: CommonStatus.SUCCESS,
    //     data: { 
    //       status: statusInfo.status === REGISTRATION_STATUS.COMPLETED ? 'COMPLETED' : 
    //              statusInfo.status === REGISTRATION_STATUS.FAILED ? 'FAILED' : 'PENDING',
    //       // COMPLETED 상태일 때만 계약 ID 포함
    //       ...(statusInfo.status === REGISTRATION_STATUS.COMPLETED ? {
    //         contractId: `CT_${business_process_id.substring(15)}`
    //       } : {})
    //     }
    //   };
    //   console.log('응답 반환:', mockResponse);
    //   return Promise.resolve(mockResponse);
    // }
    
    console.log('실제 백엔드 API 호출 시도:', `/cca-be/v1/registration-common/${business_process_id}`);
    return baseService.get<RegistrationStatusResponseData>(`/cca-be/v1/registration-common/${business_process_id}`);
  },
};

export default registrationService;