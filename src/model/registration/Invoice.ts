import { CommonResponse } from '../common/CommonResponse';
import {
  BillingType,
  InvoiceType,
  PaymentMethod,
  BankCompanyCode,
  CardCompanyCode,
  PaymentDate,
} from '@pages/registration/sections/invoiceSection.model';

export interface InvoiceCreateRequestParams {
  customerId: string;
  billingType: BillingType;
  recipient: string;
  invoiceType: InvoiceType;
  invoiceEmail: string;
  invoicePostalCode: string;
  invoiceAddress: string;
  invoiceAddressDetail: string;
  paymentMethod: PaymentMethod;
  bankCompany: BankCompanyCode;
  bankAccount: string;
  cardCompany: CardCompanyCode;
  cardNumber: string;
  paymentDate: PaymentDate;
  paymentName: string;
  birthDate: string;
}

export interface Invoice {
  invoiceId: string;
  customerId: string;
  billingType: BillingType;
  recipient: string;
  invoiceType: InvoiceType;
  invoiceEmail: string;
  invoicePostalCode: string;
  invoiceAddress: string;
  invoiceAddressDetail: string;
  paymentMethod: PaymentMethod;
  bankCompany: BankCompanyCode;
  bankAccount: string;
  cardCompany: CardCompanyCode;
  cardNumber: string;
  paymentDate: PaymentDate;
  paymentName: string;
  birthDate: string;
}

export interface InvoiceCreateResponse extends CommonResponse<Invoice> {}
export interface InvoiceRetrieveResponse extends CommonResponse<Invoice[]> {}

export function isInvoice(value: unknown): value is Invoice {
  return (
    typeof value === 'object' &&
    value !== null &&
    [
      'invoiceId',
      'customerId',
      'billingType',
      'recipient',
      'invoiceType',
      'invoicePostalCode',
      'invoiceAddress',
      'invoiceAddressDetail',
      'paymentMethod',
      'paymentDate',
      'paymentName',
      'birthDate',
    ].every((key) => key in value)
  );
}

export function isInvoiceResponse(value: unknown): value is Invoice[] {
  return (
    typeof value === 'object' &&
    value !== null &&
    Array.isArray(value) &&
    value.every((item) => isInvoice(item))
  );
}
