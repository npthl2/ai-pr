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
  content: SendHistory[];
  totalCount: number;
}

export interface SendHistory {
  messageType: MessageType;
  requestDate: string;
  sendDate: string;
  message: string;
  successYN: string;
}

export interface SendHistoryResponse extends CommonResponse<SendHistoryResponseDto> {}
