import { ContractData } from '@model/Contract';
import { CommonResponse } from '@model/common/CommonResponse';
import baseService from './baseService';

const todayContractsService = {
  getTodayContracts: (): Promise<CommonResponse<ContractData[]>> => {
    return baseService.get('/stg-be/v1/contracts/today');
  },
};

export default todayContractsService;
