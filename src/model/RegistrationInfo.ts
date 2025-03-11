// API 관련 타입 정의
export interface RegistrationInfo {
    customer: CustomerInfo;
    contract: ContractInfo;
    invoice: any;
    device: any;
    sales: any;
}

export interface Outbox {
    eventId: string;
    eventType: string;
    payload: RegistrationInfo;
    createdAt: string;
}

export interface RegistrationRequest {
    registrationInfo: RegistrationInfo;
    outbox: Outbox;
}

// UI 관련 타입 정의
// 등록 상태 타입
export type RegistrationStatusType = 'PENDING' | 'COMPLETED' | 'FAILED';

// 등록 상태 인터페이스
export interface RegistrationStatus {
    status: RegistrationStatusType;
    reason?: string; // 실패 사유
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
    service: Service;
    // 부가서비스 리스트
    additionalServices: Service[];
}

// 서비스 정보 인터페이스
export interface Service {
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
    sponsorName: string;
    sponsorOption: string;
    totalPrice: number;
    subsidy: number;
    prepayment: number;
    installmentPrincipal: number;
    installmentFee: number;
    totalAmount: number;
    monthlyInstallment: number;
    installmentPeriod: number;
}

// UI용 등록 정보 인터페이스
export interface RegistrationUIInfo {
    customer: CustomerInfo;
    contract: ContractInfo;
    invoice: InvoiceInfo;
    device: DeviceInfo;
}
  