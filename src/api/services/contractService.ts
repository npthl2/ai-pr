import { CommonResponse } from '@model/common/CommonResponse';
import baseService from './baseService';
import { AvailableCustomerContractResponse } from '@model/Contract';

const contractService = {
  getAvailableCustomerContractCount(
    customerId: string,
  ): Promise<CommonResponse<AvailableCustomerContractResponse>> {
    return baseService.get<AvailableCustomerContractResponse>(
      `/ctt-be/v1/contract/${customerId}/check`,
    );
  },
};

export default contractService;
