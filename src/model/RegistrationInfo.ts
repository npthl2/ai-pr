// API 관련 타입 정의
import { RegistrationStatusType } from '@constants/RegistrationConstants';

export interface RegistrationInfo {
  customer: CustomerInfo;
  contract: ContractInfo;
  invoice: InvoiceInfo;
  device: DeviceInfo;
  sales: SalesInfo;
  businessProcessId?: string; // 업무 프로세스 ID (백엔드에서 생성)
  status?: RegistrationStatusType; // 저장 상태
  contract_id?: string; // 계약 ID
}

// DB 테이블 구조에 맞는 요청 모델
export interface RegistrationRequest {
  gTrId: string; // 글로벌 트랜잭션 ID (프론트엔드에서 생성)
  registrationInfo: RegistrationInfo; // 가입 정보 (JSON으로 저장됨)
  first_create_member_id?: string; // 최초 생성자 ID
  last_update_member_id?: string; // 최종 수정자 ID
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
}

// 프론트엔드에서 사용할 변환된 상태 응답 형식
export interface RegistrationStatusResponse {
  status: RegistrationStatusType;
  contract_id?: string;
  reason?: string;
}

// 백엔드 응답 모델
export interface RegistrationResponse {
  businessProcessId: string; // 업무 프로세스 ID (백엔드에서 생성)
  status: RegistrationStatusType; // 처리 상태
  contract_id?: string; // 계약 ID (있는 경우)
  created_at: string; // 생성 시간
  updated_at: string; // 수정 시간
}

// UI 관련 타입 정의
// 등록 상태 인터페이스
export interface RegistrationStatus {
  status: RegistrationStatusType;
  reason?: string; // 실패 사유
  contract_id?: string; // 계약 ID
}

// 고객 정보 인터페이스
export interface CustomerInfo {
  customerId?: string;
  name: string;
  rrno: string;
  authHistoryId?: number;
  isConsentPersonalInfo?: boolean;
  rrnoIssueDate: string;
  isConsentIdentityVerification?: boolean;
  verificationResult?: boolean;
  organization?: string;
  availableContractCount?: number;
}

// 계약 정보 인터페이스
export interface ContractInfo {
  // 가입유형
  contractType: string;
  // 판매유형
  sellType: string;
  // 전화번호
  phoneNumber: string;
  // SIM 정보
  sim: string;
  // IMEI 정보
  imei: string;
  // 요금제 정보
  service: ServiceInfo;
  // 부가서비스 리스트
  additionalServices: ServiceInfo[];
  // 가입 완료 여부
  isValidated: boolean;
}

// 서비스 정보 인터페이스
export interface ServiceInfo {
  serviceId: string;
  serviceName: string;
  serviceValueType: string;
  serviceValue: number;
}

// 청구 정보 인터페이스
export interface InvoiceInfo {
  // 청구ID
  invoiceId: string;
  // 고객ID
  customerId: string;
  // 청구서번호 구분
  billingType: string;
  // 수령인
  recipient: string;
  // 발송형태
  invoiceType: string;
  // 청구서 이메일
  invoiceEmail: string;
  // 청구서 우편번호
  invoicePostalCode: string;
  // 청구서 주소
  invoiceAddress: string;
  // 청구서 상세주소
  invoiceAddressDetail: string;
  // 납부방법
  paymentMethod: string;
  // 은행명
  bankCompany: string;
  // 계좌번호
  bankAccount: string;
  // 카드사명
  cardCompany: string;
  // 카드번호
  cardNumber: string;
  // 결제일
  paymentDate: string;
  // 납부고객명
  paymentName: string;
  // 생년월일
  birthDate: string;
}

// 기기 정보 인터페이스
export interface DeviceInfo {
  deviceId?: string;
  deviceModelName: string; // 기기 모델명
  deviceModelNameAlias?: string; // 기기 모델명 별칭
  deviceEngagementType: 'PUBLIC_POSTED_SUPPERT' | 'SELECTED'; // 공시지원금/선택약정
  deviceSponsorName: string | '통합스폰서';
  deviceEngagementPeriod: number; // 약정기간 12 || 24
  deviceEngagementName: '공시지원금' | '선택약정'; // 공시지원금/선택약정
  deviceSalesPrice: number; // 단말출고가
  deviceDiscountPrice: number; // 공시지원금
  devicePrepaidPrice: number; // 선납금
  deviceInstallmentAmount: number; // 할부원금
  deviceInstallmentFee: number; // 총 할부수수료
  deviceTotalPriceAmout: number; // 총 결제금액
  deviceInstallmentPeriod: number; // 분납개월수
  monthlyInstallmentPrice: number; // 월/최종분납금
  isValidated: boolean; // 완료여부
}

// 판매 정보 인터페이스
export interface SalesInfo {
  salesDepartment?: string; // 가입대리점=판매부서:stg
  salesContactPoint?: string; // 접점
  finalSeller?: string; // 판매자=최종판매자:stg
  supporter?: string; // 서포터
  // 가입 완료 여부
  isValidated: boolean;
}

// UI용 등록 정보 인터페이스
export interface RegistrationUIInfo {
  customer: CustomerInfo;
  contract: ContractInfo;
  invoice: InvoiceInfo;
  device: DeviceInfo;
  sales: SalesInfo;
}
