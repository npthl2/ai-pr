import { RegistrationInfo } from '@model/RegistrationInfo';
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
  // customerId가 항상 문자열 값을 가지도록 보장
  const storeCustomerInfo = customerStore.getRegistrationCustomerInfo(contractTapId);
  const customerInfo = {
    customerId: storeCustomerInfo?.customerId || '',
    name: storeCustomerInfo?.name || '',
    rrno: storeCustomerInfo?.rrno || '',
    isConsent: storeCustomerInfo?.isConsent || false
  };
  console.log('수집된 customerInfo:', customerInfo);
  
  // 아직 구현되지 않은 스토어들은 빈 객체로 대체
  // 테스트를 위한 Contract 인터페이스 예시 데이터
  const contractInfo = {
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
  
  const invoiceInfo = {}; // 나중에 구현 예정
  const deviceInfo = {}; // 나중에 구현 예정
  const salesInfo = {}; // 나중에 구현 예정

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
