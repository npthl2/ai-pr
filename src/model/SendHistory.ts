import { CommonResponse } from './common/CommonResponse';

export enum MessageType {
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  BOTH = 'BOTH',
}

export interface SendHistoryRequestDto {
  customerId: string;
  messageType: MessageType;
  includeOnlySuccessYN: string;
  page: number;
  size: number;
}

export interface SendHistoryResponseDto {
  sendHistories: SendHistory[];
  totalCount: number;
}

export interface SendHistory {
  messageType: MessageType;
  requestTime: string;
  sentTime: string;
  message: string;
  successYn: string;
}

export interface SendHistoryResponse extends CommonResponse<SendHistoryResponseDto> {}
