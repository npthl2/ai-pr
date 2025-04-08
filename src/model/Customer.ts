export enum Gender {
  MALE = 'M', // 남
  FEMALE = 'F', // 여
}

export interface CustomerSearchRequestParams {
  customerName?: string;
  birthDate?: string;
  gender?: Gender;
  phoneNumber?: string;
}

export interface CustomerSearchResponse {
  customerId: string;
  customerName: string;
  encryptedCustomerName: string;
  rrno: string;
  encryptedRrno: string;
  age: number;
  gender: Gender;
  contractId: string;
}

export interface Customer {
  id: string;
  name: string;
  encryptedName: string;
  unmaskingName: string;
  rrno: string;
  encryptedRrno: string;
  unmaskingRrno: string;
  age: number;
  gender: Gender;
  contractId: string;
  serviceContractId: string; // 요금제 확인용 계약ID
}

export interface Work {
  id: string;
  name: string;
}

export interface CreateCustomerRequestParams {
  customerName: string;
  rrno: string;
  customerNameVerificationHistoryId: number;
  gTrId: string;
}

export interface CreateCustomerResponse {
  customerId: string;
}

export interface CustomerNameVerificationRequestParams {
  customerName: string;
  rrno: string;
  rrnoIssueDate: string;
}

export interface CustomerNameVerificationResponse {
  customerNameVerificationHistoryId: number;
  nameVerificationResult: string;
  checkResult: string;
  organization: string;
}
