import { useMutation } from '@tanstack/react-query';
import registrationService from '@api/services/registrationService';
import { RegistrationInfo, RegistrationRequest } from '@model/RegistrationInfo';
import { v4 as uuidv4 } from 'uuid';

export const useRegistrationMutation = () => {
  return useMutation({
    mutationFn: (data: RegistrationInfo) => {
      // 스토어의 RegistrationInfo를 API 요청용 RegistrationRequest로 변환
      // 원본 데이터의 모든 필드를 유지하도록 수정
      const registrationInfo: RegistrationInfo = {
        ...data, // 모든 필드 복사 (business_process_id 등 포함)
        customer: data.customer,
        contract: data.contract,
        invoice: data.invoice,
        device: data.device,
        sales: data.sales,
      };

      // 글로벌 트랜잭션 ID 생성 (프론트엔드에서 생성)
      const gTrId = `GTR_${uuidv4()}`;

      // RegistrationRequest 생성
      const request: RegistrationRequest = {
        gTrId,
        registrationInfo
      };

      return registrationService.saveRegistration(request);
    },
  });
};
