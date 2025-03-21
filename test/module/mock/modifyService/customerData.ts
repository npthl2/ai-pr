/**
 * 고객 서비스 정보 타입 정의
 */
export interface CustomerServiceInfo {
  customerId: string;
  customerName: string;
  contracts: ContractInfo[];
}

/**
 * 계약 정보 타입 정의
 */
export interface ContractInfo {
  contractId: string;
  phoneNumber: string;
  serviceInfo: {
    serviceId: string;
    serviceName: string;
    serviceValue: number;
    valid_start_datetime: string;
    valid_end_datetime: string | null;
  };
  additionalServices: {
    serviceId: string;
    serviceName: string;
    serviceValue: number;
    valid_start_datetime: string;
    valid_end_datetime: string | null;
  }[];
}

/**
 * Mock 고객 및 계약 데이터
 */
export const mockCustomerData: CustomerServiceInfo[] = [
  {
    customerId: 'C-1000000000',
    customerName: '밍기적',
    contracts: [
      {
        contractId: 's600000000',
        phoneNumber: '010-1234-5678',
        serviceInfo:   {
          serviceId: 'svc_2',
          serviceName: '5G Max Speed 요금제',
          serviceValue: 80000,
          valid_start_datetime: '2025-03-20 17:59:58.344',
          valid_end_datetime: '9999-12-31 23:59:59.000',
        },
        additionalServices: [
          {
            serviceId: 'a_lte_1',
            serviceName: 'LTE 1 Giga 충전 부가서비스',
            serviceValue: 19000,
            valid_start_datetime: '2025-03-20 17:59:58.344',
            valid_end_datetime: '9999-12-31 23:59:59.000',
          },
          {
            serviceId: 'a_lte_2',
            serviceName: 'LTE 2 Giga 충전 부가서비스',
            serviceValue: 20000,
            valid_start_datetime: '2025-03-20 17:59:58.344',
            valid_end_datetime: '9999-12-31 23:59:59.000',
          }
        ]
      },
    ],
  }
]; 