import { useMutation } from '@tanstack/react-query';
import registrationService from '@api/services/registrationService';
import { RegistrationInfo, RegistrationRequest, Outbox } from '@model/RegistrationInfo';
import { v4 as uuidv4 } from 'uuid';

export const useRegistrationMutation = () => {
  return useMutation({
    mutationFn: (data: RegistrationInfo) => {
      console.log('useRegistrationMutation 실행, 입력 데이터:', data);
      
      // 스토어의 RegistrationInfo를 API 요청용 RegistrationRequest로 변환
      // 원본 데이터의 모든 필드를 유지하도록 수정
      const registrationInfo: RegistrationInfo = {
        ...data, // 모든 필드 복사 (business_process_id 등 포함)
        customer: data.customer,
        contract: data.contract,
        invoice: data.invoice,
        device: data.device,
        sales: data.sales
      };

      // 글로벌 트랜잭션 ID 생성 (프론트엔드에서 생성)
      const g_tr_id = `GTR_${uuidv4()}`;
      console.log('생성된 g_tr_id:', g_tr_id);

      // Outbox 이벤트 생성 (DB 테이블 구조에 맞게)
      const outbox: Outbox = {
        eventType: 'SaveRequest',
        eventHubName: 'test', //TODO: 수정 필요
        payload: registrationInfo,
        status: 'READY_TO_PUBLISH',
        g_tr_id
      };

      // RegistrationRequest 생성
      const request: RegistrationRequest = {
        g_tr_id,
        registrationInfo,
        outbox
      };
      
      console.log('API 요청 데이터:', request);
      return registrationService.saveRegistration(request);
    },
  });
};
