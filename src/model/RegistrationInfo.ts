// API 관련 타입 정의
export interface RegistrationInfo {
    customerId: string;
    contractId: string;
    invoiceId: string;
    deviceId: string;
    salesId: string;
    createdAt: string;
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
  
  // 판매 정보 인터페이스
  export interface SalesInfo {
    phoneNumber: string;
    planName: string;
  }
  
  // UI용 등록 정보 인터페이스
  export interface RegistrationUIInfo {
    customer: CustomerInfo;
    invoice: InvoiceInfo;
    device: DeviceInfo;
    sales: SalesInfo;
  }
  