import {
  CreateCustomerRequestParams,
  CreateCustomerResponse,
  CustomerNameVerificationRequestParams,
  CustomerNameVerificationResponse,
  CustomerSearchRequestParams,
  CustomerSearchResponse,
} from '@model/Customer';
import { CommonResponse } from '@model/common/CommonResponse';
import baseService from './baseService';

const customerService = {
  fetchCustomer(
    data: CustomerSearchRequestParams,
  ): Promise<CommonResponse<CustomerSearchResponse>> {
    const queryString = new URLSearchParams(Object.entries(data)).toString();

    return baseService.get<CustomerSearchResponse>(`/stg-be/v1/customers?${queryString}`);
  },

  createCustomer(
    data: CreateCustomerRequestParams,
  ): Promise<CommonResponse<CreateCustomerResponse>> {
    return baseService.post<CreateCustomerResponse, CreateCustomerRequestParams>(
      '/cca-be/v1/customer',
      data,
    );
  },

  verifyCustomerName(
    data: CustomerNameVerificationRequestParams,
  ): Promise<CommonResponse<CustomerNameVerificationResponse>> {
    return baseService.post<
      CustomerNameVerificationResponse,
      CustomerNameVerificationRequestParams
    >('/cca-be/v1/customer/name-verification', data);
  },
};

export default customerService;
