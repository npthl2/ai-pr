import { useQuery } from '@tanstack/react-query';
import registrationService from '@api/services/registrationService';
import { isInvoiceResponse } from '@model/registration/Invoice';

export const useInvoiceQuery = (customerId: string) => {
  return useQuery({
    queryKey: ['invoice', customerId],
    queryFn: () => registrationService.getMemos(customerId),
    select: (response) => {
      if (isInvoiceResponse(response.data)) {
        return response.data;
      }
      return [];
    },
  });
};
