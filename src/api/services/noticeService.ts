import { CommonResponse } from '@model/common/CommonResponse';
import baseService from './baseService';
import { NoticeRequestParams, NoticeResponse } from '@model/Notice';

const noticeService = {
  getNotices(conditions: NoticeRequestParams): Promise<CommonResponse<NoticeResponse>> {
    return baseService.get<NoticeResponse>(
      '/stg-be/v1/notices',
      new URLSearchParams({
        category: conditions.category ?? '',
        keyword: conditions.keyword ?? '',
      }),
    );
  },

  getNoticeSummary(): Promise<CommonResponse<NoticeResponse>> {
    return baseService.get<NoticeResponse>('/stg-be/v1/notices/summary');
  },
};

export default noticeService;
