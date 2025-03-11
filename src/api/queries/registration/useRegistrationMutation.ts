import { useMutation } from '@tanstack/react-query';
import registrationService from '@api/services/registrationService';
import { RegistrationInfo, RegistrationRequest, Outbox } from '@model/RegistrationInfo';
import { v4 as uuidv4 } from 'uuid';

export const useRegistrationMutation = () => {
  return useMutation({
    mutationFn: (data: RegistrationInfo) => {
      // 스토어의 RegistrationInfo를 API 요청용 RegistrationRequest로 변환
      const registrationInfo: RegistrationInfo = {
        customer: data.customer,
        contract: data.contract,
        invoice: data.invoice,
        device: data.device,
        sales: data.sales
      };

      // 글로벌 트랜잭션 ID 생성 (프론트엔드에서 생성)
      const g_tr_id = `GTR_${uuidv4()}`;

      // Outbox 이벤트 생성 (DB 테이블 구조에 맞게)
      const outbox: Outbox = {
        eventType: 'SaveRequest',
        eventHubName: 'test', //TODO: 수정 필요
        payload: registrationInfo,
        status: 'READY_TO_PUBLISH',
        g_tr_id
      };

      // RegistrationRequest 생성
      // business_process_id는 백엔드에서 생성하므로 여기서는 포함하지 않음
      const request: RegistrationRequest = {
        g_tr_id,
        registrationInfo,
        outbox
      };

      return registrationService.saveRegistration(request);
    },
  });
};
