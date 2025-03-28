import { CommonResponse } from '@model/common/CommonResponse';
import baseService from './baseService';
import {
  AvailableCustomerContractResponse,
  CustomerContractResponse,
  ContractServiceResponse,
} from '@model/Contract';

const contractService = {
  getAvailableCustomerContractCount(
    customerId: string,
  ): Promise<CommonResponse<AvailableCustomerContractResponse>> {
    return baseService.get<AvailableCustomerContractResponse>(
      `/ctt-be/v1/contract/${customerId}/check`,
    );
  },

  getCustomerContract(customerId: string): Promise<CommonResponse<CustomerContractResponse>> {
    return baseService.get<CustomerContractResponse>(`/ctt-be/v1/contract/${customerId}`);
  },

  getContractService(contractId: string): Promise<CommonResponse<ContractServiceResponse>> {
    return baseService.get<ContractServiceResponse>(`/ctt-be/v1/contract/${contractId}/service`);
  },
};

export default contractService;
