// API 관련 타입 정의
import { Contract } from '@stores/registration/RegistrationContractStore';
import { RegistrationCustomerInfo } from '@stores/registration/RegistrationCustomerStore';
import { RegistrationDeviceInfo } from '@stores/registration/RegistrationDeviceStore';
import { RegistrationInvoiceInfo } from '@stores/registration/RegistrationInvoiceStore';
import { Sales } from '@stores/registration/RegistrationSalesStore';

export interface RegistrationInfo {
  customer: RegistrationCustomerInfo;
  contract: Contract;
  invoice: RegistrationInvoiceInfo;
  device: RegistrationDeviceInfo;
  sales: Sales;
}

// DB 테이블 구조에 맞는 요청 모델
export interface RegistrationRequest {
  gTrId: string; // 글로벌 트랜잭션 ID (프론트엔드에서 생성)
  registrationInfo: RegistrationInfo; // 가입 정보 (JSON으로 저장됨)
}

// 백엔드 API 응답 데이터 형식
export interface RegistrationResponseData {
  businessProcessId: string; // 백엔드에서 생성된 업무 프로세스 ID
}

// 백엔드 상태 조회 API 응답 데이터 형식
export interface RegistrationStatusResponseData {
  status: string; // 백엔드에서 반환하는 상태 값
  contractId?: string; // 계약 ID (있는 경우)
  reason?: string; // 실패 사유 (있는 경우)
  businessProcessId?: string; // 업무 프로세스 ID (있는 경우)
  statusTime: string; // 상태 값 시간
  eventType: string; // 이벤트 타입
  requestMemberId: string; // 요청자 ID
  customerId: string; // 고객 ID
  customerName: string; // 고객 이름
}

export interface AllRegistrationStatusResponseData {
  registrations: RegistrationStatusResponseData[];
  pendingCount: number;
}

export function isRegistrationStatusResponse(
  value: unknown,
): value is RegistrationStatusResponseData {
  return (
    typeof value === 'object' &&
    value !== null &&
    'status' in value &&
    typeof (value as RegistrationStatusResponseData).status === 'string'
  );
}

export function isAllRegistrationStatusResponse(
  value: unknown,
): value is AllRegistrationStatusResponseData {
  return (
    typeof value === 'object' &&
    value !== null &&
    'registrations' in value &&
    Array.isArray((value as AllRegistrationStatusResponseData).registrations) &&
    (value as AllRegistrationStatusResponseData).registrations.every((item) =>
      isRegistrationStatusResponse(item),
    ) &&
    'pendingCount' in value &&
    typeof (value as AllRegistrationStatusResponseData).pendingCount === 'number'
  );
}
