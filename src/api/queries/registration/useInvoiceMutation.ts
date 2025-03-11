import { useMutation } from '@tanstack/react-query';
import registrationService from '@api/services/registrationService';
import { InvoiceCreateRequestParams } from '@model/registration/Invoice';

export const useInvoiceMutation = () => {
  return useMutation({
    mutationFn: (data: InvoiceCreateRequestParams) => registrationService.createInvoice(data),
  });
};
