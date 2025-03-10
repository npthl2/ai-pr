import useRegistrationCustomerStore from '@stores/registration/RegistrationCustomerStore';
// 아직 구현되지 않은 스토어들은 주석 처리
// import useRegistrationInvoiceStore from '@stores/registration/RegistrationInvoiceStore';
// import useRegistrationContractStore from '@stores/registration/RegistrationContractStore';
// import useRegistrationDeviceStore from '@stores/registration/RegistrationDeviceStore';
// import useRegistrationSalesStore from '@stores/registration/RegistrationSalesStore';
import { RegistrationInfo } from '@stores/registration/RegistrationStore';

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
  const customerInfo = customerStore.getRegistrationCustomerInfo(contractTapId) || {customerId: '', name: '', rrno: '', isConsent: false};
  console.log('수집된 customerInfo:', customerInfo);
  
  // 아직 구현되지 않은 스토어들은 빈 객체로 대체
  const contractInfo = {}; // 나중에 구현 예정
  const invoiceInfo = {}; // 나중에 구현 예정
  const deviceInfo = {}; // 나중에 구현 예정
  const salesInfo = {}; // 나중에 구현 예정

  const result = { 
    customer: customerInfo,
    contract: contractInfo,
    invoice: invoiceInfo,
    device: deviceInfo,
    sales: salesInfo,
  };
  
  console.log('useRegistrationInfo 결과:', result);
  return result;
};
