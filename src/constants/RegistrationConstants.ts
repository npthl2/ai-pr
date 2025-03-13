export const SECTION_IDS = {
  CUSTOMER: 'customer',
  INVOICE: 'invoice',
  SALES: 'sales',
  CONTRACT: 'contract',
  DEVICE: 'device',
} as const;

export const SECTION_TITLES = {
  [SECTION_IDS.CUSTOMER]: '고객정보',
  [SECTION_IDS.INVOICE]: '청구정보',
  [SECTION_IDS.SALES]: '판매정보',
  [SECTION_IDS.CONTRACT]: '가입정보',
  [SECTION_IDS.DEVICE]: '단말기결제 정보',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

// 등록 상태 상수
export const REGISTRATION_STATUS = {
  PENDING: '진행중',
  COMPLETED: '완료',
  FAILED: '실패',
} as const;

// 등록 상태 타입
export type RegistrationStatusType = (typeof REGISTRATION_STATUS)[keyof typeof REGISTRATION_STATUS];
