import { CommonResponse } from '@model/common/CommonResponse';
import baseService from './baseService';
import { SendHistoryRequestDto, SendHistoryResponseDto } from '@model/SendHistory';

const sendHistoryService = {
  sendHistory(data: SendHistoryRequestDto): Promise<CommonResponse<SendHistoryResponseDto>> {
    return baseService.get<SendHistoryResponseDto>(
      `/adm-be/v1/send-histories?customerId=${data.customerId}&messageType=${data.messageType}&includeOnlySuccessYN=${data.includeOnlySuccessYN}&page=${data.page}&size=${data.size}`,
    );
  },
};
export default sendHistoryService;
