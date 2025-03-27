import { useRegistrationStatusQuery } from '@api/queries/registration/useRegistrationStatusQuery';
import { REGISTRATION_STATUS } from '@constants/RegistrationConstants';
import { isAllRegistrationStatusResponse } from '@model/RegistrationInfo';

interface UseRegistrationStatusOptions {
  isRegistrationRequestMounted?: boolean;
  businessProcessId?: string;
}

export const useRegistrationStatus = ({
  isRegistrationRequestMounted = false,
  businessProcessId,
}: UseRegistrationStatusOptions = {}) => {
  return useRegistrationStatusQuery({
    refetchInterval: (data) => {
      const registrationStatusResponse = data.state.data?.data;
      if (
        isAllRegistrationStatusResponse(registrationStatusResponse) &&
        isRegistrationRequestMounted &&
        businessProcessId
      ) {
        const registration = registrationStatusResponse.registrations.find(
          (reg) => reg.businessProcessId === businessProcessId,
        );

        if (!registration) {
          return 5000;
        }

        return registration.status === REGISTRATION_STATUS.PENDING ? 5000 : 60000;
      }

      return 60000;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
};
