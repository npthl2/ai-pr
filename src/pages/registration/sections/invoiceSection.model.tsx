export enum BillingType {
  COMMON = 'COMMON',
  PREPAID = 'PREPAID',
}

export enum InvoiceType {
  MOBILE = 'MOBILE',
  EMAIL = 'EMAIL',
}

export enum PaymentMethod {
  BANK = 'BANK',
  CARD = 'CARD',
  GIRO = 'GIRO',
}

export enum PaymentDate {
  D26 = 'D26',
  EOM = 'EOM',
}

export enum BankCompanyCode {
  KB = 'KB',
  WO = 'WO',
}

export enum CardCompanyCode {
  HC = 'HC',
  SC = 'SC',
  KC = 'KC',
}

export const invoiceTypeOptions = [
  { label: '모바일', value: InvoiceType.MOBILE },
  { label: '이메일', value: InvoiceType.EMAIL },
];

export const paymentMethodOptions = [
  { label: '은행계좌 자동이체', value: PaymentMethod.BANK },
  { label: '카드', value: PaymentMethod.CARD },
  { label: '지로', value: PaymentMethod.GIRO },
];

export const paymentDateOptions = [
  { label: '매월26일', value: PaymentDate.D26 },
  { label: '매월말일', value: PaymentDate.EOM },
];

export const bankCompanyOptions = [
  { label: '국민은행', value: BankCompanyCode.KB },
  { label: '우리은행', value: BankCompanyCode.WO },
];

export const cardCompanyOptions = [
  { label: '현대카드', value: CardCompanyCode.HC },
  { label: '신한카드', value: CardCompanyCode.SC },
  { label: '국민카드', value: CardCompanyCode.KC },
];

export const invoiceEmailDomainOptions = [
  { label: '직접입력', value: '직접입력' },
  { label: 'gmail.com', value: 'gmail.com' },
  { label: 'naver.com', value: 'naver.com' },
];
