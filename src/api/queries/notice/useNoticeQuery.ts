import { CommonResponse } from '@model/common/CommonResponse';
import { useReactQuery } from '@hooks/useReactQuery';
import noticeService from '@api/services/noticeService';
import { NoticeRequestParams, NoticeResponse, Notice } from '@model/Notice';
import { UseQueryOptions } from '@tanstack/react-query';

const useNoticeQuery = (
  params: NoticeRequestParams,
  options?: Omit<
    UseQueryOptions<CommonResponse<NoticeResponse>, unknown, Notice[]>,
    'queryKey' | 'queryFn' | 'select'
  >,
) => {
  return useReactQuery<CommonResponse<NoticeResponse>, unknown, Notice[]>({
    queryKey: ['notices', params],
    queryFn: () => noticeService.getNotices(params),
    select: (data: CommonResponse<NoticeResponse>): Notice[] => {
      if (data.successOrNot === 'N' || typeof data.data === 'string') return [];
      return data?.data?.notices || [];
    },
    placeholderData: (previousData) => previousData,
    ...options,
  });
};

export default useNoticeQuery;
