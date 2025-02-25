import { CustomerSearchRequestParams, Customer } from '@model/Customer';
import { CommonResponse } from '@model/common/CommonResponse';
import baseService from './baseService';

const customerService = {
  fetchCustomer(data: CustomerSearchRequestParams): Promise<CommonResponse<Customer>> {
    const queryString = new URLSearchParams(Object.entries(data)).toString();

    return baseService.get<Customer>(`/stg-be/v1/customers?${queryString}`);
  },
};

export default customerService;
