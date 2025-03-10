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
    name: string;
    rrno: string;
    isConsent: boolean;
    customerId: string;
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
    payerName: string;
    paymentMethod: string;
    paymentDay: string;
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
  