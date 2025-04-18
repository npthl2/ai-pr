import baseService from './baseService';
import { CommonResponse } from '@model/common/CommonResponse';

export type EventData = {
  eventType: string;
  traceId: string;
  id: number;
  status: string;
  receptionDatetime: string | null;
  processDatetime: string | null;
  requestTime: string | null;
  publishedTime: string | null;
  trPsSeq: number;
  message: string | null;
  payload: string | null;
};

const admInboxOutboxTraceService = {
  findInboxOutbox(traceId: string): Promise<CommonResponse<EventData[]>> {
    return baseService.get(
      `/adm-be/v1/inbox-outbox/findInboxOutbox?traceId=${encodeURIComponent(traceId)}`,
    );
  },
};

export default admInboxOutboxTraceService;
