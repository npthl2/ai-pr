export interface AvailableCustomerContractResponse {
  availableCount: number;
}

export interface CustomerContract {
  contractId: string;
  statusCode: string;
  customerId: string;
  serviceId: string;
  serviceName: string;
  serviceType: string;
  maskingPhoneNumber: string;
  encryptedPhoneNumber: string;
  maskingImei: string;
  encryptedImei: string;
}

export interface CustomerContractResponse {
  contracts: CustomerContract[];
}

export interface Service {
  contractId: string;
  serviceId: string;
  serviceName: string;
  serviceType: string;
  serviceValue: number;
}

export interface ContractServiceResponse {
  contractId: string;
  serviceId: string;
  serviceName: string;
  serviceType: string;
  serviceValue: number;
  additionalService: Service[];
}
