import { RegistrationInfo, CustomerInfo, InvoiceInfo, SalesInfo, ContractInfo } from '@model/RegistrationInfo';
import useRegistrationCustomerStore from '@stores/registration/RegistrationCustomerStore';
// import { useRegistrationContractStore } from '@stores/registration/RegistrationContractStore';
// import { useRegistrationInvoiceStore } from '@stores/registration/RegistrationInvoiceStore';
// import { useRegistrationDeviceStore } from '@stores/registration/RegistrationDeviceStore';
// import { useRegistrationSalesStore } from '@stores/registration/RegistrationSalesStore';

/**
 * 계약 탭 ID를 기반으로 등록 정보를 가져오는 훅
 * @param contractTapId 계약 탭 ID
 * @returns 등록 정보
 */
export const useRegistrationInfo = (contractTapId: string): RegistrationInfo => {
  console.log('useRegistrationInfo 호출됨:', contractTapId);
  
  // 각 스토어의 상태를 가져옵니다
  const customerStore = useRegistrationCustomerStore.getState();
  console.log('customerStore 상태:', customerStore);
  
  // 아직 구현되지 않은 스토어들은 주석 처리
  // const contractStore = useRegistrationContractStore.getState();
  // const invoiceStore = useRegistrationInvoiceStore.getState();
  // const deviceStore = useRegistrationDeviceStore.getState();
  // const salesStore = useRegistrationSalesStore.getState();
  
  // 각 스토어에서 데이터를 가져옵니다
  const storeCustomerInfo = customerStore.getRegistrationCustomerInfo(contractTapId);
  
  // 새로운 CustomerInfo 형태로 변환
  const customerInfo: CustomerInfo = {
    customerId: storeCustomerInfo?.customerId || '1234',
    name: storeCustomerInfo?.name || '',
    rrno: storeCustomerInfo?.rrno || '',
    rrnoIssueDate: storeCustomerInfo?.rrnoIssueDate || '20230101',
    authHistoryId: storeCustomerInfo?.authHistoryId || 0,
    isConsentPersonalInfo: storeCustomerInfo?.isConsentPersonalInfo || false,
    isConsentIdentityVerification: storeCustomerInfo?.isConsentIdentityVerification || false,
    verificationResult: storeCustomerInfo?.verificationResult || false,
    organization: storeCustomerInfo?.organization || '통신사',
    availableContractCount: storeCustomerInfo?.availableContractCount || 1
  };
  console.log('수집된 customerInfo:', customerInfo);
  
  // 아직 구현되지 않은 스토어들은 임시 데이터로 대체
  // 테스트를 위한 Contract 인터페이스 예시 데이터
  const contractInfo : ContractInfo = {
    contractType: '신규가입', // 가입유형 예시
    sellType: '일반판매', // 판매유형 예시
    phoneNumber: '010-1234-5678', // 전화번호 예시
    sim: 'USIM', // SIM 정보 예시
    imei: '123456789012345', // IMEI 정보 예시
    service: { // 요금제 정보 예시
      serviceId: 'S001',
      serviceName: '5G 프리미엄 요금제',
      serviceValueType: 'KRW',
      serviceValue: 55000
    },
    additionalServices: [ // 부가서비스 리스트 예시
      {
        serviceId: 'A001',
        serviceName: '데이터 안심옵션',
        serviceValueType: 'KRW',
        serviceValue: 5000
      },
      {
        serviceId: 'A002',
        serviceName: '통화 무제한 옵션',
        serviceValueType: 'KRW',
        serviceValue: 3000
      },
      {
        serviceId: 'A003',
        serviceName: '부가 보험 서비스',
        serviceValueType: 'KRW',
        serviceValue: 2500
      }
    ]
  };
  
  // 테스트를 위한 Invoice 인터페이스 예시 데이터
  const invoiceInfo: InvoiceInfo = {
    invoiceId: 'INV' + new Date().getTime(),
    customerId: customerInfo.customerId || '',
    billingType: '휴대폰',
    recipient: customerInfo.name,
    invoiceType: '이메일',
    invoiceEmail: 'user@example.com',
    invoicePostalCode: '06164',
    invoiceAddress: '서울특별시 강남구 테헤란로 123',
    invoiceAddressDetail: '5층 501호',
    paymentMethod: 'BANK',
    bankCompany: '국민은행',
    bankAccount: '123-456-789012',
    cardCompany: '신한카드',
    cardNumber: '1234-5678-9012-3456',
    paymentDate: '25',
    paymentName: customerInfo.name,
    birthDate: '19900101'
  };
  
  // 테스트를 위한 Device 인터페이스 예시 데이터
  const deviceInfo = {
    deviceId: 'DEV12345',
    deviceName: '갤럭시 S23 Ultra',
    deviceEngagementType: 'installment' as const,
    deviceSponsorName: '통합스폰서',
    deviceEngagementPeriod: 24,
    deviceEngagementName: '공시지원금' as const,
    deviceSalesPrice: 1200000,
    deviceDiscountPrice: 300000,
    devicePrepaidPrice: 100000,
    deviceInstallmentAmount: 800000,
    deviceInstallmentFee: 24000,
    deviceTotalPrice: 824000,
    deviceInstallmentPeriod: 24,
    monthlyInstallmentPrice: 34333
  };
  
  // 테스트를 위한 Sales 인터페이스 예시 데이터
  const salesInfo: SalesInfo = {
    salesDepartment: '온라인지점',
    salesContactPoint: '온라인',
    finalSeller: '홍길동',
    supporter: '김지원'
  };

  const result: RegistrationInfo = { 
    customer: customerInfo,
    contract: contractInfo,
    invoice: invoiceInfo,
    device: deviceInfo,
    sales: salesInfo,
  };
  
  console.log('useRegistrationInfo 결과:', result);
  return result;
};
