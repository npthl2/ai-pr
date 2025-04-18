export interface ContractItem {
  contractId: string;
  contractType: string;
  contractStatus: string;
  assignee: string;
  assigneeDepartment: string;
  salesDepartment: string;
  finalSeller: string;
}

export interface InvoiceItem {
  paymentId: string;
  paymentName: string;
  paymentNameEncrypted: string;
  recipient: string;
  recipientEncrypted: string;
  paymentMethod: string;
  paymentDate: string;
  account: string;
  accountEncrypted: string;
  card: string;
  cardEncrypted: string;
  invoiceType: string;
  invoiceNumber: string;
  invoiceNumberEncrypted: string;
  invoiceAddress: string;
  invoiceAddressEncrypted: string;
}

export interface Service {
  serviceType: string;
  serviceName: string;
  serviceValueType: string;
  serviceValue: string;
  validStartDatetime: string;
  validEndDatetime: string;
}

export interface ServiceItem {
  contractId: string;
  engagementType: string;
  engagementDate: string;
  elapsedDays: string;
  discountEndDate: string;
  totalDiscountRefundAmount: string;
  deviceModelName: string;
  deviceModelNameAlias: string;
  deviceSerialNumber: string;
  deviceSerialNumberEncrypted: string;
  simModelName: string;
  simSerialNumber: string;
  simSerialNumberEncrypted: string;
  serviceList: Service[];
  remainingPayment: string;
  remainingInstallment: string;
}

export interface Info {
  contractId: string;
  contract: ContractItem;
  invoice: InvoiceItem;
  service: ServiceItem;
}

export interface MaskedTarget {
  customerId: string;
  contractId: string;
  maskingType: string;
}
