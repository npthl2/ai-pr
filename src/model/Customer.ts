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
  rrno: string;
  encryptedRrno: string;
  age: number;
  gender: Gender;
  contractId: string;
}
