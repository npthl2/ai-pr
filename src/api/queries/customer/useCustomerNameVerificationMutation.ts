import { useMutation } from '@tanstack/react-query';

import customerService from '@api/services/customerService';
import { CustomerNameVerificationRequestParams } from '@model/Customer';

//실명인증
export const useCustomerNameVerificationMutation = () => {
  return useMutation({
    mutationFn: (data: CustomerNameVerificationRequestParams) =>
      customerService.verifyCustomerName(data),
  });
};
