import { useQuery } from '@tanstack/react-query';
import sendHistoryService from '@api/services/sendHistoryService';
import { MessageType, SendHistoryRequestDto } from '@model/SendHistory';

export const useSendHistoryQuery = (
  customerId: string,
  messageType: MessageType,
  includeOnlySuccessYN: string,
  page: number,
  size: number,
) => {
  const requestData: SendHistoryRequestDto = {
    customerId,
    messageType,
    includeOnlySuccessYN,
    page,
    size,
  };

  return useQuery({
    queryKey: ['sendHistory', customerId, messageType, includeOnlySuccessYN, page, size],
    queryFn: () => sendHistoryService.sendHistory(requestData),
    select: (response) => {
      if (
        response.data &&
        typeof response.data === 'object' &&
        'sendHistories' in response.data &&
        'totalCount' in response.data
      ) {
        return { content: response.data.sendHistories, totalCount: response.data.totalCount };
      }
      return { content: [], totalCount: 0 };
    },
  });
};
