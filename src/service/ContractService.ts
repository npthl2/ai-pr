import useRegistrationBillingStore from '@stores/registration/RegistrationBillingStore';
import useRegistrationContractStore from '@stores/registration/RegistrationContractStore';
import useRegistrationCustomerStore from '@stores/registration/RegistrationCustomerStore';
import useRegistrationDeviceStore from '@stores/registration/RegistrationDeviceStore';
import useRegistrationSalesStore from '@stores/registration/RegistrationSalesStore';

export const removeAllRegistrationInfo = (customerId: string) => {
  useRegistrationCustomerStore.getState().removeRegistrationCustomerInfo(customerId);
  useRegistrationContractStore.getState().removeRegistrationContractInfo(customerId);
  useRegistrationBillingStore.getState().removeRegistrationBillingInfo(customerId);
  useRegistrationDeviceStore.getState().removeRegistrationDeviceInfo(customerId);
  useRegistrationSalesStore.getState().removeRegistrationSalesInfo(customerId);
};
