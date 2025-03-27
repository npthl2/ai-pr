import registrationService from '@api/services/registrationService';
import { useReactQuery } from '@hooks/useReactQuery';
import { UseQueryOptions } from '@tanstack/react-query';
import { CommonResponse } from '@model/common/CommonResponse';
import {
  AllRegistrationStatusResponseData,
  isAllRegistrationStatusResponse,
} from '@model/RegistrationInfo';

export const useRegistrationStatusQuery = (
  options?: Omit<
    UseQueryOptions<CommonResponse<AllRegistrationStatusResponseData>, unknown, number>,
    'queryKey' | 'queryFn' | 'select'
  >,
) => {
  return useReactQuery({
    queryKey: ['registrationStatus'],
    queryFn: () => registrationService.getAllRegistrationStatus(),
    select: (data: CommonResponse<AllRegistrationStatusResponseData>) => {
      if (isAllRegistrationStatusResponse(data.data)) {
        return data.data;
      }
      return null;
    },
    ...options,
  });
};
