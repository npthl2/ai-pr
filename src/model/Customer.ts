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

interface TabData {
  tabId: string;
  title: string;
}

export interface Customer {
  customerId: string;
  customerName: string;
  rrno: string;
  age: number;
  gender: Gender;
  phoneNumber: string;
  // 고객 개체와 관련된 UI 상태를 선택적 속성으로 추가
  activeTab?: string;
  tabs?: TabData[];
}
