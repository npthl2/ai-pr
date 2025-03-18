import customerService from '@api/services/customerService';
import { CustomerNameVerificationRequestParams } from '@model/Customer';
import { useReactMutation } from '@hooks/useReactQuery';

//실명인증
export const useCustomerNameVerificationMutation = () => {
  return useReactMutation({
    mutationFn: (data: CustomerNameVerificationRequestParams) =>
      customerService.verifyCustomerName(data),
  });
};
