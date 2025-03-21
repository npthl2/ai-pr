export interface AvailableCustomerContractResponse {
  availableCount: number;
}

export interface ContractService {
  serviceType: string;
  serviceName: string;
  serviceValueType: string;
  serviceValue: string;
}

export interface ContractData {
  contractId: string;
  orderId: string;
  contractDate: string;
  phoneNumber: string;
  phoneNumberEncrypted: string;
  contractDetail: {
    contractId: string;
    phoneNumber: string;
    contractType: string;
    contractor: {
      assignee: string;
      assigneeDepartment: string;
      salesDepartment: string;
      finalSeller: string;
    };
    engagement: {
      engagementType: string;
      engagementDate: string;
      elapsedDays: string;
      discountEndDate: string;
      totalDiscountRefundAmount: string;
    };
    device: {
      deviceModelName: string;
      deviceModelNameAlias: string;
      deviceSerialNumber: string;
      deviceSerialNumberEncrypted: string;
      simModelName: string;
      simSerialNumber: string;
      simSerialNumberEncrypted: string;
    };
    serviceList: ContractService[];
  };
  invoiceDetail: {
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
  };
  billingDetail: {
    remainingPayment: string;
    remainingInstallment: string;
  };
}