import customerService from '@api/services/customerService';
import { CreateCustomerRequestParams } from '@model/Customer';
import { useMutation } from '@tanstack/react-query';

// 고객등록
export const useCreateCustomerMutation = () => {
  return useMutation({
    mutationFn: (data: CreateCustomerRequestParams) => customerService.createCustomer(data),
  });
};
