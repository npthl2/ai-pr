import {
  InvoiceCreateRequestParams,
  InvoiceRetrieveResponse,
  Invoice,
} from '@model/registration/Invoice';
import baseService from './baseService';
import { CommonResponse } from '@model/common/CommonResponse';

const registrationService = {
  getMemos(customerId: string): Promise<CommonResponse<InvoiceRetrieveResponse>> {
    return baseService.get(`/cca-be/v1/invoice/${customerId}`);
  },
  createInvoice(data: InvoiceCreateRequestParams): Promise<CommonResponse<Invoice | string>> {
    return baseService.post<Invoice, InvoiceCreateRequestParams>('/cca-be/v1/invoice', data);
  },
};

export default registrationService;
