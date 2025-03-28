import registrationService from '@api/services/registrationService';
import { RegistrationInfo, RegistrationRequest } from '@model/RegistrationInfo';
import { v4 as uuidv4 } from 'uuid';
import { useReactMutation } from '@hooks/useReactQuery';

export const useRegistrationMutation = () => {
  return useReactMutation({
    mutationFn: (registrationInfo: RegistrationInfo) => {
      // 글로벌 트랜잭션 ID 생성 (프론트엔드에서 생성)
      const gTrId = `GTR_${uuidv4()}`;

      // RegistrationRequest 생성
      const request: RegistrationRequest = {
        gTrId,
        registrationInfo,
      };

      const response = registrationService.saveRegistration(request);
      return response;
    },
  });
};
