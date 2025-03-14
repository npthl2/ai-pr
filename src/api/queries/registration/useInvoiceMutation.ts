import { useMutation } from '@tanstack/react-query';
import registrationService from '@api/services/registrationService';
import { InvoiceCreateRequestParams } from '@model/registration/Invoice';
import { CommonResponse } from '@model/common/CommonResponse';
import useToastStore from '@stores/ToastStore';
import { Invoice } from '@model/registration/Invoice';

export const useInvoiceMutation = () => {
  const { openToast } = useToastStore();

  return useMutation({
    mutationFn: (data: InvoiceCreateRequestParams) => registrationService.createInvoice(data),
    onSuccess: (data: CommonResponse<Invoice | string>) => {
      if (data.successOrNot === 'N') {
        openToast('청구정보 생성에 실패했습니다. 다시 시도해 주세요.');
      }
    },
    onError: (error) => {
      console.error(error);
      openToast('청구정보 생성에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};
