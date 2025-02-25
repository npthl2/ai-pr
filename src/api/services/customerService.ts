import { CustomerSearchRequestParams, CustomerSearchResponse } from '@model/Customer';
import { CommonResponse } from '@model/common/CommonResponse';
import baseService from './baseService';

const customerService = {
  fetchCustomer(
    data: CustomerSearchRequestParams,
  ): Promise<CommonResponse<CustomerSearchResponse>> {
    const queryString = new URLSearchParams(Object.entries(data)).toString();

    return baseService.get<CustomerSearchResponse>(`/stg-be/v1/customers?${queryString}`);
  },
};

export default customerService;
