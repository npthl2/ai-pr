import { useMutation } from '@tanstack/react-query';
import registrationService from '@api/services/registrationService';
import { RegistrationInfo } from '@stores/registration/RegistrationStore';

export const useRegistrationMutation = () => {
  return useMutation({
    mutationFn: (data: RegistrationInfo) => registrationService.saveRegistration(data),
  });
};
