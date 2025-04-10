import { CommonResponse } from '@model/common/CommonResponse';
import { useReactQuery } from '@hooks/useReactQuery';
import noticeService from '@api/services/noticeService';
import { NoticeResponse } from '@model/Notice';

const useNoticeSummaryQuery = () => {
  return useReactQuery({
    queryKey: ['noticeSummary'],
    queryFn: () => noticeService.getNoticeSummary(),
    select: (data: CommonResponse<NoticeResponse>) => {
      if (data.successOrNot === 'N' || typeof data.data === 'string') return [];
      return data?.data?.notices || [];
    },
  });
};

export default useNoticeSummaryQuery;
