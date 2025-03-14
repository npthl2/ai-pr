import { CommonResponse } from './common/CommonResponse';

// 이메일 발송 요청 인터페이스
export interface EmailSendRequest {
  customerId: string; // 고객 ID
  contractId?: string; // 계약 ID (옵셔널)
  emailAddress: string; // 이메일 주소
}

// 이메일 발송 응답 인터페이스
export interface EmailSendResponse {
  emailHistoryId: string; // 이메일 이력 ID
  sentTimestamp: string; // 발송 시간
}

// API 응답 타입
export interface EmailSendApiResponse extends CommonResponse<EmailSendResponse> {}
