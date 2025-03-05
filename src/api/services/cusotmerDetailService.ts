import { CustomerContract } from '@model/CustomerContract';
import { CommonResponse } from '@model/common/CommonResponse';
import baseService from './baseService';

const customerContractService = {
  getCustomerContracts(customerId: string): Promise<CommonResponse<CustomerContract>> {
    return baseService.get<CustomerContract>(`/stg-be/v1/customers/${customerId}/contracts`);
  },

  getContractIdsByPhonNumberQuery(
    customerId: string,
    phoneNumber: string,
  ): Promise<CommonResponse<string>> {
    console.debug('[getContractIdsByPhonNumberQuery]customerId: ', customerId);
    return baseService.get<string>(
      `/stg-be/v1/customers/${customerId}/contractId?phoneNumber=${phoneNumber}`,
    );
  },
};

export default customerContractService;
