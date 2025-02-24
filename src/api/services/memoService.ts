import { MemoRequestParams } from '@model/Memo';
import baseService from './baseService';
import { CommonResponse } from '@model/common/CommonResponse';
import { Memo } from '@model/Memo';
const memoService = {
  getMemos(customerId: string): Promise<CommonResponse<Memo[]>> {
    return baseService.get<Memo[]>(`/adm-be/v1/memos/${customerId}`);
  },
  createMemo(data: MemoRequestParams): Promise<CommonResponse<Memo | string>> {
    return baseService.post<Memo, MemoRequestParams>('/adm-be/v1/memos', data);
  },
};

export default memoService;
