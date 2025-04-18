import { ContractData } from './Contract';

export interface CustomerContract {
  customerId: string;
  contracts: {
    customerId: string;
    contractId: string;
    orderId: string;
    contractDate: string;
    phoneNumber: string;
    phoneNumberEncrypted: string;
    contractDetail: {
      contractId: string;
      phoneNumber: string;
      phoneNumberEncrypted: string;
      contractDate: string;
      lobType: string;
      contractStatus: string;
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
        discountEndDate: string;
        elapsedDays: string;
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
      serviceList: {
        serviceType: string;
        serviceName: string;
        serviceValueType: string;
        serviceValue: string;
        validStartDatetime: string;
        validEndDatetime: string;
      }[];
    };
    billingDetail: {
      remainingPayment: string;
      remainingInstallment: string;
    };
    invoiceDetail: {
      billingType: string;
      paymentId: string;
      paymentMethod: string;
      paymentName: string;
      paymentNameEncrypted: string;
      invoiceNumber: string;
      invoiceNumberEncrypted: string;
      account: string;
      accountEncrypted: string;
      card: string;
      cardEncrypted: string;
      invoiceType: string;
      invoiceAddress: string;
      invoiceAddressEncrypted: string;
      recipient: string;
      recipientEncrypted: string;
      paymentDate: string;
    };
  }[];
}

// customerContract 타입가드 함수 추가
export function isCustomerContract(value: unknown): value is CustomerContract {
  return typeof value === 'object' && value !== null && 'customerId' in value;
}

export interface ContractDataWithCustomer extends ContractData {
  customerDetail: {
    customerId: string;
    customerName: string;
  };
}
