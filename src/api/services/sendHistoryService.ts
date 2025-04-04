import { CommonResponse } from '@model/common/CommonResponse';
import baseService from './baseService';
import { SendHistoryRequestDto, SendHistoryResponseDto } from '@model/SendHistory';

const sendHistoryService = {
  sendHistory(data: SendHistoryRequestDto): Promise<CommonResponse<SendHistoryResponseDto>> {
    const queryString = new URLSearchParams(Object.entries(data)).toString();
    return baseService.get<SendHistoryResponseDto>(`/adm-be/v1/send-histories?${queryString}`);
  },
};
export default sendHistoryService;
