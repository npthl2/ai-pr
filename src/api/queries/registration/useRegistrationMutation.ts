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

      // Outbox 이벤트 생성
      const outbox: Outbox = {
        eventId: uuidv4(),
        eventType: 'REGISTRATION_CREATED',
        payload: registrationInfo,
        createdAt: new Date().toISOString(),
      };

      // RegistrationRequest 생성
      const request: RegistrationRequest = {
        registrationInfo,
        outbox,
      };

      return registrationService.saveRegistration(request);
    },
  });
};
