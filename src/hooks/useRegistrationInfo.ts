
import useRegistrationCustomerStore from '@stores/registration/RegistrationCustomerStore';
// import useRegistrationInvoiceStore from '@stores/registration/RegistrationInvoiceStore';
// import useRegistrationContractStore from '@stores/registration/RegistrationContractStore';
// import useRegistrationDeviceStore from '@stores/registration/RegistrationDeviceStore';
// import useRegistrationSalesStore from '@stores/registration/RegistrationSalesStore';
import { RegistrationInfo } from '@stores/registration/RegistrationStore';

export const useRegistrationInfo = (contractTapId: string): RegistrationInfo => {
  const customerInfo = useRegistrationCustomerStore.getState().getRegistrationCustomerInfo(contractTapId) || {customerId: '', name: '', rrno: '', isConsent: false};
  // const contractInfo = useRegistrationContractStore.getState().getRegistrationContractInfo(contractTapId) || {};
  // const invoiceInfo = useRegistrationInvoiceStore.getState().getRegistrationInvoiceInfo(contractTapId) || {};
  // const deviceInfo = useRegistrationDeviceStore.getState().getRegistrationDeviceInfo(contractTapId) || {};
  // const salesInfo = useRegistrationSalesStore.getState().getRegistrationSalesInfo(contractTapId) || {};
  

  return { 
    customer: customerInfo,
    // contract: contractInfo,
    // invoice: invoiceInfo,
    // device: deviceInfo,
    // sales: salesInfo,
   };
};
