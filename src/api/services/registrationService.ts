import {
  RegistrationRequest,
  RegistrationResponseData,
  AllRegistrationStatusResponseData,
} from '@model/RegistrationInfo';
import {
  InvoiceCreateRequestParams,
  InvoiceRetrieveResponse,
  Invoice,
} from '@model/registration/Invoice';

import baseService from './baseService';
import { CommonResponse } from '@model/common/CommonResponse';

const registrationService = {
  getInvoiceList(customerId: string): Promise<CommonResponse<InvoiceRetrieveResponse>> {
    return baseService.get(`/cca-be/v1/invoice/${customerId}`);
  },
  createInvoice(data: InvoiceCreateRequestParams): Promise<CommonResponse<Invoice | string>> {
    return baseService.post<Invoice, InvoiceCreateRequestParams>('/cca-be/v1/invoice', data);
  },

  // 계약 정보를 registrationInfo 및 outbox 테이블에 저장
  saveRegistration(data: RegistrationRequest): Promise<CommonResponse<RegistrationResponseData>> {
    return baseService.post<RegistrationResponseData, RegistrationRequest>(
      '/cca-be/v1/registration-common',
      data,
    );
  },

  getAllRegistrationStatus(): Promise<CommonResponse<AllRegistrationStatusResponseData>> {
    return baseService.get<AllRegistrationStatusResponseData>(
      '/cca-be/v1/registration-common/status',
    );
  },
};

export default registrationService;
