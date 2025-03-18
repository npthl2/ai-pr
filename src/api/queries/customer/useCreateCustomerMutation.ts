import customerService from '@api/services/customerService';
import { useReactMutation } from '@hooks/useReactQuery';
import { CreateCustomerRequestParams } from '@model/Customer';

// 고객등록
export const useCreateCustomerMutation = () => {
  return useReactMutation({
    mutationFn: (data: CreateCustomerRequestParams) => customerService.createCustomer(data),
  });
};
