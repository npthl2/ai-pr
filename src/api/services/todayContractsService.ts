import { ContractDataWithCustomer } from '@model/CustomerContract';
import { CommonResponse } from '@model/common/CommonResponse';
import baseService from './baseService';

const todayContractsService = {
  getTodayContracts: (): Promise<CommonResponse<ContractDataWithCustomer[]>> => {
    return baseService.get('/stg-be/v1/contracts/today');
  },
};

export default todayContractsService;
